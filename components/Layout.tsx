import Link from 'next/link';
import React from 'react';

import { css } from '@emotion/core';
import styled from '@emotion/styled';

const BASE_FONT_SIZE_PX = 16;

const Grid = styled.div`
  height: 100vh;
  display: grid;
  grid:
    [row1-start] '. header .' auto [row1-end]
    [row2-start] '. main .' 1fr [row2-end]
    [row3-start] '. footer .' auto [row3-end]
    / 1fr minmax(auto, ${672 / BASE_FONT_SIZE_PX}rem) 1fr;
`;

const Header = styled.header`
  grid-area: header;
  padding: ${42 / BASE_FONT_SIZE_PX}rem ${21 / BASE_FONT_SIZE_PX}rem;
`;

const Main = styled.main`
  grid-area: main;
  padding: 0 ${21 / BASE_FONT_SIZE_PX}rem;
`;

const Footer = styled.footer`
  grid-area: footer;
`;

const Layout: React.FC = ({ children }) => (
  <Grid>
    <Header>
      <Link href="/">
        <a
          css={css`
            font-family: 'Ubuntu', sans-serif;
          `}
        >
          elliott.dev
        </a>
      </Link>
    </Header>
    <Main>{children}</Main>
    <Footer>footer</Footer>
  </Grid>
);

export default Layout;
