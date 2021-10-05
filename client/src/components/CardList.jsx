import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from './Card';
import { withRouter, useParams } from 'react-router-dom';
import PageNotFound from './PageNotFound';
import FamilyPicker from './FamilyPicker';

const StyledCardList = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  justify-content: center;
`;

const Cards = styled.div`
  display: flex;
  justify-content: center;
`;

const CardList = (props) => {
  let { pageNumber } = useParams();
  const getPage = async (pageNumber, family) => {
    const limit = 3;
    const newData = await fetch(
      `/api/agriculture?page=${pageNumber}&limit=${limit}&family=${family}`
    ).then((data) => data.json());
    const pageData = newData.data;
    const currentPage = newData.page;
    const totalCount = newData.size;
    console.log(totalCount);
    return { pageData, currentPage, totalCount };
  };

  useEffect(() => {
    if (pageNumber === undefined) {
      pageNumber = 1;
    }
    getPage(pageNumber, props.family).then(({ pageData, totalCount }) => {
      props.setpageData(pageData);
      props.handleTotalCountChange(totalCount);
    });
  }, [pageNumber, props.family]);
  console.log(props);

  return (
    <StyledCardList>
      <FamilyPicker
        pageData={props.pageData}
        setpageData={props.setpageData}
        getPage={getPage}
        family={props.family}
        setFamily={props.setFamily}
      />
      {props.pageData && props.pageData.length === 0 && <PageNotFound />}
      <Cards>
        {props.pageData &&
          props.pageData.map((d) => {
            return <Card data={d} key={d._id} />;
          })}
      </Cards>
    </StyledCardList>
  );
};

export default withRouter(CardList);
