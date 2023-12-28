import axios, { Method } from 'axios';
import { RequestEnum } from '../utils/Enums';

export const request = async (
  method: Method,
  url: string,
  headers: {},
  jsonData: any
) => {
  if (method === RequestEnum.GET) {
    try {
      const { data } = await axios({
        method: method,
        url: url,
        headers: { ...headers },
        params: jsonData,
      });

      return data;
    } catch (err) {
      await Promise.reject(err);
    }
  } else {
    try {
      const { data } = await axios({
        method: method,
        url: url,
        headers: { ...headers },
        data: jsonData,
      });

      return data;
    } catch (err) {
      await Promise.reject(err);
    }
  }
};
