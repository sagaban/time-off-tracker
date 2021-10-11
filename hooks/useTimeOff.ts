import useSWR, { useSWRConfig } from 'swr';
import { useState, useCallback } from 'react';
import { TimeOff } from '@customTypes/timeOff';
import { fetcher } from '@utils/helpers';

const url = '/api/timeoff';

// interface UseTimeOff {
//   timeOff: TimeOff | undefined;
//   isLoading: boolean;
//   isError: boolean;
// }

interface UseTimesOff {
  timesOff: TimeOff[] | undefined;
  isLoading: boolean;
  isError: boolean;
}

// export function useEmployee(id: string): UseEmployee {
//   const { data, error } = useSWR<Employee>(`${url}/${id}`, fetcher);

//   return {
//     employee: data,
//     isLoading: !error && !data,
//     isError: error,
//   };
// }

export function useTimesOff(): UseTimesOff {
  const { data, error } = useSWR<TimeOff[]>(url, fetcher);

  return {
    timesOff: data,
    isLoading: !error && !data,
    isError: error,
  };
}

interface ApiCallResponse {
  data: unknown | null;
  error: unknown | null;
  isLoading: boolean;
}

type ApiCallFn = (timeOff: TimeOff) => Promise<void>;

type UseModifyTimeOffHook = [ApiCallFn, ApiCallResponse];

export function useModifyTimeOff(): UseModifyTimeOffHook {
  const [response, setResponse] = useState<ApiCallResponse>({
    data: null,
    error: null,
    isLoading: false,
  });
  const { mutate } = useSWRConfig();

  const callAPI = useCallback(
    // TODO: unify this call with employee onw
    async (timeOff: TimeOff) => {
      setResponse((prevState) => ({ ...prevState, isLoading: true }));
      try {
        const call = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(timeOff),
        });
        const data = await call.json();
        mutate(url, data);
        setResponse({ data, isLoading: false, error: null });
      } catch (error) {
        setResponse({ data: null, isLoading: false, error });
      }
    },
    [mutate],
  );

  return [callAPI, response];
}
