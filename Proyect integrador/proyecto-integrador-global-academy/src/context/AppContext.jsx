import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Como empieza la aplicación cuando se carga por primera vez
const initialState = {
  users: [],           // lista de usuarios (vacia al principio)
  currentUser: null,   // usuario que estamos viendo ahora
  theme: 'light',      // tema claro por defecto
  loading: false,      // si estamos cargando algo
  error: null,         // si hay algún error
  notification: null   // mensajes para mostrar al usuario
};

// Tipos de acciones - las cosas que puede hacer el usuario
export const actionTypes = {
  SET_LOADING: 'SET_LOADING',               // mostrar/ocultar cargando
  SET_ERROR: 'SET_ERROR',                   // mostrar error
  SET_USERS: 'SET_USERS',                   // cargar lista de usuarios
  ADD_USER: 'ADD_USER',                     // agregar nuevo usuario
  UPDATE_USER: 'UPDATE_USER',               // modificar usuario existente
  DELETE_USER: 'DELETE_USER',               // eliminar usuario
  SET_CURRENT_USER: 'SET_CURRENT_USER',     // seleccionar usuario actual
  TOGGLE_THEME: 'TOGGLE_THEME',             // cambiar entre modo claro/oscuro
  SET_NOTIFICATION: 'SET_NOTIFICATION',     // mostrar mensaje
  CLEAR_NOTIFICATION: 'CLEAR_NOTIFICATION' // quitar mensaje
};

// Reducer - función que decide como cambiar el estado según la acción
const appReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return {
        ...state,                    // mantener todo lo que ya teniamos
        loading: action.payload      // cambiar solo el estado de carga
      };

    case actionTypes.SET_ERROR:
      return {
        ...state,                    // mantener todo lo que ya teniamos
        error: action.payload,       // guardar el mensaje de error
        loading: false               // ya no estamos cargando
      };

    case actionTypes.SET_USERS:
      return {
        ...state,                    // mantener todo lo que ya teniamos
        users: action.payload,       // nueva lista de usuarios
        loading: false,              // ya terminamos de cargar
        error: null                  // no hay errores
      };

    case actionTypes.ADD_USER:
      const newUser = {
        ...action.payload,           // copiar toda la info del nuevo usuario
        id: Date.now(),              // darle un ID único (numero de milisegundos actuales)
        isLocal: true                // marcar que es un usuario que nosotros agregamos
      };
      const updatedUsersAdd = [...state.users, newUser]; // agregar a la lista existente
      
      // Guardar en el navegador para que no se pierda al recargar
      localStorage.setItem('localUsers', JSON.stringify(updatedUsersAdd.filter(u => u.isLocal)));
      
      return {
        ...state,
        users: updatedUsersAdd,
        notification: { type: 'success', message: 'Usuario agregado exitosamente' }
      };

    case actionTypes.UPDATE_USER:
      const updatedUsers = state.users.map(user =>
        user.id === action.payload.id ? { ...user, ...action.payload } : user
      );
      
      // Persistir cambios locales
      localStorage.setItem('localUsers', JSON.stringify(updatedUsers.filter(u => u.isLocal)));
      
      return {
        ...state,
        users: updatedUsers,
        notification: { type: 'success', message: 'Usuario actualizado exitosamente' }
      };

    case actionTypes.DELETE_USER:
      const filteredUsers = state.users.filter(user => user.id !== action.payload);
      
      // Persistir cambios locales
      localStorage.setItem('localUsers', JSON.stringify(filteredUsers.filter(u => u.isLocal)));
      
      return {
        ...state,
        users: filteredUsers,
        notification: { type: 'success', message: 'Usuario eliminado exitosamente' }
      };

    case actionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      };

    case actionTypes.TOGGLE_THEME:
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
      
      return {
        ...state,
        theme: newTheme
      };

    case actionTypes.SET_NOTIFICATION:
      return {
        ...state,
        notification: action.payload
      };

    case actionTypes.CLEAR_NOTIFICATION:
      return {
        ...state,
        notification: null
      };

    default:
      return state;
  }
};

// Crear el contexto
const AppContext = createContext();

// Hook personalizado para usar el contexto
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext debe ser usado dentro de AppProvider');
  }
  return context;
};

// Proveedor del contexto
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Cargar tema y datos persistidos al inicializar
  useEffect(() => {
    try {
      // Cargar tema
      const savedTheme = localStorage.getItem('theme') || 'light';
      document.documentElement.setAttribute('data-theme', savedTheme);
      if (savedTheme !== state.theme) {
        dispatch({ type: actionTypes.TOGGLE_THEME });
      }

      // Cargar usuarios locales
      const localUsers = JSON.parse(localStorage.getItem('localUsers') || '[]');
      console.log('AppProvider: Cargando usuarios locales:', localUsers);
      
      if (localUsers.length > 0) {
        dispatch({ type: actionTypes.SET_USERS, payload: localUsers });
      }
    } catch (error) {
      console.error('Error al inicializar AppProvider:', error);
    }
  }, []);

  // Auto-clear notifications después de 5 segundos
  useEffect(() => {
    if (state.notification) {
      const timer = setTimeout(() => {
        dispatch({ type: actionTypes.CLEAR_NOTIFICATION });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [state.notification]);

  // Acciones disponibles
  const actions = {
    setLoading: (loading) => dispatch({ type: actionTypes.SET_LOADING, payload: loading }),
    setError: (error) => dispatch({ type: actionTypes.SET_ERROR, payload: error }),
    setUsers: (users) => dispatch({ type: actionTypes.SET_USERS, payload: users }),
    addUser: (user) => dispatch({ type: actionTypes.ADD_USER, payload: user }),
    updateUser: (user) => dispatch({ type: actionTypes.UPDATE_USER, payload: user }),
    deleteUser: (id) => dispatch({ type: actionTypes.DELETE_USER, payload: id }),
    setCurrentUser: (user) => dispatch({ type: actionTypes.SET_CURRENT_USER, payload: user }),
    toggleTheme: () => dispatch({ type: actionTypes.TOGGLE_THEME }),
    setNotification: (notification) => dispatch({ type: actionTypes.SET_NOTIFICATION, payload: notification }),
    clearNotification: () => dispatch({ type: actionTypes.CLEAR_NOTIFICATION })
  };

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
