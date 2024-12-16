import { useState, useEffect, useCallback } from "react";

// This is a hook to fetch the data and it accepts the function specific to the api.

/**
 * Custom hook for fetching data from an API.
 * @param {Function} apiFunction - The function to fetch data from the API.
 * @param {Array} dependencies - Dependencies to trigger the effect.
 * @returns {object} - An object with data, loading state, error state, and a refetch function.
 */
export const useFetchData = (
  apiFunction: Function,
  params: Object,
  dependencies: any[]
) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFunction(params);
      setData(result);
    } catch (err: any) {
      setError(err.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};
