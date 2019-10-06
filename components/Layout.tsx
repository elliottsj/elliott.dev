import Link from 'next/link';
import React from 'react';

import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { useTheme, Theme } from '../common/theme';

const BASE_FONT_SIZE_PX = 16;

const Grid = styled.div<{}, Theme>`
  height: 100vh;
  display: grid;
  grid:
    [row1-start] '. header .' auto [row1-end]
    [row2-start] '. main .' 1fr [row2-end]
    [row3-start] '. footer .' auto [row3-end]
    / 1fr minmax(auto, ${672 / BASE_FONT_SIZE_PX}rem) 1fr;
  background-color: ${props => props.theme.colors.background};
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

const Layout: React.FC = ({ children }) => {
  const theme = useTheme();

  return (
    <Grid>
      <Header>
        <span
          css={css`
            font-family: 'Ubuntu', sans-serif;
            font-size: 1.5rem;
            font-weight: bold;

            a {
              background-color: ${theme.colors.primary};
              box-shadow: 0 0 0 0.5rem ${theme.colors.primary};
              color: ${theme.colors.background};
              text-decoration: none;
            }
          `}
        >
          <Link href="/">
            <a>elliott.dev</a>
          </Link>
        </span>
      </Header>
      <Main>{children}</Main>
      <Footer>footer</Footer>
    </Grid>
  );
};

export default Layout;
