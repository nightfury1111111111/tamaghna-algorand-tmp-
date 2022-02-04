import * as React from 'react';

import { useContext, useEffect, useState } from 'react';
import { AlertType } from './Alert';

export const AlertContext = React.createContext({
  setAlert: (values) => {},
  alert: {
    open: false,
    message: '',
    alertType: '',
  },
});

export const AlertContextWrapper = ({ children }) => {
  const [alert, setAlert] = useState({
    message: '',
    alertType: AlertType.Success,
    open: false,
  });

  // Resets the alert after 8 seconds
  useEffect(() => {
    if (alert.open) {
      setTimeout(() => {
        setAlert({
          message: '',
          alertType: alert.alertType,
          open: false,
        });
      }, 6000);
    }
  }, [alert]);

  const value = {
    alert,
    setAlert,
  };

  return (
    <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
  );
};

export const useAlertContext = () => useContext(AlertContext);
