import axios, { AxiosRequestConfig } from 'axios';
import { getLocale } from 'umi-plugin-react/locale';
import debounce from 'lodash/debounce';
import router from 'umi/router';
import { notification, message } from 'antd';
import get from 'lodash/get'

const AJAX_DEFAULT_CONFIG = {
  timeout: 10000,
  withCredentials: false,
  baseURL: `${BASE_URL}`
};

axios.defaults.timeout = AJAX_DEFAULT_CONFIG.timeout;
axios.defaults.baseURL = AJAX_DEFAULT_CONFIG.baseURL;
axios.defaults.withCredentials = AJAX_DEFAULT_CONFIG.withCredentials;

interface IResponseData {
  code?: number;
  data?: any;
  message?: string;
}

// 请求成功
function requestSuccess(config) {
  const token = null;
  if (token) {
    config.headers['authorization'] = `Bearer ${token}`;
  }
  //传入platformID
  const platformId = localStorage.getItem('city-dev-ops::platform-id');
  if (platformId) {
    config.headers['Platform-Id'] = platformId;
  }
  config.headers['Accept-Language'] = getLocale();
  return config;
}

function requestFail(error) {
  return Promise.reject(error);
}

function responseSuccess(response) {
  return response;
}

function responseFail(error) {
  return Promise.reject(error);
}

axios.interceptors.request.use(requestSuccess, requestFail);
axios.interceptors.response.use(responseSuccess, responseFail);

// 添加防抖限制提示频率
const errorHandler = (type, data: IResponseData) => {
  if (type === 'get') {
    message.error(data.message || '数据获取失败！');
  } else {
    if (data.message) {
      notification.error({
        message: '操作失败',
        description: data.message
      });
    }
  }
};

const errorHandlerDebounced = debounce(errorHandler, 2000, {
  leading: true,
  trailing: false
});

export const request = (config: AxiosRequestConfig) => {
  return axios(config)
    .then((response) => {
      let data, code;
      if (response.data.code && response.data.data) {
        data = response.data.data;
        code = response.data.code;
      } else {
        data = response.data;
        code = response.status;
      }
      return {
        data,
        code
      }
    })
    .catch(error => {
      const errorMessage = get(error, 'response.data.message', '请检查网络');
      message.error(errorMessage)
    })
};

export default request;

export const Get = (
  url: string,
  params?: object,
  config?: AxiosRequestConfig
) => {
  return request(
    Object.assign({}, config, {
      url: url,
      params: params,
      method: 'get'
    })
  );
};

export const Post = (
  url: string,
  data?: object,
  config?: AxiosRequestConfig
) => {
  return request(
    Object.assign({}, config, {
      url: url,
      data: data,
      method: 'post'
    })
  );
};

export const Put = (
  url: string,
  data?: object,
  config?: AxiosRequestConfig
) => {
  return request(
    Object.assign({}, config, {
      url: url,
      data: data,
      method: 'put'
    })
  );
};

export const Delete = (
  url: string,
  data?: object,
  config?: AxiosRequestConfig
) => {
  return request(
    Object.assign({}, config, {
      url: url,
      data: data,
      method: 'delete'
    })
  );
};
