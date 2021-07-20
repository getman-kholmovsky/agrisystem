import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CardList from './components/CardList';
import FamilyPicker from './components/FamilyPicker';
import Pagination from './components/Pagination';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Plants from './components/Plants';
import PageNotFound from './components/PageNotFound';

const AppWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 1rem;
  background: white;
`;

const HeaderText = styled(Link)`
  font-size: 4rem;
  font-weight: 400;
  text-decoration: none;
  color: black;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
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

  const numberPages = Math.floor(totalCount / 4);
  return (
    <Router>
      <AppWrapper>
        <Header>
          <HeaderText to='/'>Plants bank</HeaderText>
        </Header>
        <Switch>
          <Route path='/plant/:id'>
            <Plants />
          </Route>
          <Route path='/page/:pageNumber?'>
            <FamilyPicker />
            <CardList
              handleCurrentPageChange={handleCurrentPageChange}
              handleTotalCountChange={handleTotalCountChange}
            />
            {totalCount > 4 ? (
              <Pagination pages={numberPages} currentPage={currentPage} />
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
