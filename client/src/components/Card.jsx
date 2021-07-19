import React from 'react';
import styled from 'styled-components';
import img from '../img/coffee.jpg';
import { Link } from 'react-router-dom';

const CardItem = styled.div`
  display: flex;
  padding: 1rem;
  @media (min-width: 50rem) {
    width: 50%;
  }
  @media (min-width: 80rem) {
    width: 25%;
  }
`;

const StyledCard = styled(Link)`
  background-color: white;
  box-shadow: 0 20px 40px -14px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  border-radius: 0.25rem;
  text-decoration: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const CardImg = styled.img`
  height: auto;
  max-width: 100%;
  vertical-align: middle;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  overflow: hidden;
  position: relative;
`;
const CardContent = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  padding: 1rem;
`;
const CardTitle = styled.p`
  color: #696969;
  font-size: 1.25rem;
  font-weight: 300;
  letter-spacing: 2px;
  text-transform: uppercase;
`;
const CardDescription = styled.p`
  flex: 1 1 auto;
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 1.25rem;
  color: black;
`;
const CardButton = styled.button`
  font-size: 1rem;

  background-color: white;
  border: 1px solid #cccccc;
  color: #696969;
  padding: 0.5rem;
  text-transform: lowercase;
`;

const Card = ({ data }) => {
  return (
    <CardItem>
      <StyledCard to={`/plant/${data._id}`}>
        <CardImg src={img} />
        <CardContent>
          <CardTitle> {data.name}</CardTitle>
          <CardDescription>{data.description}</CardDescription>
          <CardButton>подробнее</CardButton>
        </CardContent>
      </StyledCard>
    </CardItem>
  );
};

export default Card;
