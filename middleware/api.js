// middleware/api.js
import API from '../lib/api';

// The CALL_API action
export const CALL_API = 'CALL_API';

// Available API service methods
export const FIND = 'FIND';
export const GET = 'GET';
export const CREATE = 'CREATE';
export const UPDATE = 'UPDATE';
export const PATCH = 'PATCH';
export const DESTROY = 'DESTROY';

// API action types
const ERROR_UNKNOWN_ACTION_TYPE = 'API_MIDDLEWARE::ERROR_UNKNOWN_ACTION_TYPE';
export const API_LOADING = 'API_LOADING';
export const API_READY = 'API_READY';
export const API_ERROR = 'API_ERROR';

const processRequest = (action, service, method, params, id) => {
  switch (method) {
    case FIND :
      return service.find(params);

    case GET :
      return service.get(id, params);

    case CREATE :
      return service.create(params);

    case UPDATE :
      return service.update(id, params);

    case PATCH :
      return service.patch(id, params);

    case DESTROY :
      return service.destroy(id, params);

    default :
      console.error(
        `${method} is not a recognized API method!`,
        action[CALL_API]
      );
  }
}

export default store => next => action => {
  if (!action[CALL_API]) return next(action);

  const defaults = { method: FIND, params: {}, type: ERROR_UNKNOWN_ACTION_TYPE };
  const { service, method, params, id, type, authenticate } = Object.assign({}, defaults, action[CALL_API]);

  const api = new API();
  const apiService = api.service(service);

  next({ type: API_LOADING });

  if (authenticate) {
    return api.authenticate()
      .then(() => {
        processRequest(action, apiService, method, params)
          .then((result) => {
            next({ type: API_READY });

            return next({
              type,
              payload: result.data
            });
          })
          .catch((error) => {
            return next({
              type: API_ERROR,
              payload: error
            });
          });
        })
      .catch((error) => {
        return next({
          type: API_ERROR,
          payload: error
        });
      });
  }

  return processRequest(action, apiService, method, params)
    .then((result) => {
      next({ type: API_READY })

      return next({
        type,
        payload: result.data
      })
    })
    .catch((error) => {
      if (error.code === 401) {
        // try again, with authentication
        return next({ [CALL_API]: { ...action[CALL_API], authenticate: true }})
      }

      // give up
      console.error(error)
      return next({
        type: API_ERROR,
        payload: error
      })
    })
}
