import { ThemeProvider } from '@material-ui/core';
import React from 'react';
import Pages from './Pages';
import {
  AlertContextWrapper,
  useAlertContext,
} from './Shared/Hooks/AlertContext';
import { DwCustomAlert } from './Shared/Hooks/Alert';
import { LoadingContextWrapper } from './Shared/Components/Loading/LoadingContext';
import { fdTheme } from './Shared/Styles/muiStyles';

const _App = () => {
  const { alert } = useAlertContext();
  return (
    <div>
      <Pages />
      {alert && alert.open && (
        <DwCustomAlert
          alertOpen={alert.open}
          alertType={alert.alertType}
          message={alert.message}
        />
      )}
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider theme={fdTheme}>
      <AlertContextWrapper>
        <LoadingContextWrapper>
          <_App />
        </LoadingContextWrapper>
      </AlertContextWrapper>
    </ThemeProvider>
  );
};

export default App;
