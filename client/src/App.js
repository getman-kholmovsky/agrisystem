import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CardList from './components/CardList';
import FamilyPicker from './components/FamilyPicker';
import Pagination from './components/Pagination';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Plants from './components/Plants';
import PageNotFound from './components/PageNotFound';
import NewPlantContainer from './components/NewPlantContainer';
import Header from './components/Header';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f0f0f0;
`;

const App = () => {
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const handleCurrentPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleTotalCountChange = (count) => {
    setTotalCount(count);
  };

  const numberPages = Math.ceil(totalCount / 4);
  return (
    <Router>
      <AppWrapper>
        <Header />
        <Switch>
          <Route path='/plant/:id'>
            <Plants />
          </Route>
          <Route path='/new/'>
            <NewPlantContainer />
          </Route>
          <Route exact path='/page/:pageNumber?'>
            <FamilyPicker />
            <CardList
              handleCurrentPageChange={handleCurrentPageChange}
              handleTotalCountChange={handleTotalCountChange}
              numberPages={numberPages}
              currentPage={currentPage}
            />
            {totalCount > 4 ? (
              <Pagination
                pages={numberPages}
                currentPage={currentPage}
                handleCurrentPageChange={handleCurrentPageChange}
              />
            ) : (
              ''
            )}
          </Route>

          <Route exact path='/'>
            <FamilyPicker />
            <CardList
              handleCurrentPageChange={handleCurrentPageChange}
              handleTotalCountChange={handleTotalCountChange}
              currentPage={currentPage}
              numberPages={numberPages}
            />
            {totalCount > 4 ? (
              <Pagination
                pages={numberPages}
                currentPage={currentPage}
                handleCurrentPageChange={handleCurrentPageChange}
              />
            ) : (
              ''
            )}
          </Route>
          <Route path='*'>
            <PageNotFound />
          </Route>
        </Switch>
      </AppWrapper>
    </Router>
  );
};

export default App;
