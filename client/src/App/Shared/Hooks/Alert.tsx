import * as React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useAlertContext, AlertContext } from './AlertContext';

const useEffect = React.useEffect;

export enum AlertType {
  Success = 'success',
  Warning = 'warning',
  Info = 'info',
  Error = 'error',
}

export type DwCustomAlertProps = {
  alertOpen: boolean;
  alertType: AlertType | string;
  message: string;
};

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export function DwCustomAlert({
  alertOpen,
  alertType,
  message,
}: DwCustomAlertProps) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(alertOpen);
  }, [alertOpen]);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const getAlert = (alertType, message) => {
    const typeCheckMsg =
      message && typeof message === 'string' ? message : 'Unknown error';
    return <Alert severity={alertType}>{typeCheckMsg}</Alert>;
  };

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        {getAlert(alertType, message)}
      </Snackbar>
    </div>
  );
}

// Custom hook that trigger the alert
export function useSetAlert() {
  const { setAlert } = useAlertContext();

  const triggerAlert = (message: string, type: AlertType) => {
    setAlert({
      open: true,
      alertType: type,
      message,
    });
  };

  return triggerAlert;
}
