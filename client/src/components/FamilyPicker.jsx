import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';

const StyledFamilyPicker = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-top: 1rem;
  padding-left: 3rem;
  padding-right: 3rem;
  background-color: #f0f0f0;
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

const Select = styled.select`
  font-size: 1.5rem;
`;

const FamilyPicker = () => {
  let history = useHistory();

  const handleChange = (value) => {
    history.push(`/page/1/${value}`);
  };

  return (
    <StyledFamilyPicker>
      <Link to='/new'>
        <Button>Добавить</Button>
      </Link>
      <Select onChange={(e) => handleChange(e.target.value)}>
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
      </Select>
    </StyledFamilyPicker>
  );
};

export default FamilyPicker;
