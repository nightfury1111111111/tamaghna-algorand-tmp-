import * as request from 'superagent';

const basePath =
  process.env.NODE_ENV === 'development'
    ? ''
    : 'https://algorand-server.herokuapp.com';

const sendRequest = async (path, method, data?) => {
  return await request[method](`${basePath}/api${path}`)

    .send(data ? data : null)
    .then((res) => {
      return res.body;
    })
    .catch((err) => {
      const message = err.response.body
        ? err.response.body.message
        : err.response && err.response.statusText
        ? err.response.statusText
        : 'Request failed';
      return Promise.reject(
        message && typeof message === 'string' ? message : 'Request failed',
      );
    });
};

export const getAll = async (entity) => {
  return await sendRequest(entity, 'get', null);
};

export const getAllWithCustomPath = async (path: string) => {
  return await sendRequest(path, 'get', null);
};

export const updateCustomPath = async (path: string, data: any) => {
  return await sendRequest(path, 'put', data);
};

export const getEntityById = async (entity: string, id: number) => {
  const path = `${entity}/${id}`;
  return await sendRequest(path, 'get', null);
};

export const createOne = async (entity: string, data) => {
  return await sendRequest(entity, 'post', data);
};
