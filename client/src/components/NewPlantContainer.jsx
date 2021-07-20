import React from 'react';
import styled from 'styled-components';
import NewPlant from './NewPlant';

const StyledContainer = styled.div`
  height: 95vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  padding-left: 2rem;
  padding-right: 2rem;
  background-color: #f0f0f0;
`;
const NewPlantContainer = () => {
  return (
    <StyledContainer>
      <NewPlant />
    </StyledContainer>
  );
};

export default NewPlantContainer;
