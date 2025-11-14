import { createBrowserRouter } from 'react-router-dom';
import { Home } from './Home';
import { LogIn } from './LogIn';
import { UserPage } from './UserPage';
import { JokePage } from './Jokes';
import { About } from './About';

export const route = {
  about: '/about',
  home: '/',
  jokes: '/jokes',
  learn: '/learn',
  login: '/login',
  userPage: '/userpage'
};

export const Routes = createBrowserRouter([
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/jokes',
    element: <JokePage />
  },
  {
    path: '/learn',
    element: <Home />
  },
  {
    path: '/login',
    element: <LogIn />
  },
  {
    path: '/userpage',
    element: <UserPage />
  }
]);
