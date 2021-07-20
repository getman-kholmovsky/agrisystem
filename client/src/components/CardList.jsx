import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from './Card';
import { withRouter } from 'react-router-dom';

const StyledCardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-left: 2rem;
  padding-right: 2rem;
  background-color: #f0f0f0;
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
    console.log(pageNumber);
    if (pageNumber === undefined) {
      pageNumber = 1;
    }
    getPage(pageNumber).then(({ pageData, currentPage, totalCount }) => {
      setpageData(pageData);
      props.handleCurrentPageChange(currentPage);
      props.handleTotalCountChange(totalCount);
    });
  }, [props]);

  return (
    <StyledCardList>
      {pageData &&
        pageData.map((d) => {
          return <Card data={d} key={d._id} />;
        })}
    </StyledCardList>
  );
};

export default withRouter(CardList);
