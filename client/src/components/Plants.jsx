import React, { useEffect, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Plant from './Plant';

const StyledPlants = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  padding-left: 2rem;
  padding-right: 2rem;
  background-color: #f0f0f0;
`;

const Plants = (props) => {
  const [plantData, setplantData] = useState({
    _id: null,
    name: null,
    description: null,
    excerpt: null,
    small_image: null,
    big_image: null,
    family: null,
    sowing_season: null,
    growing_season: null,
    watering_details: null,
    temperature: null,
    fertilizer: null,
    diseases: null
  });
  const history = useHistory();

  const getPlant = async (id) => {
    const newData = await fetch(
      `/api/agriculture/${props.match.params.id}`
    ).then((data) => data.json());
    const plantData = newData.data;
    return plantData;
  };

  const deletePlant = async (id) => {
    const request = await fetch(`/api/agriculture/${id}`, {
      method: 'DELETE',
    });
    history.push('/');
  };

  const editPlant = async (data) => {
    const request = await fetch(`/api/agriculture/${data._id}`, {
      method: 'PUT',
      body: data,
    });
    setplantData(data);
  };
  const handleDelete = (id) => {
    deletePlant(id);
  };

  const handleEdit = (data) => {
    editPlant({ name: data });
  };

  useEffect(() => {
    getPlant().then((data) =>
      setplantData(data)
    );
  }, []);
  console.log(plantData);
  return (
    <StyledPlants>
      {plantData._id && (
        <Plant
          // {...(plantData._id && { data: plantData })}
          data={plantData}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          getPlant={getPlant}
        />
      )}
    </StyledPlants>
  );
};

export default withRouter(Plants);
