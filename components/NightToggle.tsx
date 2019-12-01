import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Rocker = styled.label<{ size: string }>`
  display: inline-block;
  position: relative;
  /*
  SIZE OF SWITCH
  ==============
  All sizes are in em - therefore
  changing the font-size here
  will change the size of the switch.
  */
  font-size: ${props => props.size};
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  color: #888;
  width: 6em;
  height: 2.5em;
  border: 0.5em solid #eee;
  background-color: #999;
`;

const switchStyles = css`
  cursor: pointer;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.5em;
  width: 3em;
  transition: 0.2s;

  ::before {
    content: '';
    position: absolute;
    width: 0.425em;
    height: 2.45em;
    bottom: -0.45em;
    background-color: #ccc;
    transform: skewY(-65deg);
  }
`;

const SwitchLeft = styled.span<{ checked: boolean }>`
  ${switchStyles}

  height: 2.4em;
  width: 2.75em;
  left: 0.375em;
  bottom: 0.4em;
  background-color: #ddd;
  transform: rotate(15deg) skewX(15deg);
  user-select: none;

  ::before {
    left: -0.425em;
  }

  ${props =>
    props.checked &&
    css`
      background-color: #0084d0;
      color: #fff;
      bottom: 0px;
      left: 0;
      height: 2.5em;
      width: 3em;
      transform: rotate(0deg) skewX(0deg);

      ::before {
        background-color: transparent;
        width: 3.0833em;
      }
    `}
`;

const SwitchRight = styled.span<{ checked: boolean }>`
  ${switchStyles}

  right: 0;
  bottom: 0;
  background-color: #bd5757;
  color: #fff;
  user-select: none;

  ::before {
    right: -0.425em;
    background-color: transparent;
    transform: skewY(65deg);
  }

  ${props =>
    props.checked &&
    css`
      background-color: #ddd;
      color: #888;
      bottom: 0.4em;
      right: 0.375em;
      height: 2.4em;
      width: 2.75em;
      transform: rotate(-15deg) skewX(-15deg);

      ::before {
        background-color: #ccc;
      }
    `}
`;

interface NightToggleProps {
  checked: boolean;
  disabledLabel: React.ReactNode;
  enabledLabel: React.ReactNode;
  size?: string;
  onChange(checked: boolean): void;
}

/**
 * A toggleable checkbox input which looks like a rocker switch.
 *
 * Inspired by https://codepen.io/marcusconnor/pen/QJNvMa
 */
const NightToggle: React.FC<NightToggleProps> = props => {
  const { checked, disabledLabel, enabledLabel, size = '2em', onChange } = props;
  return (
    <Container>
      <Rocker size={size}>
        <input
          css={css`
            opacity: 0;
            width: 0;
            height: 0;
          `}
          type="checkbox"
          checked={checked}
          onChange={event => {
            onChange(event.currentTarget.checked);
          }}
        />
        <SwitchLeft checked={checked}>{enabledLabel}</SwitchLeft>
        <SwitchRight checked={checked}>{disabledLabel}</SwitchRight>
      </Rocker>
    </Container>
  );
};

export default NightToggle;
