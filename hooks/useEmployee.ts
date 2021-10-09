import useSWR from 'swr';
import { Employee } from '@customTypes/employee';

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
  const { data, error } = useSWR<Employee>(`/api/employee/${id ? id : ''}`, fetcher);

  return {
    employee: data,
    isLoading: !error && !data,
    isError: error,
  };
}
export function useEmployees(): UseEmployees {
  const { data, error } = useSWR<Employee[]>('/api/employee/', fetcher);

  return {
    employees: data,
    isLoading: !error && !data,
    isError: error,
  };
}
