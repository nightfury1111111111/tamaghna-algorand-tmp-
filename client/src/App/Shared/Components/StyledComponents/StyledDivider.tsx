import React from 'react';
import { Divider } from '@material-ui/core';

export const StyledDivider = (props) => {
  return (
    <Divider {...props} style={{ marginTop: '8px', marginBottom: '40px' }}>
      {props.children}
    </Divider>
  );
};
