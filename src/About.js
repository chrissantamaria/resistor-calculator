import React from 'react';
import { Typography } from '@material-ui/core';
import Latex from 'react-latex';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  section: {
    marginBottom: theme.spacing(2)
  }
}));

export default function About() {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h4" gutterBottom>
        What is this?
      </Typography>
      <Typography variant="body1" gutterBottom>
        Often times when assembling circuits, there may not be an exact resistor
        to match your schematic. Multiple resistors in series or parallel can be
        used instead to approximate or sometimes exactly match the desired
        resistance.
      </Typography>

      <Typography variant="h4" gutterBottom>
        Resistance Calculations
      </Typography>
      <div className={classes.section}>
        <Typography variant="body1" gutterBottom>
          Resistors in series are additive, making for a very simple
          calculation:
        </Typography>
        <Latex>{`$R_{total} = R_1 + R_2 + R_3 + ... R_n$`}</Latex>
      </div>
      <div className={classes.section}>
        <Typography variant="body1" gutterBottom>
          For resistors in parallel, it's a bit more involved. Due to current
          being split proportionally across resistors in parallel and voltage
          remaining constant, Ohm's Law can help reach the following formula:
        </Typography>
        <Latex>{`$\\frac{1}{R_{total}} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\frac{1}{R_3} + ... \\frac{1}{R_n}$`}</Latex>
      </div>

      <Typography variant="h4" gutterBottom>
        How does it work?
      </Typography>
      <Typography variant="body1" gutterBottom>
        A list of around 70 different resistor values was made based on
        resistors I had for use. Based on the max number of resistors chosen,
        all possible combinations of resistors (including ones with fewer
        resistors than the max) are generated. Series and parallel resistance
        values are then computed for each pair and their respective percent
        errors compared to the desired resistance value are calculated. Finally,
        the combination with the lowest percent error is displayed.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Despite memoization being used for several different operations, this
        strategy is still fairly slow, especially for a max resistor count of 3
        or greater. However, it works for most cases as two resistors is usually
        plenty to find a suitable combination.
      </Typography>
    </>
  );
}
