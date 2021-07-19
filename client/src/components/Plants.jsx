import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Plant from './Plant';

const StyledPlants = styled.div`
  height: 90vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  padding-left: 2rem;
  padding-right: 2rem;
  background-color: #f0f0f0;
`;

const Plants = (props) => {
  const [plantData, setplantData] = useState(null);

  const getPant = async (id) => {
    const newData = await fetch(
      `/api/agriculture/${props.match.params.id}`
    ).then((data) => data.json());
    const plantData = newData.data;
    return plantData;
  };

  useEffect(() => {
    getPant().then((data) => setplantData(data));
  }, []);
  return <StyledPlants>{plantData && <Plant data={plantData} />}</StyledPlants>;
};

export default withRouter(Plants);
