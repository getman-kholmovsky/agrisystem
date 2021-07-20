import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const StyledEditPlant = styled.div`
  display: flex;
  padding: 1rem;
  max-width: 50rem;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;
const StyledInput = styled.input`
  outline: none;
  border-radius: 0.5rem;
  border: 2px solid lightgray;
  font-size: 1.5rem;
  padding: 0.6em;
  min-width: 25rem;
  max-width: 50rem;

  &::placeholder {
    color: lightgray;
  }
  &:hover:not(:disabled):not(:focus) {
    border-color: silver;
  }
  &:focus {
    border-color: darkgray;
  }
`;
const StyledLabel = styled.label`
  font-size: 2rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const SubmitButton = styled.input`
  font-size: 1.5rem;
  padding: 1rem;
  max-width: 20rem;
  align-self: center;
  cursor: pointer;
`;

const EditPlant = ({ initData, handleEditMode }) => {
  const [data, setData] = useState({
    name: initData.name,
    description: initData.description,
    family: initData.family,
    growingSeason: initData.growing_season,
    wateringFrequency: initData.watering_frequency,
    temperature: initData.temperature,
    fertilizer: initData.fertilizer,
  });

  const editPlant = async (newData) => {
    console.log(newData);
    const request = await fetch(`/api/agriculture/${initData._id}`, {
      method: 'PUT',
      body: JSON.stringify(newData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    handleEditMode();
  };

  const handleSumbit = (e) => {
    editPlant({
      name: data.name,
      description: data.description,
      excerpt:
        'описание для карточки. Если его нет, то берется некоторая часть из полного описания',
      small_image: 'маленькое изображение для карточки',
      big_image: 'нормальное изображение для просмотра',
      family: data.family,
      growing_season: data.growingSeason,
      watering_frequency: data.wateringFrequency,
      temperature: data.temperature,
      fertilizer: data.fertilizer,
    });
  };

  const handleChange = (e) => {
    // console.log(e);
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <StyledEditPlant>
      <StyledForm onSubmit={handleSumbit}>
        <StyledLabel>
          Название:
          <StyledInput
            type='text'
            name='name'
            placeholder='Введите Название'
            value={data.name}
            onChange={(e) => handleChange(e)}
          ></StyledInput>
        </StyledLabel>
        <StyledLabel>
          Описание:
          <StyledInput
            type='text'
            name='description'
            placeholder='Введите Описание'
            value={data.description}
            onChange={(e) => handleChange(e)}
          ></StyledInput>
        </StyledLabel>
        <StyledLabel>
          Семейство:
          <StyledInput
            type='text'
            name='family'
            placeholder='Введите Семейство'
            value={data.family}
            onChange={(e) => handleChange(e)}
          ></StyledInput>
        </StyledLabel>
        <StyledLabel>
          Сезон:
          <StyledInput
            type='text'
            name='growingSeason'
            placeholder='Введите Сезон'
            value={data.growingSeason}
            onChange={(e) => handleChange(e)}
          ></StyledInput>
        </StyledLabel>
        <StyledLabel>
          Полив:
          <StyledInput
            type='text'
            name='wateringFrequency'
            placeholder='Введите Полив'
            value={data.wateringFrequency}
            onChange={(e) => handleChange(e)}
          ></StyledInput>
        </StyledLabel>
        <StyledLabel>
          Температура:
          <StyledInput
            type='text'
            name='temperature'
            placeholder='Введите Температура'
            value={data.temperature}
            onChange={(e) => handleChange(e)}
          ></StyledInput>
        </StyledLabel>
        <StyledLabel>
          Удобрения:
          <StyledInput
            type='text'
            name='fertilizer'
            placeholder='Введите Удобрения'
            value={data.fertilizer}
            onChange={(e) => handleChange(e)}
          ></StyledInput>
        </StyledLabel>
        <SubmitButton type='submit' value='Отправить' />
      </StyledForm>
    </StyledEditPlant>
  );
};

export default EditPlant;
