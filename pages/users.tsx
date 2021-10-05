import type { NextPage } from 'next';
import { useState } from 'react';
import Modal from '@components/Modal';

const Home: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = (): void => setIsModalOpen(!isModalOpen);

  return (
    <>
      <div className="flex">
        <h1 className="text-center">Users </h1>
        <button className="btn btn-primary" onClick={toggleModal}>
          Add new user
        </button>
      </div>
      <Modal onCancel={toggleModal} status={isModalOpen}>
        Hola!
      </Modal>
    </>
  );
};

export default Home;
