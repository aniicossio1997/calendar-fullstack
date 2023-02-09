import { useCallback, useEffect, useState } from "react";
import { IEvent } from "../ts/interfaces/IEvents";

export const useFetch = (url: string, fetchInitial = true) => {
  const [data, setData] = useState<IEvent[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(
    (params: string) => {
      setLoading(true);
      fetch(`${url}?${params}`)
        .then((res) => res.json())
        .then((data) => setData(data.events))
        .catch((e) => setError("Ocurrió un error"))
        .finally(() => setLoading(false));
    },
    [setLoading, setData]
  );
  useEffect(() => {
    if (fetchInitial) {
      fetchData("");
    }
  }, []);

  return { data, error, loading, fetchData };
};
