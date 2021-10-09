import useSWR, { useSWRConfig } from 'swr';
import { useState, useCallback } from 'react';
import { Employee } from '@customTypes/employee';

const url = '/api/employee';

interface UseEmployee {
  employee: Employee | undefined;
  isLoading: boolean;
  isError: boolean;
}
interface UseEmployees {
  employees: Employee[] | undefined;
  isLoading: boolean;
  isError: boolean;
}

//const fetcher = (...args) => fetch(...args).then(res => res.json())

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
const fetcher = async (input: RequestInfo, init: RequestInit, ...args: any[]) => {
  const res = await fetch(input, init);
  return res.json();
};

export function useEmployee(id: string): UseEmployee {
  const { data, error } = useSWR<Employee>(`${url}/${id}`, fetcher);

  return {
    employee: data,
    isLoading: !error && !data,
    isError: error,
  };
}
export function useEmployees(): UseEmployees {
  const { data, error } = useSWR<Employee[]>(url, fetcher);

  return {
    employees: data,
    isLoading: !error && !data,
    isError: error,
  };
}

interface ApiCallResponse {
  data: unknown | null;
  error: unknown | null;
  isLoading: boolean;
}

type ApiCallFn = (employee: Employee) => Promise<void>;

type UseModifyEmployeeHook = [ApiCallFn, ApiCallResponse];

export function useModifyEmployee(): UseModifyEmployeeHook {
  const [response, setResponse] = useState<ApiCallResponse>({
    data: null,
    error: null,
    isLoading: false,
  });
  const { mutate } = useSWRConfig();

  const callAPI = useCallback(
    async (employee: Employee) => {
      setResponse((prevState) => ({ ...prevState, isLoading: true }));
      try {
        const call = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(employee),
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
