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

const FamilyPicker = () => {
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
      {/* <StyledSelect
        onChange={(e) => handleChange(e.target.value)}
        defaultValue='Выбрать семейство'
      >
        <option>Выбрать семейство</option>
        <option value='Декоративные'>Декоративные</option>
        <option value='Зерновые'>Зерновые</option>
        <option value='Бобовые'>Бобовые</option>
        <option value='Крахмалоносные'>Крахмалоносные</option>
        <option value='Сахароносные'>Сахароносные</option>
        <option value='Масличные'>Масличные</option>
        <option value='Волокнистые'>Волокнистые</option>
        <option value='Бахчевые'>Бахчевые</option>
        <option value='Плодовые'>Плодовые</option>
        <option value='Стимулирующие'>Стимулирующие</option>
      </StyledSelect> */}
      {/* <FamilySelect></FamilySelect> */}
    </StyledFamilyPicker>
  );
};

export default FamilyPicker;
