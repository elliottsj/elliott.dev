import * as d3 from 'd3';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React, { useEffect, useRef, useState } from 'react';
import Div100vh from 'react-div-100vh';
import Modal from 'react-modal';

import { css } from '@emotion/react';

import { useWindowSize } from '../hooks/useWindowSize';
import { Family, FamilyLink, FamilyNode, getFamilyGraph } from '../lib/family';

type SimulationFamilyNodeDatum = FamilyNode & d3.SimulationNodeDatum;
type SimulationFamilyLinkDatum = FamilyLink & d3.SimulationNodeDatum;

interface Props {
  data: Family;
}

const FamilyTreePage: React.FC<Props> = ({ data: family }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const simulationRef = useRef<
    d3.Simulation<SimulationFamilyNodeDatum, SimulationFamilyLinkDatum>
  >();
  const svgSelectionRef = useRef<d3.Selection<SVGSVGElement, unknown, null, undefined>>();
  const zoomGroupSelectionRef = useRef<d3.Selection<SVGGElement, unknown, null, undefined>>();
  const windowSize = useWindowSize();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!svgRef.current) return;

    const graph = getFamilyGraph(family);

    const svg = d3.select(svgRef.current);
    svgSelectionRef.current = svg;

    // Define the arrowhead marker variables
    const markerBoxWidth = 20;
    const markerBoxHeight = 20;
    const refX = markerBoxWidth / 2;
    const refY = markerBoxHeight / 2;
    // const markerWidth = markerBoxWidth / 2;
    // const markerHeight = markerBoxHeight / 2;
    const arrowPoints: [number, number][] = [
      [0, 0],
      [0, 20],
      [20, 10],
    ];

    const line = d3.line();

    // Add the arrowhead marker definition to the svg element
    svg
      .append('defs')
      .append('marker')
      .attr('id', 'arrow')
      .attr('viewBox', `0 0 ${markerBoxWidth} ${markerBoxHeight}`)
      .attr('refX', refX)
      .attr('refY', refY)
      .attr('markerWidth', markerBoxWidth)
      .attr('markerHeight', markerBoxHeight)
      .attr('orient', 'auto-start-reverse')
      .append('path')
      .attr('d', line(arrowPoints)!)
      .attr('stroke', 'black');

    const g = svg.append('g');
    zoomGroupSelectionRef.current = g;

    const simulation = d3
      .forceSimulation<SimulationFamilyNodeDatum, SimulationFamilyLinkDatum>(graph.nodes)
      .force('charge', d3.forceManyBody().strength(-200).distanceMin(20).distanceMax(300))
      .force('collision', d3.forceCollide(25).strength(0.8))
      .force(
        'link',
        d3
          .forceLink<SimulationFamilyNodeDatum, SimulationFamilyLinkDatum>(graph.links)
          .id((d) => d.id)
          .distance(30)
          // .distance((d) => {
          //   if (
          //     d.kind === 'Partner' ||
          //     ((d.target as unknown) as FamilyNode).type === 'FamilyUnionNode'
          //   ) {
          //     return 10;
          //   }
          //   return 0;
          // })
          .strength((d) =>
            d.kind === 'Partner' || ((d.target as unknown) as FamilyNode).type === 'FamilyUnionNode'
              ? 1
              : 0.5,
          )
          .iterations(5),
      );
    // .force('x', d3.forceX())
    // .force('y', d3.forceY());

    simulationRef.current = simulation;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    function click(event, d) {
      delete d.fx;
      delete d.fy;
      // d3.select(this).classed('fixed', false);
      simulation.alpha(0.05).restart();
    }

    function dragstart() {
      // d3.select(this).classed('fixed', true);
    }

    // function clamp(x: number, lo: number, hi: number) {
    //   return x < lo ? lo : x > hi ? hi : x;
    // }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    function dragged(event, d) {
      d.fx = event.x; //clamp(event.x, 0, 1000 /*width*/);
      d.fy = event.y; //clamp(event.y, 0, 1000 /*height*/);
      simulation.alpha(0.05).restart();
    }

    const drag: any = d3.drag().on('start', dragstart).on('drag', dragged);

    const links = g
      // .append('g')
      // .attr('stroke', '#999')
      // .attr('stroke-opacity', 0.6)
      .selectAll('path')
      .data(graph.links)
      .join('path')
      .attr('stroke', 'black');
    // .attr('marker-start', 'url(#arrow)');

    links.filter((d) => d.kind === 'Partner').attr('stroke-dasharray', '1');
    links
      .filter((d) => d.kind === 'Child' && (d.target as any).type === 'FamilyUnionNode')
      .attr('stroke-dasharray', '4 1');

    const nodes = g.append('g').selectAll('g').data(graph.nodes).join('g');

    nodes.call(drag).on('click', click);

    nodes
      .filter((d) => d.type === 'FamilyMemberNode')
      .append('circle')
      .attr('fill', '#fff')
      .attr('stroke', (d) =>
        d.type === 'FamilyMemberNode' && d.member.name.includes('Scott') ? '#ff6961' : '#000',
      )
      .attr('stroke-width', 1.5)
      .attr('r', 20);

    nodes
      .filter((d) => d.type === 'FamilyUnionNode')
      .append('circle')
      .attr('fill', '#000')
      .attr('r', 2);

    nodes
      .append('text')
      .style('font-size', '0.23em')
      .text((d) => (d.type === 'FamilyMemberNode' ? d.member.name : ''))
      .attr('x', 0)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle');

    simulationRef.current.on('tick', () => {
      links.attr('d', (d: any) => {
        return d3.line()([
          [d.source.x, d.source.y],
          [d.target.x, d.target.y],
        ]);
      });
      // .attr('x1', (d: any) => d.source.x)
      // .attr('y1', (d: any) => d.source.y)
      // .attr('x2', (d: any) => d.target.x)
      // .attr('y2', (d: any) => d.target.y);

      nodes.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    });
  }, [family]);

  /*
   * Adjust centering / zoom dimensions when window dimensions change.
   */
  useEffect(() => {
    if (
      !simulationRef.current ||
      !svgSelectionRef.current ||
      !zoomGroupSelectionRef.current ||
      !windowSize.width ||
      !windowSize.height
    ) {
      return;
    }
    const simulation = simulationRef.current;
    const svg = svgSelectionRef.current;
    const zoomGroup = zoomGroupSelectionRef.current;

    // Center simulation in the middle of the window.
    simulation.force('center', d3.forceCenter(windowSize.width / 2, windowSize.height / 2));

    // Enable zooming/panning the SVG.
    // https://observablehq.com/@d3/zoom?collection=@d3/d3-zoom
    const zoomBehaviour = d3
      .zoom<SVGSVGElement, unknown>()
      .extent([
        [0, 0],
        [windowSize.width, windowSize.height],
      ])
      .scaleExtent([0.2, 6])
      .on('zoom', ({ transform }) => {
        zoomGroup.attr('transform', transform);
      });
    svg.call(zoomBehaviour);
  }, [windowSize]);

  return (
    <Div100vh>
      <Head>
        {/* Disable manual scaling */}
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no"
        />
      </Head>
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" ref={svgRef} />
      <button
        css={css`
          position: absolute;
          top: 20px;
          left: 20px;
          font-size: 2em;
        `}
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        FAQ
      </button>
      <Modal
        ariaHideApp={false}
        style={{
          content: {
            WebkitOverflowScrolling: 'auto',
          },
        }}
        isOpen={isModalOpen}
        onRequestClose={() => {
          setIsModalOpen(false);
        }}
        contentLabel="FAQ"
      >
        <button
          onClick={() => {
            setIsModalOpen(false);
          }}
        >
          Close
        </button>
        <pre
          css={css`
            white-space: pre-wrap;
          `}
        >
          {family.aboutText}
        </pre>
        <button
          onClick={() => {
            setIsModalOpen(false);
          }}
        >
          Close
        </button>
      </Modal>
    </Div100vh>
  );
};

export default FamilyTreePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.query['token'] || null;

  if (!token || token !== process.env.FAMILY_TOKEN) {
    return {
      notFound: true,
    };
  }

  const response = await fetch(
    `https://raw.githubusercontent.com/elliottsj/elliott-family-data/master/data.json`,
    {
      headers: {
        Authorization: `token ${process.env.DATA_TOKEN}`,
      },
    },
  );
  const data = await response.json();

  return { props: { data } };
};