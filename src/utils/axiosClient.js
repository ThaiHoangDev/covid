import axios from 'axios';
import { isEmpty, assign } from 'lodash';

import { BASE_API } from '../constants/app';

const singletonEnforcer = Symbol();

class AxiosClient {
  axiosClient;
  static axiosClientInstance;

  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot initialize Axios client single instance');
    }

    this.axiosClient = axios.create({
      baseURL: BASE_API,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    this.axiosClient.interceptors.request.use(
      (configure) => {
        return configure;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.axiosClient.interceptors.response.use(
      (response) => {
        if (response.data && Array.isArray(response.data)) {
          response.data.dataObject = response.data.reduce(
            (dataObject, item) => {
              dataObject[item.id] = item;
              return dataObject;
            },
            {}
          );
        }
        return response;
      },
      (error) => {
        if (
          error.response?.data?.errors &&
          Array.isArray(error.response?.data?.errors)
        ) {
          error.response.data.errorsObject = error.response.data.errors.reduce(
            (errorObject, item) => {
              errorObject[item.field] = item;
              return errorObject;
            },
            {}
          );
        }

        return Promise.reject(error.response);
      }
    );
  }

  static get instance() {
    if (!this.axiosClientInstance) {
      this.axiosClientInstance = new AxiosClient(singletonEnforcer);
    }

    return this.axiosClientInstance;
  }

  setHeader(userToken = null) {
    this.axiosClient.defaults.headers.common['x-xsrf-token'] = userToken;
    this.axiosClient.defaults.withCredentials = !!userToken;
  }

  get(resource, slug = '', config = {}) {
    const requestURL = isEmpty(slug) ? `${resource}` : `${resource}/${slug}`;
    return this.axiosClient.get(
      requestURL,
      assign(config, this.axiosClient.defaults.headers)
    );
  }

  post(resource, data, config = {}) {
    return this.axiosClient.post(
      `${resource}`,
      data,
      assign(config, this.axiosClient.defaults.headers)
    );
  }

  update(resource, data, config = {}) {
    return this.axiosClient.put(
      `${resource}`,
      data,
      assign(config, this.axiosClient.defaults.headers)
    );
  }

  put(resource, data, config = {}) {
    return this.axiosClient.put(
      `${resource}`,
      data,
      assign(config, this.axiosClient.defaults.headers)
    );
  }

  patch(resource, data, config = {}) {
    return this.axiosClient.patch(
      `${resource}`,
      data,
      assign(config, this.axiosClient.defaults.headers)
    );
  }

  delete(resource, data, config = {}) {
    return this.axiosClient.delete(`${resource}`, {
      params: data,
      ...assign(config, this.axiosClient.defaults.headers),
    });
  }
}

export default AxiosClient.instance;
