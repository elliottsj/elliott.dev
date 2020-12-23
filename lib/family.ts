import groupBy from 'lodash/fp/groupBy';
import identity from 'lodash/fp/identity';
import sortBy from 'lodash/fp/sortBy';
import uniqBy from 'lodash/fp/uniqBy';
import { mergeMaps } from './util';

// https://github.com/microsoft/TypeScript/issues/202
export type ID = string;

export interface FamilyMember {
  id?: ID;
  name: string;
  aliases: string[];
  initials: string;
  parents: ID[];
  partner: ID | null;
  links: string[];
}

export interface Family {
  aboutText: string;
  members: FamilyMember[];
}

export interface FamilyGraph {
  nodes: FamilyNode[];
  links: FamilyLink[];
  totalGenerations: number;
}

export interface FamilyMemberNode {
  type: 'FamilyMemberNode';
  id: ID;
  member: FamilyMember;
  generation: number;
}

export interface FamilyUnionNode {
  type: 'FamilyUnionNode';
  id: ID;
  parentGeneration: number;
  parents: ID[];
  children: ID[];
}

export type FamilyNode = FamilyMemberNode | FamilyUnionNode;

export interface FamilyLink {
  kind: 'Partner' | 'Child';
  source: ID;
  target: ID;
}

export const getMemberId = (member: FamilyMember) => member.id || member.name;

export const getParentsHash = (member: FamilyMember) => {
  return `parents:${sortBy(identity, member.parents).join('+')}`;
};

export const getParentsFromHash = (hash: string): ID[] => {
  return hash.split(':')[1].split('+');
};

export const getPartnerHash = (member: FamilyMember) => {
  return `partnership:${sortBy(identity, [getMemberId(member), member.partner]).join('+')}`;
};

/**
 * Return a Map of (member ID) -> (generation number).
 * The oldest generation is number 1, and each subsequent set of children forms the next generation.
 */
export const computeGenerations = (
  family: Family,
  currentGenerationMembers = family.members,
  generationCount = 0,
): Map<ID, number> => {
  const generations = new Map<ID, number>();
  const nextGenerationMembers: FamilyMember[] = [];

  for (const member of currentGenerationMembers) {
    generations.set(getMemberId(member), generationCount + 1);

    const children = family.members.filter((maybeChild) =>
      maybeChild.parents.includes(getMemberId(member)),
    );
    if (children.length > 0) {
      // Member has children. Include them in the next generation.
      for (const child of children) {
        if (!nextGenerationMembers.includes(child)) {
          nextGenerationMembers.push(child);
        }
      }
    }
    if (member.partner) {
      // Include the partner in the current generation.
      generations.set(member.partner, generationCount + 1);
    }
  }

  if (nextGenerationMembers.length > 0) {
    return mergeMaps(
      generations,
      computeGenerations(family, nextGenerationMembers, generationCount + 1),
    );
  } else {
    return generations;
  }
};

/**
 * Create a FamilyGraph from a Family.
 */
export const getFamilyGraph = (family: Family): FamilyGraph => {
  const nodes: FamilyNode[] = [];
  const links: FamilyLink[] = [];

  // compute generations
  const generations = computeGenerations(family);
  const totalGenerations = Math.max(...generations.values());

  // add node for each member
  for (const member of family.members) {
    const id = getMemberId(member);
    const generation = generations.get(id);
    if (typeof generation === 'undefined') {
      throw new Error(`Failed to compute generation for member with ID "${id}".`);
    }
    nodes.push({
      type: 'FamilyMemberNode',
      id,
      member,
      generation,
    });
  }

  // add union node for each set of 1+ children which share the same parents
  const membersWithParents = family.members.filter((member) => member.parents.length > 0);
  const membersGroupedByParents = groupBy((member) => getParentsHash(member), membersWithParents);
  for (const [parentsHash, members] of Object.entries(membersGroupedByParents)) {
    const parents = getParentsFromHash(parentsHash);
    const children = members.map((member) => getMemberId(member));
    const unionNodeId = parentsHash;

    const parentGeneration = generations.get(parents[0]);
    if (typeof parentGeneration === 'undefined') {
      throw new Error(`Failed to find generation for parent "${parents[0]}".`);
    }

    nodes.push({
      type: 'FamilyUnionNode',
      id: unionNodeId,
      parentGeneration,
      parents,
      children,
    });

    // add edge for each parents -> union node
    for (const parent of parents) {
      links.push({
        kind: 'Child',
        source: parent,
        target: unionNodeId,
      });
    }

    // add edge for each union node -> child
    for (const child of children) {
      links.push({
        kind: 'Child',
        source: unionNodeId,
        target: child,
      });
    }
  }

  // add edge for each partnership
  const membersWithPartners = family.members.filter(
    (member): member is FamilyMember & { partner: ID } => member.partner !== null,
  );
  const uniqPartnerships = uniqBy((member) => getPartnerHash(member), membersWithPartners);
  for (const partnerMember of uniqPartnerships) {
    links.push({
      kind: 'Partner',
      source: getMemberId(partnerMember),
      target: partnerMember.partner,
    });
  }

  return {
    nodes,
    links,
    totalGenerations,
  };
};
