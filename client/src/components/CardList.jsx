import React from 'react';
import styled from 'styled-components';
import Card from './Card';

const StyledCardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-left: 2rem;
  padding-right: 2rem;
  background-color: #f0f0f0;
`;

const CardList = ({ data }) => {
  return (
    <StyledCardList>
      {data.map((d) => {
        return <Card data={d} key={d._id} />;
      })}
    </StyledCardList>
  );
};

export default CardList;
