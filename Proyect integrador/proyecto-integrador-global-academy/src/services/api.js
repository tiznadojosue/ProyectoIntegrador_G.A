import axios from 'axios';

// Configuración base de Axios para conectarse a la API
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',  // dirección de la API que usamos
  timeout: 10000,                                    // esperar máximo 10 segundos por respuesta
  headers: {
    'Content-Type': 'application/json',              // tipo de datos que enviamos
  },
});

// Interceptador para manejar errores globalmente (cuando algo sale mal)
api.interceptors.response.use(
  (response) => response,    // si todo sale bien, devolver la respuesta
  (error) => {
    console.error('Error de API:', error);
    
    // Si se agotó el tiempo de espera
    if (error.code === 'ECONNABORTED') {
      throw new Error('Tiempo de espera agotado. Verifica tu conexión a internet.');
    }
    
    // Si el servidor respondió con un error
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 404:
          throw new Error('Recurso no encontrado');
        case 500:
          throw new Error('Error interno del servidor');
        default:
          throw new Error(data?.message || 'Error en la petición');
      }
    } else if (error.request) {
      // La petición fue hecha pero no hubo respuesta
      throw new Error('Sin conexión al servidor. Verifica tu conexión a internet.');
    } else {
      // Error en la configuración de la petición
      throw new Error('Error al configurar la petición');
    }
  }
);

// Servicio para manejar usuarios
export const userService = {
  // Obtener todos los usuarios de la API
  getUsers: async () => {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Obtener un usuario específico por su ID
  getUserById: async (id) => {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Crear un nuevo usuario (simulado - la API no guarda realmente)
  createUser: async (userData) => {
    try {
      const response = await api.post('/users', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Actualizar un usuario existente (simulado - la API no guarda realmente)
  updateUser: async (id, userData) => {
    try {
      const response = await api.put(`/users/${id}`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Eliminar un usuario (simulado - la API no elimina realmente)
  deleteUser: async (id) => {
    try {
      await api.delete(`/users/${id}`);
      return true;
    } catch (error) {
      throw error;
    }
  },

  // Obtener las publicaciones de un usuario específico
  getUserPosts: async (userId) => {
    try {
      const response = await api.get(`/users/${userId}/posts`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

// Servicio para manejar publicaciones (adicional)
export const postService = {
  // Obtener todas las publicaciones
  getPosts: async () => {
    try {
      const response = await api.get('/posts');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Obtener una publicación específica por su ID
  getPostById: async (id) => {
    try {
      const response = await api.get(`/posts/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default api;
