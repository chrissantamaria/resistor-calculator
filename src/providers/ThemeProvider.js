import React, { useState, useEffect, createContext, useContext } from 'react';
import { CssBaseline } from '@material-ui/core';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { ThemeProvider as MUIThemeProvider } from '@material-ui/styles';

const ThemeContext = createContext({
  dark: false,
  toggleTheme: () => {}
});
export const useTheme = () => useContext(ThemeContext);

export default ({ children }) => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const lsDark = localStorage.getItem('dark') === 'true';
    setDark(lsDark);
  }, []);

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
        <CssBaseline />
        {children}
      </ThemeContext.Provider>
    </MUIThemeProvider>
  );
};
