import { createContext } from 'react';
import { NavBar } from '../Home/NavBar';
import { Wrapper } from './styles';
import { useLocation } from 'react-router-dom';
import { WriteJoke } from '../Home/WriteJoke';
import { MyJokes } from './MyJokes';
import { UserCard } from './UserCard';
import { ReadJoke } from '../Home/ReadJoke';

export const UserContext = createContext(null);

export const UserPage = () => {
  const user = useLocation().state;

  return (
    <UserContext.Provider value={user}>
      <NavBar navItem='Jokes' />
      <Wrapper>
        <ReadJoke isBigComp />
        <WriteJoke isBigComp />
        <MyJokes />
        <UserCard />
      </Wrapper>
    </UserContext.Provider>
  );
};
