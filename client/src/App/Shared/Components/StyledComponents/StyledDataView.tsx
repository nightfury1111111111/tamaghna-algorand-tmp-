import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const styles = makeStyles({
  infoLabel: {
    color: '#A3A9B5',
    fontSize: 13,
    marginTop: 12,
  },
  infoValue: {
    color: '#404040',
    fontSize: 13,
    marginTop: 12,
  },
});

export function StyledDataView({ label, text }) {
  const classes = styles();
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={4}>
        <Typography className={classes.infoLabel}>{label}</Typography>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Typography className={classes.infoValue}>{text}</Typography>
      </Grid>
    </Grid>
  );
}
