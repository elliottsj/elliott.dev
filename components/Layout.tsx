import Link from 'next/link';
import React from 'react';

import styled from '@emotion/styled';

const Grid = styled.div`
  height: 100vh;
  display: grid;
  grid:
    [row1-start] 'header' auto [row1-end]
    [row2-start] 'main' 1fr [row2-end]
    [row3-start] 'footer' auto [row3-end]
    / auto;
`;

const Header = styled.header`
  grid-area: header;
`;

const Main = styled.main`
  grid-area: main;
`;

const Footer = styled.footer`
  grid-area: footer;
`;

const Layout: React.FC = ({ children }) => (
  <Grid>
    <Header>
      <Link href="/">elliott.dev</Link>
    </Header>
    <Main>{children}</Main>
    <Footer>footer</Footer>
  </Grid>
);

export default Layout;
