import { useState } from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import { DarkModeSlider } from './DarkModeSlider';
import { getCookieByKey } from '../Global';

export const theme: DefaultTheme = {
  postIt: {
    yellow: '#ffec8f',
    pink: '#FF8AC0',
    orange: '#FCA64F',
    blue: '#8FAFFF',
    green: '#82ffbe',
    red: '#D32F2F'
  },
  bodyBackground: {
    dark: '#39393A',
    light: '#276891'
  },
  mode: 'light'
};

type ColorProps = 'background' | 'bodyBackground';

export const modeSelector = (passedTheme: DefaultTheme, color: ColorProps) =>
  passedTheme[color][passedTheme.mode];

type Props = { children: JSX.Element | JSX.Element[] };

export const Theme = ({ children }: Props) => {
  const mode: 'dark' | 'light' = (getCookieByKey('theme') || 'light') as 'dark' | 'light';
  const [myTheme, setMyTheme] = useState({ ...theme, mode });
  document.body.style.backgroundColor = myTheme.bodyBackground[mode];

  return (
    <ThemeProvider theme={myTheme}>
      <DarkModeSlider myTheme={myTheme} setMyTheme={setMyTheme}>
        {children}
      </DarkModeSlider>
    </ThemeProvider>
  );
};
