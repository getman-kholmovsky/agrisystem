import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from './Card';
import { withRouter } from 'react-router-dom';
import PageNotFound from './PageNotFound';
import Pagination from './Pagination';

const StyledCardList = styled.div`
  display: flex;
  /* flex-wrap: wrap; */
  padding-top: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  /* justify-content: space-between; */
`;

const CardList = (props) => {
  const [pageData, setpageData] = useState(null);
  const getPage = async (pageNumber) => {
    const newData = await fetch(`/api/agriculture?page=${pageNumber}`).then(
      (data) => data.json()
    );
    const pageData = newData.data;
    const currentPage = newData.page;
    const totalCount = newData.size;
    return { pageData, currentPage, totalCount };
  };

  useEffect(() => {
    let pageNumber = props.match.params.pageNumber;
    if (pageNumber === undefined) {
      pageNumber = 1;
    }
    getPage(pageNumber).then(({ pageData, currentPage, totalCount }) => {
      setpageData(pageData);
      props.handleCurrentPageChange(currentPage);
      props.handleTotalCountChange(totalCount);
    });
  }, [props]);
  console.log(pageData);

  return (
    <StyledCardList>
      {pageData && pageData.length === 0 && <PageNotFound />}
      {pageData &&
        pageData.map((d) => {
          return <Card data={d} key={d._id} />;
        })}
    </StyledCardList>
  );
};

export default withRouter(CardList);
