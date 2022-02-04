import React from 'react';
import { Box } from '@material-ui/core';

export const CenteredDiv = (props) => {
  return (
    <Box display='flex' justifyContent='center' m={1} p={1}>
      {props.children}
    </Box>
  );
};

export const CenteredBlockDiv = (props) => {
  return (
    <Box display='block' justifyContent='center' textAlign='center' m={1} p={1}>
      {props.children}
    </Box>
  );
};
