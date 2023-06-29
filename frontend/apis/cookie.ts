import { Cookies } from 'react-cookie';

const Cookie = new Cookies();

export const setCookie = (
  key: string,
  value: string,
  options?: any,
) => {
  return Cookie.set(key, value, options);
};

export const getCookie = (key: string) => {
  return Cookie.get(key);
};
