import React from 'react';
import { AppBar, Toolbar, Typography, Switch } from '@material-ui/core';
import { useTheme } from '../providers/ThemeProvider';
import {
  WbSunny as SunIcon,
  Brightness3 as MoonIcon
} from '@material-ui/icons';

export default function NavBar() {
  const { dark, toggleTheme } = useTheme();

  return (
    <div>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h5" style={{ flexGrow: 1 }}>
            Resistor Calculator
          </Typography>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <SunIcon />
            <Switch checked={dark} onChange={toggleTheme} color="default" />
            <MoonIcon />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
