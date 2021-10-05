import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import FamilySelect from './FamilySelect.jsx';

const StyledFamilyPicker = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding-top: 1rem;
  padding-left: 3rem;
  padding-right: 3rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
const StyledButton = styled(Button)``;

const FamilyPicker = (props) => {
  let history = useHistory();

  const handleChange = (value) => {
    history.push(`/page/1/${value}`);
  };

  return (
    <StyledFamilyPicker>
      <StyledLink to='/new'>
        <StyledButton variant='contained' color='primary' size='large'>
          Добавить
        </StyledButton>
      </StyledLink>
      <FamilySelect
        getPage={props.getPage}
        family={props.family}
        setFamily={props.setFamily}
      ></FamilySelect>
    </StyledFamilyPicker>
  );
};

export default FamilyPicker;
