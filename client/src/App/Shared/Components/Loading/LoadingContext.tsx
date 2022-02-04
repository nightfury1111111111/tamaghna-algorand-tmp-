import * as React from 'react';
import { useState, useContext } from 'react';
import Loading from './Loading';

export const LoadingContext = React.createContext({
  appLoading: false,
  setAppLoading: (value) => {},
});

export const LoadingContextWrapper = (props) => {
  const [appLoading, setAppLoading] = useState<boolean>(false);

  return (
    <LoadingContext.Provider value={{ appLoading, setAppLoading }}>
      {appLoading && <Loading loading={appLoading} />}
      {props.children}
    </LoadingContext.Provider>
  );
};

export const useAppLoading = () => useContext(LoadingContext);
