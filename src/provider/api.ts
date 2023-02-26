import { INytBaseParams, INytBaseResponse } from '../interface/nytBook';
import axios from 'axios';

const nytBaseApiUrl = 'https://api.nytimes.com/svc/books/v3';

export const callNytBooksApi = <
  T = any,
  R extends INytBaseResponse<T> = INytBaseResponse<T>
>(
  uri: string,
  params: INytBaseParams
) =>
  axios
    .get<R>(`${nytBaseApiUrl}${uri}?${prepareParams(params)}`)
    .then(({ data }) => data);

const prepareParams = (obj: INytBaseParams) =>
  Object.entries(obj)
    .filter(([, val]) => val !== undefined)
    .map(([key, val]) => `${key}=${val}`)
    .join('&');
