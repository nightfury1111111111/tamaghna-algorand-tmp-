import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const styles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    paddingLeft: 20,
    background: 'White',
    borderBottom: '1px solid #E4E7EB',
    boxShadow: '0 1px 2px #E4E7EB',
  },
  toolbar: {
    minHeight: 74,
    paddingLeft: 20,
    paddingRight: 20,
  },

  title: {
    flexGrow: 1,
  },
}));

const LandingPageHeader = (props) => {
  const classes = styles();

  return (
    <div className={classes.root}>
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant='h6' className={classes.title}>
            Simple Algorand boilerplate
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default LandingPageHeader;
