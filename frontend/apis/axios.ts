import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { getCookie } from './cookie';

export const BASE_URL = process.env.REACT_APP_API_URL;

//인증이 필요하지 않은 요청에 대한 인스턴스
const baseInstance = (url: string): AxiosInstance => {
  const instance: AxiosInstance = axios.create({
    baseURL: BASE_URL + url,
  });

  return instance;
};

//인증이 필요한 요청에 대한 인스턴스
const authInstance = (url: string): AxiosInstance => {
  const instance: AxiosInstance = axios.create({
    baseURL: BASE_URL + url,
  });

  //request interceptor
  instance.interceptors.request.use(
    (config) => {
      const token: string | null =
        localStorage.getItem('accessToken');
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (error) => {
      console.log(error);
    },
  );

  //response interceptor
  instance.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config; //기존 요청 저장

      //토큰이 만료되었을 때(Unauthorized)
      if (error.response.status === 401) {
        const id = localStorage.getItem('userId');

        const refreshToken: string = getCookie('refreshToken');
        console.log(`refreshToken: ${refreshToken}`);
        if (id !== null) {
          //리프레시 토큰으로 새로운 토큰 재발급 요청
          const response: AxiosResponse = await axios({
            method: 'POST',
            url: 'https://o-nu.com/api/auth/reissue',
            data: {
              refreshToken: refreshToken,
              userId: id,
            },
          });

          //await 키워드가 붙은 코드가 완료될 때까지 다음 코드가 실행되지 않음
          localStorage.setItem(
            'accessToken',
            response.data.accessToken,
          );
          return axios(originalRequest);
        }
      }
      //나머지 오류
      return Promise.reject(error);
    },
  );

  return instance;
};

export const baseAPI = async (
  url: string,
  options: AxiosRequestConfig,
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await baseInstance(url).request(options);
  return res;
};

export const authAPI = async (
  url: string,
  options: AxiosRequestConfig,
): Promise<AxiosResponse> => {
  const res: AxiosResponse = await authInstance(url).request(options);
  return res;
};
