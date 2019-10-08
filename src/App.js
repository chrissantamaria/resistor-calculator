import React from 'react';
import { Grid, Paper, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ThemeProvider from './providers/ThemeProvider';
import NotificationProvider from './providers/NotificationProvider';
import Calculator from './Calculator';
import About from './About';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

const useStyles = makeStyles({
  app: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  grid: {
    padding: 20
  },
  paper: {
    margin: 10,
    padding: 20
  }
});

export default function App() {
  const classes = useStyles();

  return (
    <ThemeProvider>
      <NotificationProvider>
        <div className={classes.app}>
          <NavBar />
          <Container maxWidth="lg">
            <Grid container className={classes.grid} spacing={0}>
              <Grid item md={4} xs={12}>
                <Paper className={classes.paper}>
                  <Calculator />
                </Paper>
              </Grid>
              <Grid item md={8} xs={12}>
                <Paper className={classes.paper}>
                  <About />
                </Paper>
              </Grid>
            </Grid>
          </Container>
          <Footer />
        </div>
      </NotificationProvider>
    </ThemeProvider>
  );
}
