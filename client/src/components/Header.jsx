import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  font-size: 2.5rem;
  font-weight: 400;
  text-decoration: none;
  color: white;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;
const StyledAppBar = styled(AppBar)`
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

export default function ButtonAppBar() {
  return (
    <div>
      <StyledAppBar position='static'>
        <Typography variant='h6'>
          <StyledLink to='/'>Plants bank</StyledLink>
        </Typography>
      </StyledAppBar>
    </div>
  );
}
