import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';
import GitHubLogo from 'simple-icons/icons/github.svg';
import StackOverflowLogo from 'simple-icons/icons/stackoverflow.svg';

const Grid: React.FC<React.ComponentProps<'div'>> = (props) => {
  return (
    <div
      className={classNames(
        'grid',
        'h-full',
        'grid-rows-[auto_1fr_auto]',
        'grid-cols-[1fr_minmax(auto,672px)_1fr]',
        'bg-background',
        'transition-colors',
        'overflow-auto',
      )}
      {...props}
    />
  );
};

const Header: React.FC<React.ComponentProps<'header'>> = (props) => {
  return (
    <header
      className={classNames(
        'row-start-1 col-start-2',
        'flex items-center justify-between',
        'py-10 px-5',
      )}
      {...props}
    />
  );
};

const Main: React.FC<React.ComponentProps<'main'>> = (props) => {
  return <main className={classNames('row-start-2 col-start-2', 'px-5')} {...props} />;
};

const Footer: React.FC<React.ComponentProps<'footer'>> = (props) => {
  return <footer className={classNames('row-start-3 col-start-2', 'p-5')} {...props} />;
};

const SocialLink: React.FC<{ children: React.ReactNode; href: string }> = ({ children, href }) => {
  return (
    <a href={href} rel="me">
      {children}
    </a>
  );
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className="h-screen">
    <Grid>
      <Header>
        <div className="flex-1 font-sans font-bold text-2xl ">
          <div className="p-2 inline-block bg-primary">
            <Link className="no-underline text-background hover:text-background" href="/">
              elliott.dev
            </Link>
          </div>
        </div>
        <div className="flex-none font-sans pl-4">
          <Link href="/">Home</Link>
        </div>
        <div className="flex-none font-sans pl-4">
          <Link href="/posts">Posts</Link>
        </div>
        <div className="flex-none font-sans pl-4">
          <Link href="/about">About</Link>
        </div>
      </Header>
      <Main>{children}</Main>
      <Footer>
        <SocialLink href="https://github.com/elliottsj">
          <GitHubLogo className="inline" />
        </SocialLink>
        {' • '}
        <SocialLink href="https://stackoverflow.com/users/1626478/spencer">
          <StackOverflowLogo className="inline" />
        </SocialLink>
      </Footer>
    </Grid>
  </div>
);

export default Layout;
