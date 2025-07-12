import React from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '../hooks';
import { useAppContext } from '../context/AppContext';
import UserForm from '../components/UserForm';
import Loading from '../components/Loading';

const EditUser = () => {
  const { id } = useParams();
  const { actions } = useAppContext();
  const { user, loading, error } = useUser(id);

  const handleSubmit = async (userData) => {
    try {
      actions.updateUser(userData);
    } catch (error) {
      throw new Error('Error al actualizar el usuario');
    }
  };

  if (loading) {
    return <Loading text="Cargando datos del usuario..." />;
  }

  if (error || !user) {
    return (
      <div className="error-state" data-aos="fade-up">
        <div className="container">
          <div className="error-state__content">
            <h2>Usuario no encontrado</h2>
            <p>{error || 'El usuario que intentas editar no existe.'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-user-page">
      <div className="container">
        <UserForm 
          user={user}
          onSubmit={handleSubmit}
          title="Editar Usuario"
        />
      </div>
    </div>
  );
};

export default EditUser;
