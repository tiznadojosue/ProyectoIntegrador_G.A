import { useState, useEffect } from 'react';
import { userService } from '../services/api';
import { useAppContext } from '../context/AppContext';

// Hook personalizado para obtener usuarios de la API
export const useUsers = () => {
  const { state, actions } = useAppContext();
  const [initialLoad, setInitialLoad] = useState(false);

  const fetchUsers = async () => {
    if (initialLoad) return; // Evitar cargas múltiples innecesarias

    try {
      actions.setLoading(true);       // mostrar indicador de carga
      actions.setError(null);         // limpiar errores previos
      
      // Cargar usuarios guardados localmente primero
      const localUsers = JSON.parse(localStorage.getItem('localUsers') || '[]');
      
      try {
        // Intentar conectarse a la API para traer usuarios
        const apiUsers = await userService.getUsers();
        // Combinar usuarios de API con usuarios locales
        const allUsers = [...apiUsers, ...localUsers];
        actions.setUsers(allUsers);
      } catch (apiError) {
        console.warn('No se pudo conectar a la API, cargando solo usuarios locales:', apiError);
        // Si falla la API, cargar solo usuarios locales
        actions.setUsers(localUsers);
        if (localUsers.length === 0) {
          actions.setError('No hay conexión a internet y no hay usuarios locales guardados');
        }
      }
      
      setInitialLoad(true);            // marcar que ya cargamos la primera vez
    } catch (error) {
      actions.setError(error.message || 'Error al cargar usuarios');
      console.error('Error en fetchUsers:', error);
    } finally {
      actions.setLoading(false);       // ocultar indicador de carga
    }
  };

  // Ejecutar la carga de usuarios cuando se monta el componente
  useEffect(() => {
    fetchUsers();
  }, []);

  // Devolver los datos y funciones que el componente necesita
  return {
    users: state.users,     // lista de usuarios
    loading: state.loading, // si está cargando
    error: state.error,     // mensaje de error si existe
    refetch: fetchUsers     // función para volver a cargar
  };
};

// Hook personalizado para obtener un usuario específico
export const useUser = (id) => {
  const { state } = useAppContext();
  const [user, setUser] = useState(null);          // usuario encontrado
  const [loading, setLoading] = useState(true);    // si está buscando
  const [error, setError] = useState(null);        // error si no encuentra

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);

        // Buscar primero en el estado local (más rápido)
        const localUser = state.users.find(u => u.id === parseInt(id));
        
        if (localUser) {
          setUser(localUser);
          setLoading(false);
          return;
        }

        // Si no está en local, buscar en la API
        const apiUser = await userService.getUserById(id);
        setUser(apiUser);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id, state.users]);

  return { user, loading, error };
};

// Hook personalizado para validación de formularios
export const useFormValidation = (initialValues, validationRules) => {
  const [values, setValues] = useState(initialValues);        // valores del formulario
  const [errors, setErrors] = useState({});                   // errores de validación
  const [touched, setTouched] = useState({});                 // campos que el usuario ya tocó

  // Validar un campo específico
  const validateField = (name, value) => {
    const rules = validationRules[name];
    if (!rules) return '';

    // Ejecutar todas las reglas de validación para este campo
    for (const rule of rules) {
      const error = rule(value);
      if (error) return error;  // si hay error, devolverlo inmediatamente
    }
    return '';  // no hay errores
  };

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));

    // Validar en tiempo real si el campo ya fue tocado
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  // Manejar cuando el usuario sale de un campo (blur)
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  // Validar todos los campos antes de enviar el formulario
  const validateAll = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach(name => {
      const error = validateField(name, values[name]);
      newErrors[name] = error;
      if (error) isValid = false;
    });

    setErrors(newErrors);
    setTouched(Object.keys(validationRules).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {}));

    return isValid;
  };

  // Resetear el formulario a valores iniciales
  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    values,        // valores actuales del formulario
    errors,        // errores de validación
    touched,       // campos que el usuario tocó
    handleChange,  // función para manejar cambios
    handleBlur,    // función para manejar blur
    validateAll,   // función para validar todo
    reset,         // función para resetear
    setValues      // función para cambiar valores programáticamente
  };
};

// Hook personalizado para manejar notificaciones
export const useNotification = () => {
  const { state, actions } = useAppContext();

  // Mostrar una notificación con tipo y mensaje específicos
  const showNotification = (type, message) => {
    actions.setNotification({ type, message });
  };

  // Funciones de conveniencia para diferentes tipos de notificaciones
  const showSuccess = (message) => showNotification('success', message);
  const showError = (message) => showNotification('error', message);
  const showInfo = (message) => showNotification('info', message);
  const showWarning = (message) => showNotification('warning', message);

  return {
    notification: state.notification,    // notificación actual
    showSuccess,                        // mostrar mensaje de éxito
    showError,                          // mostrar mensaje de error
    showInfo,                           // mostrar mensaje informativo
    showWarning,                        // mostrar mensaje de advertencia
    clearNotification: actions.clearNotification  // limpiar notificación
  };
};

// Hook personalizado para desplazamiento infinito (opcional)
export const useInfiniteScroll = (callback, hasMore = true) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Función que se ejecuta cuando el usuario hace desplazamiento
    const handleScroll = () => {
      // Verificar si llegó al final de la página
      if (
        window.innerHeight + document.documentElement.scrollTop
        !== document.documentElement.offsetHeight || loading || !hasMore
      ) {
        return;  // no hacer nada si no llegó al final o ya está cargando
      }
      
      setLoading(true);
      callback().finally(() => setLoading(false));  // ejecutar función y limpiar loading
    };

    // Agregar listener de desplazamiento
    window.addEventListener('scroll', handleScroll);
    
    // Limpiar listener cuando el componente se desmonte
    return () => window.removeEventListener('scroll', handleScroll);
  }, [callback, loading, hasMore]);

  return loading;  // devolver si está cargando más contenido
};
