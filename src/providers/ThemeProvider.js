import React, { useState, useEffect, createContext, useContext } from 'react';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { ThemeProvider as MUIThemeProvider } from '@material-ui/styles';

const ThemeContext = createContext({
  dark: false,
  toggleTheme: () => {}
});
export const useTheme = () => useContext(ThemeContext);

const useEffectDarkMode = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const lsDark = localStorage.getItem('dark') === 'true';
    setDark(lsDark);
  }, []);

  return [dark, setDark];
};

export default ({ children }) => {
  const [dark, setDark] = useEffectDarkMode();

  const toggleTheme = () => {
    localStorage.setItem('dark', JSON.stringify(!dark));
    setDark(dark => !dark);
  };

  const computedTheme = responsiveFontSizes(
    createMuiTheme({
      palette: {
        type: dark ? 'dark' : 'light'
      }
    })
  );

  return (
    <MUIThemeProvider theme={computedTheme}>
      <ThemeContext.Provider
        value={{
          dark,
          toggleTheme
        }}
      >
        {children}
      </ThemeContext.Provider>
    </MUIThemeProvider>
  );
};
