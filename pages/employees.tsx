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
        employees.map((employee) => <div key={employee.fullName}>{employee.fullName}</div>)
      ) : (
        <div>There are no employees</div>
      )}
    </div>
  );

  return (
    <>
      <div>
        <div className="flex justify-between">
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
                {/* <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="label">
                      <span className="label-text">Fullname</span>
                    </label>
                    <input type="text" placeholder="Fullname" className="input input-bordered" />
                    <p className="text-red-500 text-xs italic">Please fill out this field.</p>
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label className="label">
                      <span className="label-text">Fullname</span>
                    </label>
                    <input type="text" placeholder="Fullname" className="input input-bordered" />
                  </div>
                </div> */}
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
                {/* <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1"
                      htmlFor="grid-city"
                    >
                      City
                    </label>
                    <input
                      className="appearance-none block w-full bg-grey-200 text-grey-darker border border-grey-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                      id="grid-city"
                      type="text"
                      placeholder="Albuquerque"
                    />
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1"
                      htmlFor="grid-state"
                    >
                      State
                    </label>
                    <div className="relative">
                      <select
                        className="block appearance-none w-full bg-grey-200 border border-grey-200 text-grey-darker py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-grey"
                        id="grid-state"
                      >
                        <option>New Mexico</option>
                        <option>Missouri</option>
                        <option>Texas</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-grey-darker">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-grey-darker text-xs font-light mb-1"
                      htmlFor="grid-zip"
                    >
                      Zip
                    </label>
                    <input
                      className="appearance-none block w-full bg-grey-200 text-grey-darker border border-grey-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                      id="grid-zip"
                      type="text"
                      placeholder="90210"
                    />
                  </div>
                </div> */}
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EmployeesPage;
