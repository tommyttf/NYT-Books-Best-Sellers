import { useContext } from 'react';
import { NytApiKeyContext } from '../context/nytApiKey';
import { useQueryBSHist, useQueryListNames, useQueryLists } from './api';
import { IBSHistParams, IListsParams } from '../interface/nytBook';

export const useListNames = () => {
  const { apiKey } = useContext(NytApiKeyContext);

  const { data: listNames } = useQueryListNames({
    'api-key': apiKey ?? '',
  });
  return { listNames };
};

export const useLists = (params: IListsParams) => {
  const { apiKey } = useContext(NytApiKeyContext);

  const { data: bsl, isFetching } = useQueryLists({
    'api-key': apiKey ?? '',
    ...params,
  });

  return { bsl, isFetching };
};

export const useBSHist = (params: IBSHistParams) => {
  const { apiKey } = useContext(NytApiKeyContext);

  const { data: bsh, isFetching } = useQueryBSHist({
    'api-key': apiKey ?? '',
    ...params,
  });
  return { bsh, isFetching };
};
