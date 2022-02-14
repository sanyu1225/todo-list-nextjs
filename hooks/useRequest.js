import { useState } from 'react';
import { useQuery } from '@apollo/client';

export default function useRequest(gql, params = {}, options = {}) {
  const [skipQuery, setSkipQuery] = useState(true);
  const [queryParams, setQueryParams] = useState(params);
  const [data, setData] = useState(null);
  const [error, setError] = useState(undefined);
  const { loading } = useQuery(gql, {
    ...queryParams,
    context: { ...options },
    onCompleted(newData) {
      setSkipQuery(true);
      setData(newData);
      return newData;
    },
    onError(err) {
      setSkipQuery(true);
      setError(err);
      setData(null);
    },
    skip: skipQuery,
  });
  const fetchData = (fetchParams) => {
    if (fetchParams) setQueryParams(fetchParams);
    setData(null);
    setError(undefined);
    setSkipQuery(false);
  };
  return [fetchData, { loading, data, error }];
}
