import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import img from '../img/coffee.jpg';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import NewEditPlant from './NewEditPlant';

const CardDescriptionName = styled.span`
  margin-right: 0.5rem;
  font-weight: 600; ;
`;
const StyledCardMedia = styled(CardMedia)``;

const StyledCard = styled(Card)`
  margin-top: 0.5rem;
  max-width: 50rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
`;

const StyledTypography = styled(Typography)`
  line-height: 1.5;
  margin-bottom: 1.25rem;
`;

const StyledCardContent = styled(CardContent)``;

const Plant = ({ data, handleDelete, getPlant }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const useStyles = makeStyles({
    media: {
      height: 350,
    },
  });
  const classes = useStyles();

  return (
    <StyledCard>
      {isEditMode ? (
        ''
      ) : (
        <StyledCardMedia
          className={classes.media}
          image={data.big_image ? '/' + data.big_image : img}
        />
      )}
      <StyledCardContent>
        {isEditMode ? (
          <NewEditPlant
            initData={data}
            handleEditMode={handleEditMode}
            getPlant={getPlant}
          />
        ) : (
          <>
            <StyledTypography gutterBottom variant='h3' component='h2'>
              {data.name}
            </StyledTypography>
            <StyledTypography
              variant='body2'
              color='textSecondary'
              component='p'
            >
              <CardDescriptionName>Описание:</CardDescriptionName>
              {data.description}
            </StyledTypography>
            <StyledTypography
              variant='body2'
              color='textSecondary'
              component='p'
            >
              <CardDescriptionName>Семейство:</CardDescriptionName>
              {data.family}
            </StyledTypography>
            <StyledTypography
              variant='body2'
              color='textSecondary'
              component='p'
            >
              <CardDescriptionName>Сезон посева:</CardDescriptionName>
              {data.sowing_month}
            </StyledTypography>
            <StyledTypography
              variant='body2'
              color='textSecondary'
              component='p'
            >
              <CardDescriptionName>Сезон сбора:</CardDescriptionName>
              {data.growing_month}
            </StyledTypography>
            <StyledTypography
              variant='body2'
              color='textSecondary'
              component='p'
            >
              <CardDescriptionName>Особенности полива:</CardDescriptionName>
              {data.watering_details}
            </StyledTypography>
            <StyledTypography
              variant='body2'
              color='textSecondary'
              component='p'
            >
              <CardDescriptionName>Температура:</CardDescriptionName>
              {data.temperature}
            </StyledTypography>
            <StyledTypography
              variant='body2'
              color='textSecondary'
              component='p'
            >
              <CardDescriptionName>Удобрения:</CardDescriptionName>
              {data.fertilizer}
            </StyledTypography>
            <StyledTypography
              variant='body2'
              color='textSecondary'
              component='p'
            >
              <CardDescriptionName>Болезни:</CardDescriptionName>
              {data.diseases}
            </StyledTypography>
          </>
        )}
      </StyledCardContent>
      {isEditMode ? (
        ''
      ) : (
        <ButtonsContainer>
          <Button
            variant='contained'
            color='primary'
            startIcon={<EditIcon />}
            onClick={() => handleEditMode()}
          >
            Изменить
          </Button>
          <Button
            variant='contained'
            color='secondary'
            startIcon={<DeleteIcon />}
            onClick={() => handleDelete(data._id)}
          >
            Удалить
          </Button>
        </ButtonsContainer>
      )}
    </StyledCard>
  );
};

export default Plant;
