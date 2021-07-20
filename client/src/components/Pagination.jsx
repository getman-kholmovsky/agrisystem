import React from 'react';
import styled from 'styled-components';

const StyledPagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-top: 1rem;
  padding-bottom: 1rem;
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

const Pagination = ({ pages, currentPage, handleCurrentPageChange }) => {
  const pageLinks = [];

  for (let i = 1; i <= pages + 1; i++) {
    let isActive = currentPage === i ? true : false;
    pageLinks.push(
      <Page
        isActive={isActive}
        key={i}
        onClick={() => {
          handleCurrentPageChange(i);
        }}
      >
        <PageLink href={`/page/${i}`} isActive={isActive}>
          {i}
        </PageLink>
      </Page>
    );
  }
  // console.log(pageLinks);
  return <StyledPagination>{pageLinks}</StyledPagination>;
};

export default Pagination;
