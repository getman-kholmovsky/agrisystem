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
  const [data, setData] = useState(null);
  const [totalCount, settotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setData(eval(`fakeData${pageNumber}`));
    setCurrentPage(pageNumber);
  };

  const numberPages = Math.floor(totalCount / 10 - 1);

  const getPage = async (pageNumber) => {
    const newData = await fetch('/api/agriculture').then((data) => data.json());
    const page = newData.page;
    const pageData = newData.data;
    return { page, pageData };
  };
  useEffect(() => {
    getPage().then(({ page, pageData }) => {
      setCurrentPage(page);
      setData(pageData);
    });
  }, []);
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
          <Route exact path='/'>
            <FamilyPicker />
            {data && <CardList data={data} />}
            {totalCount > 10 ? (
              <Pagination
                pages={numberPages}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
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
