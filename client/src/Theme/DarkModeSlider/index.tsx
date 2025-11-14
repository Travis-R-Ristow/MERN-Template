import classnames from 'classnames';
import { theme } from '..';
import { Option, Wrapper } from './styles';
import { DefaultTheme } from 'styled-components';
import { setCookie } from '../../Global';

type Props = {
  children: JSX.Element | JSX.Element[];
  myTheme: DefaultTheme;
  setMyTheme: (theme: DefaultTheme) => void;
};

export const DarkModeSlider = ({ myTheme, setMyTheme, children }: Props) => {
  const handleSetMode = (mode: 'dark' | 'light') => {
    setCookie('theme', mode);
    setMyTheme({ ...myTheme, mode });
    document.body.style.backgroundColor = theme.bodyBackground[mode];
  };

  return (
    <>
      <Wrapper>
        <Option
          className={classnames({ dark: true, selected: myTheme.mode === 'dark' })}
          onClick={() => handleSetMode('dark')}
        >
          Dark
        </Option>
        <Option
          className={classnames({ light: true, selected: myTheme.mode === 'light' })}
          onClick={() => handleSetMode('light')}
        >
          Light
        </Option>
      </Wrapper>
      {children}
    </>
  );
};
