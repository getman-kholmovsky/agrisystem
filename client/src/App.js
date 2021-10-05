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
  height: 100vh;
`;

const App = () => {
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageData, setpageData] = useState(null);
  const [family, setFamily] = useState('');

  const handleCurrentPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleTotalCountChange = (count) => {
    setTotalCount(count);
  };

  const numberPages = Math.ceil(totalCount / 3);
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
          <Route exact path='/page/:pageNumber'>
            <CardList
              handleCurrentPageChange={handleCurrentPageChange}
              handleTotalCountChange={handleTotalCountChange}
              numberPages={numberPages}
              currentPage={currentPage}
              pageData={pageData}
              setpageData={setpageData}
              family={family}
              setFamily={setFamily}
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
            <CardList
              handleCurrentPageChange={handleCurrentPageChange}
              handleTotalCountChange={handleTotalCountChange}
              currentPage={currentPage}
              numberPages={numberPages}
              pageData={pageData}
              setpageData={setpageData}
              family={family}
              setFamily={setFamily}
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
