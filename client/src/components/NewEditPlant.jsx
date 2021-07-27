import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyledFormContainer = styled.div`
  padding-right: 1rem;
  min-width: 45rem;
`;

const NewEditPlant = ({ initData, handleEditMode }) => {
  const [data, setData] = useState({
    name: initData.name,
    description: initData.description,
    excerpt: initData.excerpt,
    small_image: null,
    big_image: null,
    family: initData.family || 'Декоративные',
    sowing_month: initData.sowing_month,
    growing_month: initData.growing_month,
    watering_details: initData.watering_details,
    temperature: initData.temperature,
    fertilizer: initData.fertilizer,
    diseases: initData.diseases,
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
      diseases: data.diseases,
    });
  };
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const uploadImage = async (e, sizeType) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);

    const dataWithImage =
      sizeType === 'big'
        ? { ...data, big_image: base64 }
        : { ...data, small_image: base64 };
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

  const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(0.1),
      },
    },
  }));

  const classes = useStyles();

  return (
    <StyledFormContainer>
      <StyledForm
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit}
        className={classes.root}
      >
        <TextField
          id='standard-required'
          label='Название'
          value={data.name}
          name='name'
          onChange={(e) => handleChange(e)}
        />
        <TextField
          id='standard-multiline-flexible'
          label='Описание'
          value={data.description}
          multiline
          maxRows={5}
          name='description'
          onChange={(e) => handleChange(e)}
        />
        <TextField
          id='standard-multiline-flexible'
          label='Короткое описание'
          multiline
          maxRows={5}
          value={data.excerpt}
          name='excerpt'
          onChange={(e) => handleChange(e)}
        />
        <TextField
          id='demo-simple-select-label'
          select
          label='Семейство'
          value={data.family}
          name='family'
          onChange={(e) => handleChange(e)}
        >
          <MenuItem value='Декоративные'>Декоративные</MenuItem>
          <MenuItem value='Зерновые'>Зерновые</MenuItem>
          <MenuItem value='Бобовые'>Бобовые</MenuItem>
          <MenuItem value='Крахмалоносные'>Крахмалоносные</MenuItem>
          <MenuItem value='Сахароносные'>Сахароносные</MenuItem>
          <MenuItem value='Масличные'>Масличные</MenuItem>
          <MenuItem value='Волокнистые'>Волокнистые</MenuItem>
          <MenuItem value='Бахчевые'>Бахчевые</MenuItem>
          <MenuItem value='Плодовые'>Плодовые</MenuItem>
          <MenuItem value='Стимулирующие'>Стимулирующие</MenuItem>
        </TextField>
        <TextField
          id='standard-multiline-flexible'
          multiline
          maxRows={5}
          label='Сезон посева'
          value={data.sowing_month}
          name='sowing_month'
          onChange={(e) => handleChange(e)}
        />
        <TextField
          id='standard-multiline-flexible'
          multiline
          maxRows={5}
          label='Сезон сбора'
          value={data.growing_month}
          name='growing_month'
          onChange={(e) => handleChange(e)}
        />
        <TextField
          id='standard-multiline-flexible'
          multiline
          maxRows={5}
          label='Особенности полива'
          value={data.watering_details}
          name='watering_details'
          onChange={(e) => handleChange(e)}
        />
        <TextField
          id='standard-multiline-flexible'
          multiline
          maxRows={5}
          label='Температура'
          value={data.temperature}
          name='temperature'
          onChange={(e) => handleChange(e)}
        />
        <TextField
          id='standard-multiline-flexible'
          multiline
          maxRows={5}
          label='Удобрения'
          value={data.fertilizer}
          name='fertilizer'
          onChange={(e) => handleChange(e)}
        />
        <TextField
          id='standard-multiline-flexible'
          multiline
          maxRows={5}
          label='Болезни'
          value={data.diseases}
          name='diseases'
          onChange={(e) => handleChange(e)}
        />
        <TextField
          label='Большое фото'
          type='file'
          name='big_image'
          onChange={(e) => uploadImage(e, 'big')}
          accept='image/*'
          multiple
          type='file'
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label='Маленькое фото'
          type='file'
          name='small_image'
          onChange={(e) => uploadImage(e, 'small')}
          accept='image/*'
          multiple
          type='file'
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button
          variant='contained'
          color='primary'
          type='submit'
          startIcon={<SaveIcon />}
        >
          Сохранить
        </Button>
      </StyledForm>
    </StyledFormContainer>
  );
};

export default NewEditPlant;
