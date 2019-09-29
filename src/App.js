import React from 'react';
import { Paper, Container } from '@material-ui/core';
import { CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ThemeProvider from './providers/ThemeProvider';
import NotificationProvider from './providers/NotificationProvider';
import Calculator from './Calculator';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

const useStyles = makeStyles({
  app: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  paper: {
    margin: 40,
    padding: 20
  }
});

export default function App() {
  const classes = useStyles();

  return (
    <ThemeProvider>
      <CssBaseline />
      <NotificationProvider>
        <div className={classes.app}>
          <NavBar />
          <Container maxWidth="sm">
            <Paper className={classes.paper}>
              <Calculator />
            </Paper>
          </Container>
          <Footer />
        </div>
      </NotificationProvider>
    </ThemeProvider>
  );
}
