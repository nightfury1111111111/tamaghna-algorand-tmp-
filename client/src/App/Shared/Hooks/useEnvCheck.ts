import { useState, useEffect } from 'react';

export const useEnvCheck = () => {
  const [env, setEnvironment] = useState('development');

  const checkEnv = () => {
    setEnvironment(process.env.NODE_ENV);
  };

  useEffect(() => {
    checkEnv();
  }, []);

  return { env, checkEnv };
};
