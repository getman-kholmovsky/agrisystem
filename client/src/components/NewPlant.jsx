import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const StyledPlant = styled.div`
  display: flex;
  padding: 1rem;
`;

const PlantCard = styled.div`
  background-color: white;
  box-shadow: 0 20px 40px -14px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  border-radius: 0.25rem;
  min-width: 90vw;
`;

const StyledForm = styled.form`
  padding: 5rem;
  display: flex;
  flex-direction: column;
`;
const StyledInput = styled.input`
  outline: none;
  border-radius: 0.5rem;
  border: 2px solid lightgray;
  font-size: 1.5rem;
  padding: 0.6em;
  min-width: 20rem;
  width: 70%;

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
  outline: none;
  border-radius: 0.5rem;
  border: 2px solid lightgray;
  font-size: 1.5rem;
  padding: 0.6em;
  min-width: 20rem;
  width: 70%;

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

const NewPlant = () => {
  const [data, setData] = useState({
    name: '',
    description: '',
    excerpt: '',
    small_image: null,
    big_image: null,
    family: 'Декоративные',
    growingSeason: '',
    wateringFrequency: '',
    temperature: '',
    fertilizer: '',
  });

  const history = useHistory();

  const handleChange = (e) => {
    // console.log(e);
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const addPlant = async (newData) => {
    console.log(newData);
    const request = await fetch(`/api/agriculture/`, {
      method: 'POST',
      body: JSON.stringify(newData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    history.push('/');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addPlant({
      name: data.name,
      description: data.description,
      excerpt: data.excerpt,
      small_image: data.small_image,
      big_image: data.big_image,
      family: data.family,
      growing_season: data.growingSeason,
      watering_frequency: data.wateringFrequency,
      temperature: data.temperature,
      fertilizer: data.fertilizer,
    });
    console.log(data);
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
    <StyledPlant>
      <PlantCard>
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
      </PlantCard>
    </StyledPlant>
  );
};

export default NewPlant;
