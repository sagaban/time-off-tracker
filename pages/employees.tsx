import type { NextPage } from 'next';
import { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import cn from 'classnames';
import { useEmployees, useModifyEmployee } from '@hooks/useEmployee';
import Loading from '@components/ui/Loading';
import { Employee } from '@customTypes/employee';

import Modal from '@components/Modal';

const EmployeesPage: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    // formState,
    reset,
  } = useForm();

  const { employees, isLoading, isError } = useEmployees();
  const [callAPI] = useModifyEmployee();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (employee: Employee) => {
    toggleModal();
    callAPI(employee);
  };

  const formRef = useRef<HTMLFormElement>(null);
  const triggerSubmit = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(new Event('submit', { cancelable: true }));
      // console.log(`formState: ${formState}`);
      handleSubmit(onSubmit)();
    }
  };

  const toggleModal = (): void => {
    reset();
    setIsModalOpen(!isModalOpen);
  };

  const employeeData = (
    <div>
      {employees?.length ? (
        <div className="overflow-x-auto">
          <table className="table w-full table-zebra">
            <thead>
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>e-mail</th>
                <th>starting date</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee._id} className="overflow-x-auto">
                  <th>{employee._id}</th>
                  <td>{employee.fullName}</td>
                  <td>{employee.email} </td>
                  <td>{employee.startingDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>There are no employees</div>
      )}
    </div>
  );

  return (
    <>
      <div>
        <div className="flex justify-between prose max-w-none">
          <h1>Employees </h1>
          <button className="btn btn-primary" onClick={toggleModal}>
            Add new employee
          </button>
        </div>
        <div>
          {isError ? <div>Error loading data</div> : isLoading ? <Loading /> : employeeData}
        </div>
      </div>
      <Modal onCancel={toggleModal} status={isModalOpen} onAccept={triggerSubmit}>
        <div className="flex flex-1  flex-col md:flex-row lg:flex-row mx-2">
          <div className="mb-2 border-solid border-gray-300 rounded border shadow-sm w-full">
            <div className="bg-gray-200 px-2 py-3 border-solid border-gray-200 border-b">
              New employee
            </div>
            <div className="p-3">
              <form className="w-full" onSubmit={handleSubmit(onSubmit)} ref={formRef}>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label className="label">
                      <span className="label-text">Full name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Fullname"
                      className={cn('input input-bordered w-full', {
                        'input-error': errors.fullName,
                      })}
                      {...register('fullName', { required: true })}
                    />
                    {errors.fullName && (
                      <label className="label">
                        <span className="label-text-alt">Fullname is required</span>
                      </label>
                    )}
                    <label className="label">
                      <span className="label-text">e-mail</span>
                    </label>
                    <input
                      type="email"
                      placeholder="email"
                      className="input input-bordered w-full"
                      {...register('email')}
                    />
                    <label className="label">
                      <span className="label-text">Start working date</span>
                    </label>
                    <Controller
                      control={control}
                      name="startingDate"
                      render={({ field }) => (
                        <DatePicker
                          placeholderText="Select starting date"
                          onChange={(date) => field.onChange(date)}
                          selected={field.value}
                          className="input input-bordered w-full"
                          maxDate={new Date()}
                        />
                      )}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EmployeesPage;
