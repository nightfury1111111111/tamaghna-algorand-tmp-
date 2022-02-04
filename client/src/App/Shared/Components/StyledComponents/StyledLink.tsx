import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { DarkBlue, Yellow } from '../../Styles/colors';
import { Link } from '@material-ui/core';

const UnderlinedTypography = withStyles({
  root: {
    textDecoration: 'underline',
  },
})(Typography);

export const StyledLink = (props) => {
  return (
    <UnderlinedTypography>
      <Link style={{ color: 'inherit' }} {...props}>
        {props.children}
      </Link>
    </UnderlinedTypography>
  );
};
