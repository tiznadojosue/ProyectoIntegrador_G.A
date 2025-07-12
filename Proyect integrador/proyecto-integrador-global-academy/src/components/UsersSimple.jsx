import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UsersSimple = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        
        // Intentar cargar de localStorage primero
        const localUsers = JSON.parse(localStorage.getItem('localUsers') || '[]');
        console.log('Usuarios locales:', localUsers);
        
        // Intentar cargar de la API
        try {
          const response = await fetch('https://jsonplaceholder.typicode.com/users');
          const apiUsers = await response.json();
          console.log('Usuarios de API:', apiUsers);
          
          // Combinar usuarios
          const allUsers = [...apiUsers, ...localUsers];
          setUsers(allUsers);
        } catch (apiError) {
          console.warn('Error de API, solo usuarios locales:', apiError);
          setUsers(localUsers);
          if (localUsers.length === 0) {
            setError('No hay conexión y no hay usuarios locales');
          }
        }
        
      } catch (err) {
        console.error('Error general:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Cargando usuarios...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        <h2>Error:</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Usuarios ({users.length})</h1>
        <Link to="/add-user" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
          Agregar Usuario
        </Link>
      </div>

      {users.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h3>No hay usuarios disponibles</h3>
          <Link to="/add-user">Agregar el primer usuario</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {users.map((user) => (
            <div key={user.id} style={{ 
              border: '1px solid #ddd', 
              borderRadius: '8px', 
              padding: '20px',
              backgroundColor: '#f9f9f9'
            }}>
              <h3 style={{ margin: '0 0 10px 0' }}>{user.name}</h3>
              <p style={{ margin: '5px 0', color: '#666' }}>@{user.username}</p>
              <p style={{ margin: '5px 0' }}>{user.email}</p>
              <p style={{ margin: '5px 0' }}>{user.phone}</p>
              {user.company && <p style={{ margin: '5px 0', fontSize: '14px' }}>{user.company.name}</p>}
              {user.isLocal && <span style={{ color: 'green', fontSize: '12px' }}>Usuario Local</span>}
              
              <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                <Link 
                  to={`/user/${user.id}`}
                  style={{ padding: '5px 10px', backgroundColor: '#28a745', color: 'white', textDecoration: 'none', borderRadius: '3px', fontSize: '14px' }}
                >
                  Ver
                </Link>
                <Link 
                  to={`/edit-user/${user.id}`}
                  style={{ padding: '5px 10px', backgroundColor: '#ffc107', color: 'black', textDecoration: 'none', borderRadius: '3px', fontSize: '14px' }}
                >
                  Editar
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersSimple;
