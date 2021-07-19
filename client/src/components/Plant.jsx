import React from 'react';
import styled from 'styled-components';
import img from '../img/coffee.jpg';

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
  padding-right: 1rem;
  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

const CardImgContiner = styled.div`
  min-width: 40%;
`;

const CardImg = styled.img`
  display: block;
  width: 100%;
  height: auto;
  border-top-left-radius: 0.25rem;
`;
const CardContent = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  padding-left: 1rem;
`;
const CardTitle = styled.p`
  font-size: 4rem;
  font-weight: 300;
  letter-spacing: 2px;
  text-transform: uppercase;
`;
const CardDescriptionItem = styled.div`
  display: flex;
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

const Plant = ({ data }) => {
  console.log(data);
  return (
    <StyledPlant>
      <PlantCard>
        <CardImgContiner>
          <CardImg src={img} />
        </CardImgContiner>
        <CardContent>
          <CardTitle> {data.name}</CardTitle>
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
        </CardContent>
      </PlantCard>
    </StyledPlant>
  );
};

export default Plant;
