import classnames from 'classnames';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastTypes, pushToast } from '../../Global/myToaster';
import { tokenParser } from '../../Global/tokenParser';
import { route } from '../../Routes';
import { NavItem, Wrapper } from './styles';

export type NavItemType = 'Home' | 'Jokes' | 'Learn' | 'LogIn';

export const NavBar = ({ navItem = 'Home' }: { navItem?: NavItemType }) => {
  const [active, setActive] = useState(navItem);
  const navigate = useNavigate();
  const user = tokenParser(sessionStorage.getItem('accessToken') ?? '');
  const displayName =
    user?.displayName.length > 35 ? user.displayName.slice(0, 35) + '...' : user?.displayName || '';

  return (
    <Wrapper>
      <NavItem
        className={classnames({ active: active === 'Home' })}
        onClick={() => {
          setActive('Home');
          navigate(route.home);
        }}
      >
        Home
      </NavItem>
      <NavItem
        className={classnames({ active: active === 'Jokes' })}
        onClick={() => {
          const page = displayName ? route.userPage : route.jokes;
          setActive('Jokes');
          navigate(page);
        }}
      >
        Jokes
      </NavItem>
      {/* <NavItem
        className={classnames({active: active==='Learn'})}
        onClick={() => {
          setActive('Learn');
          navigate(route.learn)
        }}
      >
        Learn Comedy
      </NavItem> */}
      <NavItem
        className={classnames({ active: active === 'LogIn' })}
        onClick={() => {
          try {
            if (displayName) {
              pushToast('Logged Out');
            }
            sessionStorage.removeItem('accessToken');
            setActive('LogIn');
            navigate(route.login);
          } catch (err) {
            pushToast('Error Logging Out', ToastTypes.error);
          }
        }}
      >
        {displayName ? `${displayName}, Sign Out` : 'Log In / Create Account'}
      </NavItem>
    </Wrapper>
  );
};
