import { css } from '@emotion/core';
import React from 'react';

const Layout: React.FC = ({ children }) => (
  <div
    css={css`
      height: 100vh;
      display: grid;
      grid:
        [row1-start] 'header' auto [row1-end]
        [row2-start] 'main' 1fr [row2-end]
        [row3-start] 'footer' auto [row3-end]
        / auto;
      background-color: tomato;
    `}
  >
    <div
      css={css`
        grid-area: header;
      `}
    >
      header
    </div>
    <div
      css={css`
        grid-area: main;
      `}
    >
      {children}
    </div>
    <div
      css={css`
        grid-area: footer;
      `}
    >
      footer
    </div>
  </div>
);

export default Layout;
