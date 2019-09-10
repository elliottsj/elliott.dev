import styled from '@emotion/styled';
import React from 'react';

const Container = styled.div`
  background-color: tomato;
`;

const Layout: React.FC = ({ children }) => <Container>{children}</Container>;

export default Layout;
