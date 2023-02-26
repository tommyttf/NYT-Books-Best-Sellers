import { useQuery } from 'react-query';
import {
  IListsParams,
  IBSHist,
  IList,
  IListName,
  INytBaseParams,
  IBSHistParams,
} from '../interface/nytBook';
import { callNytBooksApi } from '../provider/api';

/**
 * https://developer.nytimes.com/docs/books-product/1/routes/lists/names.json/get
 */
export const useQueryListNames = (params: INytBaseParams) =>
  useQuery(
    '/lists/names',
    () => callNytBooksApi<IListName>('/lists/names', params),
    {
      enabled: params['api-key'] !== '',
      staleTime: Infinity, // should be unchanged
    }
  );

/**
 * https://developer.nytimes.com/docs/books-product/1/routes/lists.json/get
 * @param params
 */
export const useQueryLists = (params: IListsParams & INytBaseParams) =>
  useQuery(['/lists', params], () => callNytBooksApi<IList>('/lists', params), {
    enabled: params['api-key'] !== '' && params.list !== '',
    staleTime: Infinity,
  });

/**
 * https://developer.nytimes.com/docs/books-product/1/routes/lists/best-sellers/history.json/get
 */
export const useQueryBSHist = (params: IBSHistParams & INytBaseParams) =>
  useQuery(
    ['/lists/best-sellers/history', params],
    () => callNytBooksApi<IBSHist>('/lists/best-sellers/history', params),
    {
      enabled: params['api-key'] !== '',
      staleTime: Infinity, // should be unchanged
    }
  );
