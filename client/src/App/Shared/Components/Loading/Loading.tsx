import { Backdrop, CircularProgress } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import * as React from 'react';
import { LoadingContext } from './LoadingContext';

const useEffect = React.useEffect;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 3,
      color: '#fff',
    },
  }),
);

export default function Loading({ loading }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(loading);

  useEffect(() => {
    setOpen(loading);
  }, [loading]);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      {loading ? (
        <div>
          <Backdrop
            className={classes.backdrop}
            open={open}
            onClick={handleClose}
          >
            <div style={{ marginTop: -500 }}>
              <CircularProgress />
            </div>
          </Backdrop>
        </div>
      ) : null}
    </div>
  );
}

// Custom hook that triggers loading
export function useSetLoading(loading) {
  const { appLoading, setAppLoading } = React.useContext(LoadingContext);

  return setAppLoading(loading);
}
