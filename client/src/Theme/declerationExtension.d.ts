import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    postIt: {
      yellow: string;
      pink: string;
      blue: string;
      orange: string;
      green: string;
      red: string;
    };
    bodyBackground: {
      dark: string;
      light: string;
    };
    mode: 'dark' | 'light';
  }
}
