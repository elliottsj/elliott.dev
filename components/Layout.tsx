import Link from 'next/link';
import React, { useState } from 'react';
import GitHubLogo from 'simple-icons/icons/github.svg';
import StackOverflowLogo from 'simple-icons/icons/stackoverflow.svg';
import TwitterLogo from 'simple-icons/icons/twitter.svg';

import { css } from '@emotion/core';
import styled from '@emotion/styled';

import { pxRem, Theme, useTheme } from '../common/theme';
import NightToggle from './NightToggle';

const Grid = styled.div<{}, Theme>`
  height: 100vh;
  display: grid;
  grid:
    [row1-start] '. header .' auto [row1-end]
    [row2-start] '. main .' 1fr [row2-end]
    [row3-start] '. footer .' auto [row3-end]
    / 1fr minmax(auto, ${pxRem(672)}) 1fr;
  background-color: ${(props) => props.theme.colors.background};
`;

const Header = styled.header`
  grid-area: header;
  padding: ${pxRem(42)} ${pxRem(21)};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Main = styled.main`
  grid-area: main;
  padding: 0 ${pxRem(21)};
`;

const Footer = styled.footer`
  grid-area: footer;
  padding: ${pxRem(21)};
`;

const SocialLink: React.FC<{ href: string }> = ({ children, href }) => {
  const theme = useTheme();
  return (
    <a
      css={css`
        svg {
          fill: ${theme.colors.text};
        }
      `}
      href={href}
    >
      {children}
    </a>
  );
};

const Layout: React.FC = ({ children }) => {
  const theme = useTheme();
  const [isNightModeEnabled, setIsNightModeEnabled] = useState(true);
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
        {false && (
          <NightToggle
            disabledLabel="Off"
            enabledLabel="On"
            size="1em"
            checked={isNightModeEnabled}
            onChange={(checked) => {
              setIsNightModeEnabled(checked);
            }}
          />
        )}
      </Header>
      <Main>{children}</Main>
      <Footer>
        <SocialLink href="https://github.com/elliottsj">
          <GitHubLogo />
        </SocialLink>
        {' • '}
        <SocialLink href="https://stackoverflow.com/users/1626478/spencer">
          <StackOverflowLogo />
        </SocialLink>
        {' • '}
        <SocialLink href="https://twitter.com/spe_">
          <TwitterLogo />
        </SocialLink>
      </Footer>
    </Grid>
  );
};

export default Layout;
