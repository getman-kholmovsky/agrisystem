import React from 'react';
import styled from 'styled-components';
import NewPlant from './NewPlant';
import CreatePlant from './CreatePlant';

const StyledContainer = styled.div`
  /* height: 95vh; */
  width: 100vw;
  display: flex;
  justify-content: center;
  padding-left: 2rem;
  padding-right: 2rem;
`;
const NewPlantContainer = () => {
  return (
    <StyledContainer>
      <CreatePlant />
    </StyledContainer>
  );
};

export default NewPlantContainer;
