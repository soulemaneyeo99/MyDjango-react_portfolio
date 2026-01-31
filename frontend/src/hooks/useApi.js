// ========== frontend/src/hooks/useApi.js ==========
import { useState, useEffect, useCallback } from 'react';

export const useApi = (apiCall, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall(...args);
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};

export const useLazyApi = (apiCall) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall(...args);
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiCall]);

  return [execute, { data, loading, error }];
};

// Hook pour la pagination
export const usePagination = (apiCall, pageSize = 12) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchData = useCallback(async (pageNumber = 1, reset = false) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await apiCall({ 
        page: pageNumber, 
        page_size: pageSize 
      });
      
      if (reset || pageNumber === 1) {
        setData(result.results);
      } else {
        setData(prevData => [...prevData, ...result.results]);
      }
      
      setHasMore(!!result.next);
      setPage(pageNumber);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [apiCall, pageSize]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchData(page + 1);
    }
  }, [fetchData, page, loading, hasMore]);

  const reset = useCallback(() => {
    setData([]);
    setPage(1);
    setHasMore(true);
    fetchData(1, true);
  }, [fetchData]);

  useEffect(() => {
    fetchData(1, true);
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    hasMore,
    loadMore,
    reset,
    refetch: () => fetchData(1, true),
  };
};
