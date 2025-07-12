import React from 'react';
import { useAppContext } from '../context/AppContext';
import UserForm from '../components/UserForm';

const AddUser = () => {
  const { actions } = useAppContext();

  const handleSubmit = async (userData) => {
    try {
      actions.addUser(userData);
    } catch (error) {
      throw new Error('Error al crear el usuario');
    }
  };

  return (
    <div className="add-user-page">
      <div className="container">
        <UserForm 
          onSubmit={handleSubmit}
          title="Agregar Nuevo Usuario"
        />
      </div>
    </div>
  );
};

export default AddUser;
