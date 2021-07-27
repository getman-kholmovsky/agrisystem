import React from 'react';
import styled from 'styled-components';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import PaginationItem from '@material-ui/lab/PaginationItem';
import { Link } from 'react-router-dom';

const StyledPagination = styled(Pagination)`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-top: 1rem;
  padding-bottom: 1rem;
  margin-top: auto;
`;

const Page = styled.li`
  list-style: none;
`;
const PageLink = styled.a`
  text-decoration: none;
  color: #696969;
  font-size: 2rem;
  margin-right: 0.5rem;
  font-weight: ${({ isActive }) => (isActive ? 800 : '')};
  color: ${({ isActive }) => (isActive ? 'black' : '')};
  font-size: ${({ isActive }) => (isActive ? '2.5rem' : '')};
`;

const PaginationContainer = ({
  pages,
  currentPage,
  handleCurrentPageChange,
}) => {
  const pageLinks = [];
  for (let i = 1; i <= pages; i++) {
    let isActive = currentPage === i ? true : false;
    pageLinks.push(
      <Page isActive={isActive} key={i}>
        <PageLink
          href={`/page/${i}`}
          isActive={isActive}
          onClick={() => {
            handleCurrentPageChange(i);
          }}
        >
          {i}
        </PageLink>
      </Page>
    );
  }
  return (
    <StyledPagination
      count={pageLinks.length}
      color='primary'
      hidePrevButton
      hideNextButton
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          to={`${item.page === 1 ? '' : `/page/${item.page}`}`}
          {...item}
        />
      )}
    ></StyledPagination>
  );
};

export default PaginationContainer;
