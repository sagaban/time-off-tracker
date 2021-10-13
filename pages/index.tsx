import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { enUS } from 'date-fns/locale';
import cn from 'classnames';
import { format, getDaysInMonth, isWeekend, isSameMonth, isSameYear } from 'date-fns';
import { TimeOff } from '@customTypes/timeOff';
import { SUPPORTED_YEARS, TimeOffTypes, TimeOffTypesArray } from '@utils/constants';

import { useEmployees } from '@hooks/useEmployee';
import { useTimesOff } from '@hooks/useTimeOff';
import Loading from '@components/ui/Loading';

interface TimesOffObject {
  [Y: string]: { [M: string]: { [D: string]: TimeOff[] } };
}

const Home: NextPage = () => {
  const createArraySequentialNumber = (length = 0): number[] => Array.from({ length }, (_, i) => i);

  const months = createArraySequentialNumber(12);

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [monthDays, setMonthDays] = useState(
    createArraySequentialNumber(getDaysInMonth(new Date(selectedYear, selectedMonth))),
  );
  const [timesOffObject, setTimesOffObject] = useState<TimesOffObject>({});

  const changeYear = (year: number) => {
    setSelectedYear(year);
    setMonthDays(createArraySequentialNumber(getDaysInMonth(new Date(year, selectedMonth))));
  };
  const changeMonth = (month: number) => {
    setSelectedMonth(month);
    setMonthDays(createArraySequentialNumber(getDaysInMonth(new Date(selectedYear, month))));
  };

  const { employees, isLoading, isError } = useEmployees();
  const { timesOff } = useTimesOff();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const _timesOffObject =
      timesOff?.reduce((acc: TimesOffObject, timeOff) => {
        const newAcc = { ...acc };
        const [day, month, year] = format(new Date(timeOff.date), 'd-M-yyyy').split('-');
        if (newAcc[year]) {
          if (newAcc[year][month]) {
            if (newAcc[year][month][day]) {
              newAcc[year][month][day].push(timeOff);
            } else {
              newAcc[year][month][day] = [timeOff];
            }
          } else {
            newAcc[year][month] = { [day]: [timeOff] };
          }
        } else {
          newAcc[year] = { [month]: { [day]: [timeOff] } };
        }
        return newAcc;
      }, {}) || {};
    setTimesOffObject(_timesOffObject);
  }, [timesOff]);

  return (
    <>
      <div className="flex justify-between prose max-w-none">
        <h1 className="text-center">Time off tracker </h1>
        <select
          className="select select-bordered w-32"
          onChange={(y) => changeYear(+y.target.value)}
          defaultValue={selectedYear}
        >
          {SUPPORTED_YEARS.map((year) => (
            <option key={year}>{year}</option>
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
                          className={cn('px-1', {
                            'bg-red-100': isWeekend(date),
                          })}
                        >
                          {timesOffObject?.[selectedYear]?.[selectedMonth + 1]?.[day + 1]?.map(
                            (timeOff) =>
                              employee._id === timeOff.employee ? (
                                <div
                                  data-tip={TimeOffTypes[timeOff.type].label}
                                  className="tooltip tooltip-info"
                                  key={timeOff._id}
                                >
                                  <div
                                    className={`badge bg-${
                                      TimeOffTypes[timeOff.type].color
                                    } border-${TimeOffTypes[timeOff.type].color}`}
                                  ></div>
                                </div>
                              ) : (
                                ''
                              ),
                          )}
                        </th>
                      );
                    })}
                    <td>
                      {timesOff?.filter &&
                        timesOff.filter(
                          (timeOff) =>
                            timeOff.employee === employee._id &&
                            isSameYear(
                              new Date(timeOff.date),
                              new Date(selectedYear, selectedMonth, 1),
                            ) &&
                            isSameMonth(
                              new Date(timeOff.date),
                              new Date(selectedYear, selectedMonth, 1),
                            ),
                        ).length}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>There are no employees</div>
        )}
      </div>
      <div className="flex justify-between prose max-w-none mt-8">
        <h2 className="text-center">Total time off in this year</h2>
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
                  {TimeOffTypesArray.map((timeOffType) => (
                    <th key={timeOffType.code}>{timeOffType.label}</th>
                  ))}
                  <th>TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee._id} className="overflow-x-auto">
                    <td>{employee.fullName}</td>
                    {TimeOffTypesArray.map((timeOffType) => (
                      <th key={timeOffType.code}>
                        {timesOff?.filter &&
                          timesOff.filter(
                            (timeOff) =>
                              timeOff.employee === employee._id &&
                              isSameYear(
                                new Date(timeOff.date),
                                new Date(selectedYear, selectedMonth, 1),
                              ) &&
                              timeOff.type === timeOffType.code,
                          ).length}
                      </th>
                    ))}
                    <th>
                      {timesOff?.filter &&
                        timesOff.filter(
                          (timeOff) =>
                            timeOff.employee === employee._id &&
                            isSameYear(
                              new Date(timeOff.date),
                              new Date(selectedYear, selectedMonth, 1),
                            ),
                        ).length}
                    </th>
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
