import axiosInstance from "@/api/axios";
import { useState } from "react";
import { useSelector } from "react-redux";

export function useApiMutation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state?.auth?.token || "");

  const trigger = async ({
    url,
    method = "get",
    data = null,
    params = null,
    headers = {},
  }) => {
    setLoading(true);
    setError(null);
    try {
      const requestHeaders = {
        ...headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(data instanceof FormData ? { "Content-Type": undefined } : {}),
      };

      const response = await axiosInstance({
        url,
        method,
        data,
        params,
        headers: requestHeaders,
      });

      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { trigger, loading, error };
}
