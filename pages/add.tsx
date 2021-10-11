import type { NextPage } from 'next';
import { useEmployees } from '@hooks/useEmployee';
import { Controller, useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import cn from 'classnames';
import Loading from '@components/ui/Loading';
import { TimeOffTypesArray } from '@utils/constants';

import { useModifyTimeOff } from '@hooks/useTimeOff';
import { TimeOff } from '@customTypes/timeOff';

const Add: NextPage = () => {
  const { employees, isLoading, isError } = useEmployees();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    // formState,
    watch,
  } = useForm();

  const [callAPI] = useModifyTimeOff();

  const isRange = watch('isRange');
  const startDate = watch('startDate');
  const endDate = watch('endDate');

  const onSubmit = (timeOff: TimeOff) => {
    callAPI(timeOff);
  };

  return (
    <>
      <div className="prose max-w-none my-2">
        <h1 className="text-center">Add time off </h1>
      </div>
      <form className="w-full max-w-2xl mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap mb-2">
          <div className="flex-1">
            <label className="label">
              <span className="label-text">{isRange ? 'Start Date' : 'Time off date'}</span>
            </label>
            <Controller
              control={control}
              name="startDate"
              rules={{ required: true }}
              render={({ field }) => (
                <DatePicker
                  placeholderText="Select starting date"
                  onChange={(date) => field.onChange(date)}
                  selected={field.value}
                  className={cn('input input-bordered w-full', {
                    'input-error': errors.startDate,
                  })}
                  maxDate={endDate}
                />
              )}
            />
            {errors.startDate && (
              <label className="label">
                <span className="label-text-alt text-red-500">Start date is required</span>
              </label>
            )}
          </div>
          <div className="px-3">
            <label className="label">
              <span className="label-text">Is Range?</span>
            </label>
            <input type="checkbox" className="toggle m-3" {...register('isRange')} />
          </div>
          <div className="flex-1">
            <label className="label">
              <span className="label-text">End Date</span>
            </label>
            <Controller
              control={control}
              name="endDate"
              render={({ field }) => (
                <DatePicker
                  placeholderText="Select starting date"
                  onChange={(date) => field.onChange(date)}
                  selected={field.value}
                  className="input input-bordered w-full"
                  minDate={startDate}
                  disabled={!isRange}
                />
              )}
            />
          </div>
        </div>
        <div className="flex flex-wrap mb-2">
          <div className="flex-1">
            <label className="label">
              <span className="label-text">Employee</span>
            </label>
            {isError ? (
              <div className="input input-bordered w-full">Error loading data</div>
            ) : isLoading ? (
              <div className="input input-bordered w-full">
                <Loading />
              </div>
            ) : (
              <select
                className="select select-bordered w-full"
                {...register('employee', { required: true })}
              >
                {employees?.map((employee) => (
                  <option key={employee._id} value={employee._id}>
                    {employee.fullName}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className="w-48 ml-4">
            <label className="label">
              <span className="label-text">Time off type</span>
            </label>
            <select
              className="select select-bordered w-full"
              {...register('type', { required: true })}
            >
              {TimeOffTypesArray.map((tot) => (
                <option key={tot.code} value={tot.code}>
                  {tot.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex">
          <input className="btn ml-auto mr-0 w-32" type="submit" />
        </div>
      </form>
    </>
  );
};

export default Add;
