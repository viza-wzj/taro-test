import Taro from '@tarojs/taro';

interface RequestConfig {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any;
  header?: Record<string, string>;
}

interface ApiResponse<T = any> {
  code: number;
  data: T;
  message: string;
}

const BASE_URL =
  process.env.TARO_ENV === 'h5' ? '/api' : 'https://your-api.com';

const request = <T = any>(config: RequestConfig): Promise<ApiResponse<T>> => {
  const token = Taro.getStorageSync('token');

  return Taro.request({
    url: `${BASE_URL}${config.url}`,
    method: config.method || 'GET',
    data: config.data,
    header: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...config.header,
    },
  }).then((res) => {
    const { statusCode, data } = res;

    if (statusCode === 401) {
      Taro.removeStorageSync('token');
      Taro.showToast({ title: '请重新登录', icon: 'none' });
      return Promise.reject(data);
    }

    if (statusCode >= 200 && statusCode < 300) {
      return data;
    }

    Taro.showToast({ title: data?.message || '请求失败', icon: 'none' });
    return Promise.reject(data);
  });
};

export const get = <T = any>(
  url: string,
  data?: any,
  header?: Record<string, string>,
) => request<T>({ url, method: 'GET', data, header });

export const post = <T = any>(
  url: string,
  data?: any,
  header?: Record<string, string>,
) => request<T>({ url, method: 'POST', data, header });

export const put = <T = any>(
  url: string,
  data?: any,
  header?: Record<string, string>,
) => request<T>({ url, method: 'PUT', data, header });

export const del = <T = any>(
  url: string,
  data?: any,
  header?: Record<string, string>,
) => request<T>({ url, method: 'DELETE', data, header });

export default request;
