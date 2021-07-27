import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import SaveIcon from '@material-ui/icons/Save';

const CardDescriptionName = styled.span`
  margin-right: 0.5rem;
  font-weight: 600; ;
`;
const StyledCardMedia = styled(CardMedia)``;

const StyledCard = styled(Card)`
  margin-top: 0.5rem;
  max-width: 50rem;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyledFormContainer = styled.div`
  padding-right: 1rem;
  min-width: 45rem;
`;

const StyledCardContent = styled(CardContent)``;

const CreatePlant = () => {
  const [data, setData] = useState({
    name: '',
    description: '',
    excerpt: '',
    small_image: null,
    big_image: null,
    family: 'Декоративные',
    sowing_month: '',
    growing_month: '',
    watering_details: '',
    temperature: '',
    fertilizer: '',
    diseases: '',
  });

  const history = useHistory();

  const handleChange = (e) => {
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
    addPlant(data);
    console.log(data);
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

  const useStyles = makeStyles({
    media: {
      height: 350,
    },
  });
  const classes = useStyles();

  return (
    <StyledCard>
      <StyledCardContent>
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
      </StyledCardContent>
    </StyledCard>
  );
};

export default CreatePlant;
