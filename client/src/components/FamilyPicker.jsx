import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledFamilyPicker = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-top: 1rem;
  padding-left: 3rem;
  padding-right: 3rem;
  background-color: #f0f0f0;
`;

const FamilyButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const Button = styled.button`
  background-color: white;
  cursor: pointer;
  padding: 0.2rem;
  font-size: 1.5rem;
  margin-right: 1rem;
  &:last-child {
    margin-right: 0;
  }
`;

const FamilyPicker = () => {
  const [currentFamily, setCurrentFamily] = useState('Catalog');
  return (
    <StyledFamilyPicker>
      <Link to='/new'>
        <Button>Добавить</Button>
      </Link>
      <FamilyButtons>
        <Button>Family1</Button>
        <Button>Family2</Button>
        <Button>Family3</Button>
        <Button>Family4</Button>
        <Button>Family5</Button>
      </FamilyButtons>
    </StyledFamilyPicker>
  );
};

export default FamilyPicker;
