import type { NextPage } from 'next';
import { useState } from 'react';
import { enUS } from 'date-fns/locale';
import cn from 'classnames';
import { format, getDaysInMonth, isWeekend } from 'date-fns';

import { SUPPORTED_YEARS } from '@utils/constants';
import { useEmployees } from '@hooks/useEmployee';
import Loading from '@components/ui/Loading';

const Home: NextPage = () => {
  const createArraySequentialNumber = (length = 0): number[] => Array.from({ length }, (_, i) => i);

  const months = createArraySequentialNumber(12);

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [monthDays, setMonthDays] = useState(
    createArraySequentialNumber(getDaysInMonth(new Date(selectedYear, selectedMonth))),
  );

  const changeYear = (year: number) => {
    setSelectedYear(year);
    setMonthDays(createArraySequentialNumber(getDaysInMonth(new Date(year, selectedMonth))));
  };
  const changeMonth = (month: number) => {
    setSelectedMonth(month);
    setMonthDays(createArraySequentialNumber(getDaysInMonth(new Date(selectedYear, month))));
  };

  const { employees, isLoading, isError } = useEmployees();

  return (
    <>
      <div className="flex justify-between prose max-w-none">
        <h1 className="text-center">Time off tracker </h1>
        <select
          className="select select-bordered w-32"
          onChange={(y) => changeYear(+y.target.value)}
        >
          {SUPPORTED_YEARS.map((year) => (
            <option key={year} selected={selectedYear === year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div>
        <div className="tabs flex justify-around ">
          {months.map((month) => (
            <a
              className={cn('tab tab-lifted flex-1', {
                'tab-active': month === selectedMonth,
              })}
              key={month}
              onClick={() => changeMonth(month)}
            >
              {enUS.localize?.month(month, { width: 'abbreviated' })}
            </a>
          ))}
        </div>
      </div>
      <div>
        {isError ? (
          <div>Error loading data</div>
        ) : isLoading ? (
          <Loading />
        ) : employees?.length ? (
          <div className="overflow-x-auto">
            <table className="table w-full table-zebra">
              <thead>
                <tr>
                  <th>Employee</th>
                  {monthDays.map((day) => {
                    const date = new Date(selectedYear, selectedMonth, day + 1);

                    return (
                      <th
                        key={day}
                        className={cn('text-center px-1 whitespace-pre-wrap w-8 xl:w-auto', {
                          'bg-red-100': isWeekend(date),
                        })}
                      >
                        {format(date, 'eee do')}
                      </th>
                    );
                  })}
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee._id} className="overflow-x-auto">
                    <td>{employee.fullName}</td>
                    {monthDays.map((day) => {
                      const date = new Date(selectedYear, selectedMonth, day + 1);
                      return (
                        <th
                          key={day}
                          className={cn({
                            'bg-red-100': isWeekend(date),
                          })}
                        >
                          -
                        </th>
                      );
                    })}
                    <td>0</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>There are no employees</div>
        )}
      </div>
    </>
  );
};

export default Home;
