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
  padding: 0.5rem;
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

const StyledSelect = styled.select`
  /* font-size: 1.5rem; */
  outline: none;
  border-radius: 0.5rem;
  border: 2px solid lightgray;
  font-size: 1.5rem;
  padding: 0.5rem;
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

const EditPlant = ({ initData, handleEditMode }) => {
  const [data, setData] = useState({
    name: initData.name,
    description: initData.description,
    excerpt: initData.excerpt,
    small_image: initData.small_image,
    big_image: initData.big_image,
    family: initData.family || 'Декоративные',
    sowing_month: initData.sowing_month,
    growing_month: initData.growing_month,
    watering_details: initData.watering_details,
    temperature: initData.temperature,
    fertilizer: initData.fertilizer,
    diseases: initData.diseases
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

  const handleSubmit = (e) => {
    editPlant({
      name: data.name,
      description: data.description,
      excerpt: data.excerpt,
      small_image: data.small_image,
      big_image: data.big_image,
      family: data.family,
      sowing_month: data.sowing_month,
      growing_month: data.growing_month,
      watering_details: data.watering_details,
      temperature: data.temperature,
      fertilizer: data.fertilizer,
      diseases: data.diseases
    });
  };

  const handleChange = (e) => {
    // console.log(e);
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const uploadImage = async (e, sizeType) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);

    const dataWithImage = sizeType === 'big' ? { ...data, big_image: base64 } : { ...data, small_image: base64 };
    setData(dataWithImage);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <StyledEditPlant>
      <StyledForm onSubmit={handleSubmit}>
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
          Короткое описание:
          <StyledInput
            type='text'
            name='excerpt'
            placeholder='Введите короткое описание'
            value={data.excerpt}
            onChange={(e) => handleChange(e)}
          ></StyledInput>
        </StyledLabel>
        <StyledLabel>
          Семейство:
          {/* <StyledInput
            type='text'
            name='family'
            placeholder='Введите Семейство'
            value={data.family}
            onChange={(e) => handleChange(e)}
          ></StyledInput> */}
          <StyledSelect
            type='text'
            name='family'
            placeholder='Выберете Семейство'
            value={data.family}
            onChange={(e) => handleChange(e)}
          >
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
          </StyledSelect>
        </StyledLabel>
        <StyledLabel>
          Сезон посева:
          <StyledInput
              type='text'
              name='sowing_month'
              placeholder='Сезон посева'
              value={data.sowing_month}
              onChange={(e) => handleChange(e)}
          ></StyledInput>
        </StyledLabel>
        <StyledLabel>
          Сезон cбора:
          <StyledInput
              type='text'
              name='growing_month'
              placeholder='Сезон сбора'
              value={data.growing_month}
              onChange={(e) => handleChange(e)}
          ></StyledInput>
        </StyledLabel>
        <StyledLabel>
          Особенности полива:
          <StyledInput
              type='text'
              name='watering_details'
              placeholder='Введите Полив'
              value={data.watering_details}
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
        <StyledLabel>
          Болезни:
          <StyledInput
              type='text'
              name='diseases'
              placeholder='Болезни'
              value={data.diseases}
              onChange={(e) => handleChange(e)}
          ></StyledInput>
        </StyledLabel>
        <StyledLabel>
          Большое фото:
          <StyledInput
              type='file'
              name='big_image'
              onChange={(e) => uploadImage(e, 'big')}
          />
        </StyledLabel>
        <StyledLabel>
          Маленькое фото:
          <StyledInput
              type='file'
              name='small_image'
              onChange={(e) => uploadImage(e, 'small')}
          />
        </StyledLabel>
        <SubmitButton type='submit' value='Отправить' />
      </StyledForm>
    </StyledEditPlant>
  );
};

export default EditPlant;
