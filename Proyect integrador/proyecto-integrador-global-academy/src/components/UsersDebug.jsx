import React from 'react';
import { useUsers } from '../hooks';
import { useAppContext } from '../context/AppContext';

const UsersDebug = () => {
  const { state } = useAppContext();
  const { users, loading, error } = useUsers();

  console.log('UsersDebug - State:', { users, loading, error, state });

  if (loading) {
    return <div>Cargando usuarios...</div>;
  }

  if (error) {
    return (
      <div>
        <h2>Error:</h2>
        <p>{error}</p>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </div>
    );
  }

  return (
    <div>
      <h1>Debug - Usuarios ({users.length})</h1>
      <div>
        <h3>Estado completo:</h3>
        <pre style={{ background: '#f5f5f5', padding: '10px', fontSize: '12px' }}>
          {JSON.stringify({ users, loading, error, state }, null, 2)}
        </pre>
      </div>
      
      {users.length === 0 ? (
        <p>No hay usuarios disponibles</p>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user.id}>
              <strong>{user.name}</strong> - {user.email}
              {user.isLocal && <span style={{ color: 'green' }}> (Local)</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UsersDebug;
