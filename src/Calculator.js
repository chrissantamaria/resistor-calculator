import React, { useState } from 'react';
import { Typography, TextField, IconButton } from '@material-ui/core';
import { NavigateBefore, NavigateNext } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import { findClosestCombination, toPrecision } from './utils/calculator';
import Dialog from './components/Dialog';
import { useNotification } from './providers/NotificationProvider';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  section: {
    marginBottom: 40
  },
  numResistors: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default function Calculator() {
  const classes = useStyles();

  const setNotification = useNotification();

  const [desired, setDesired] = useState(40);
  const [numResistors, setNumResistors] = useState(2);
  const [dialogOpen, setDialogOpen] = useState(false);

  const decNumResistors = () => {
    if (numResistors !== 1) setNumResistors(num => num - 1);
    else setNotification('Cannot set number of resistors below 1');
  };
  const incNumResistors = () => {
    if (numResistors === 2) {
      setDialogOpen(true);
    } else setNumResistors(num => num + 1);
  };

  const seriesResistors = findClosestCombination(
    desired,
    numResistors,
    'series'
  );
  const parallelResistors = findClosestCombination(
    desired,
    numResistors,
    'parallel'
  );

  return (
    <div className={classes.container}>
      <div className={classes.section}>
        <Typography variant="h4" gutterBottom>
          Desired Resistance
        </Typography>
        <TextField
          type="number"
          variant="outlined"
          value={desired || ''}
          onChange={e =>
            setDesired(e.target.value ? parseFloat(e.target.value) : null)
          }
        />
      </div>

      <div className={classes.section}>
        <Typography variant="h4">Max # of Resistors</Typography>
        <div className={classes.numResistors}>
          <IconButton onClick={decNumResistors}>
            <NavigateBefore />
          </IconButton>
          <Typography variant="h5">{numResistors}</Typography>
          <IconButton onClick={incNumResistors}>
            <NavigateNext />
          </IconButton>
        </div>
      </div>

      {desired && (
        <ResistorsDisplay
          series={seriesResistors}
          parallel={parallelResistors}
        />
      )}

      <Dialog
        title="Are you sure?"
        content="Calculating with more than two resistors can be fairly slow."
        open={dialogOpen}
        setOpen={setDialogOpen}
        onConfirm={() => setNumResistors(num => num + 1)}
      />
    </div>
  );
}

const ResistorsDisplay = ({ series, parallel }) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.section}>
        <Typography variant="h4" gutterBottom>
          Series Resistors
        </Typography>
        <Typography variant="h5">
          {`${series.values.map(val => `${val}Ω`).join(' + ')}
            = ${series.resistance}Ω`}
        </Typography>
        <Typography variant="subtitle1">
          {`(${toPrecision(series.error * 100, 3)}% error)`}
        </Typography>
      </div>

      <div className={classes.section}>
        <Typography variant="h4" gutterBottom>
          Parallel Resistors
        </Typography>
        <Typography variant="h5">
          {`${parallel.values.map(val => `${val}Ω`).join(' ∥ ')}
            = ${parallel.resistance}Ω`}
        </Typography>
        <Typography variant="subtitle1">
          {`(${toPrecision(parallel.error * 100, 3)}% error)`}
        </Typography>
      </div>
    </>
  );
};
