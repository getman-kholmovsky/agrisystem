import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import img from '../img/coffee.jpg';
import { FaEdit, FaTrash, FaCheck } from 'react-icons/fa';
import EditPlant from './EditPlant';

const StyledPlant = styled.div`
  display: flex;
  padding: 1rem;
  overflow-wrap: anywhere;
`;

const PlantCard = styled.div`
  background-color: white;
  box-shadow: 0 20px 40px -14px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  border-radius: 0.25rem;
  /* @media (min-width: 50rem) {
    max-width: 80vw;
  }
  @media (min-width: 100rem) {
    max-width: 60vw;
  } */
`;

const CardImgContiner = styled.div`
  max-width: 50rem;
`;

const CardImg = styled.img`
  display: block;
  width: 100%;
  height: auto;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  margin-bottom: 0.5rem;
`;
const CardContent = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  padding-left: 1rem;
  padding-right: 1rem;
  max-width: 50rem;
`;
const CardTitle = styled.p`
  font-size: 3em;
  font-weight: 300;
  letter-spacing: 2px;
  text-transform: uppercase;
  align-self: center;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const CardDescriptionName = styled.span`
  margin-right: 0.5rem;
  font-weight: 600; ;
`;
const CardDescription = styled.p`
  font-size: 1.5rem;
  line-height: 1.5;
  margin-bottom: 1.25rem;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  align-self: ${(props) => props.side};
  top: 4rem;
  cursor: pointer;
  background-color: white;
  border-radius: 1rem;
  width: 3rem;
  height: 3rem;
  box-shadow: 0px 15px 15px rgba(0, 0, 0, 0.2);
  transition: transform 200ms ease-in;
  &:hover {
    transform: scale(1.1);
  }
`;

const DeleteIcon = styled(FaTrash)`
  font-size: 2.5rem;
  color: black;
`;
const EditIcon = styled(FaEdit)`
  font-size: 2.5rem;
  color: black;
`;
const CheckIcon = styled(FaCheck)`
  font-size: 2.5rem;
  color: black;
`;

const Styledinput = styled.input``;

const Plant = ({ data, handleDelete, getPlant }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  // console.log(data);

  const handleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  return (
    <StyledPlant>
      <PlantCard>
        <IconContainer side='flex-end' onClick={() => handleDelete(data._id)}>
          <DeleteIcon />
        </IconContainer>
        {isEditMode ? (
          ''
        ) : (
          <IconContainer side='flex-start' onClick={() => handleEditMode()}>
            <EditIcon />
          </IconContainer>
        )}
        {/* <IconContainer side='flex-start' onClick={() => handleEditMode()}>
          <EditIcon />
        </IconContainer> */}
        <CardImgContiner>
          <CardImg
            src={data.big_image ? '/' + data.big_image : img}
          />
        </CardImgContiner>
        <CardContent>
          {isEditMode ? (
            <EditPlant
              initData={data}
              handleEditMode={handleEditMode}
              getPlant={getPlant}
            />
          ) : (
            <>
              <CardTitle>{data.name}</CardTitle>
              <CardDescription>
                <CardDescriptionName>Описание:</CardDescriptionName>
                {data.description}
              </CardDescription>
              <CardDescription>
                <CardDescriptionName>Семейство:</CardDescriptionName>
                {data.family}
              </CardDescription>
              <CardDescription>
                <CardDescriptionName>Сезон:</CardDescriptionName>
                {data.growing_season}
              </CardDescription>
              <CardDescription>
                <CardDescriptionName>Полив:</CardDescriptionName>
                {data.watering_frequency}
              </CardDescription>
              <CardDescription>
                <CardDescriptionName>Температура:</CardDescriptionName>
                {data.temperature}
              </CardDescription>
              <CardDescription>
                <CardDescriptionName>Удобрения:</CardDescriptionName>
                {data.fertilizer}
              </CardDescription>
            </>
          )}
          {/* <CardTitle>{data.name}</CardTitle>
          <CardDescription>
            <CardDescriptionName>Описание:</CardDescriptionName>
            {data.description}
          </CardDescription>
          <CardDescription>
            <CardDescriptionName>Семейство:</CardDescriptionName>
            {data.family}
          </CardDescription>
          <CardDescription>
            <CardDescriptionName>Сезон:</CardDescriptionName>
            {data.growing_season}
          </CardDescription>
          <CardDescription>
            <CardDescriptionName>Полив:</CardDescriptionName>
            {data.watering_frequency}
          </CardDescription>
          <CardDescription>
            <CardDescriptionName>Температура:</CardDescriptionName>
            {data.temperature}
          </CardDescription>
          <CardDescription>
            <CardDescriptionName>Удобрения:</CardDescriptionName>
            {data.fertilizer}
          </CardDescription> */}
        </CardContent>
      </PlantCard>
    </StyledPlant>
  );
};

export default Plant;
