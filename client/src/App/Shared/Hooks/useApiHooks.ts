import { useContext, useEffect, useState } from 'react';
import {
  LoadingContext,
  useAppLoading,
} from '../Components/Loading/LoadingContext';
import { createOne, getAll, getEntityById } from '../Services';
import { AlertType, useSetAlert } from './Alert';
import { useToggle } from './useToggle';

export const handleSuccess = (setLoading, refresh, data) => {
  if (refresh) {
    refresh(data);
  }
  setLoading(false);
};

export const handleError = (setLoading, triggerAlert, errMessage) => {
  setLoading(false);
  triggerAlert(errMessage, AlertType.Error);
};

export const useEntity = (endpoint, noLoading?): [boolean, any, () => void] => {
  const [entities, setEntities] = useState();
  const [apiRequestPending, togglePending] = useToggle(true);
  const { setAppLoading } = useAppLoading();

  const getEntities = async () => {
    if (!noLoading) {
      togglePending();
      setAppLoading(true);
    }
    await getAll(endpoint)
      .then((res) => {
        setEntities(res);
        togglePending();
        setAppLoading(false);
      })
      .catch((err) => {
        console.log(err);

        if (!noLoading) {
          setAppLoading(false);
        }
      });
  };

  useEffect(() => {
    getEntities();
    return () => {
      setEntities(undefined);

      setAppLoading(false);
    };
  }, []);

  return [apiRequestPending, entities, getEntities];
};

export const useOneEntity = (endpoint, noLoading?): any => {
  const [entity, setEntity] = useState();
  const [apiRequestPending, togglePending] = useToggle(true);
  const { setAppLoading } = useAppLoading();

  const getEntity = async (id) => {
    if (!noLoading) {
      setAppLoading(true);
    }

    await getEntityById(endpoint, id)
      .then((res) => {
        if (!noLoading) {
          setAppLoading(false);
        }

        setEntity(res);
      })
      .catch((err) => {
        console.log(err);

        if (!noLoading) {
          setAppLoading(false);
        }
        return err;
      });
  };

  return [apiRequestPending, entity, getEntity];
};

export const useAddEntity = () => {
  const { setAppLoading } = useContext(LoadingContext);
  const triggerAlert = useSetAlert();

  const addEntity = async (entityType, data, successMessage, refresh) => {
    setAppLoading(true);
    return await createOne(entityType, data)
      .then(async (res) => {
        handleSuccess(setAppLoading, refresh, res);
        if (successMessage) {
          triggerAlert(successMessage, AlertType.Success);
        }

        return res;
      })
      .catch((err) => {
        setAppLoading(false);
        triggerAlert(err, AlertType.Error);
      });
  };

  return addEntity;
};
