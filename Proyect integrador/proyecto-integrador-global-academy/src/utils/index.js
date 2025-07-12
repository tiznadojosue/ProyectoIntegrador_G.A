// Validadores para formularios
export const validators = {
  required: (value) => {
    if (!value || value.toString().trim() === '') {
      return 'Este campo es obligatorio';
    }
    return '';
  },

  email: (value) => {
    if (!value) return '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Ingresa un email válido';
    }
    return '';
  },

  minLength: (min) => (value) => {
    if (!value) return '';
    if (value.toString().length < min) {
      return `Mínimo ${min} caracteres`;
    }
    return '';
  },

  maxLength: (max) => (value) => {
    if (!value) return '';
    if (value.toString().length > max) {
      return `Máximo ${max} caracteres`;
    }
    return '';
  },

  phone: (value) => {
    if (!value) return '';
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(value)) {
      return 'Formato de teléfono inválido';
    }
    return '';
  },

  website: (value) => {
    if (!value) return '';
    try {
      new URL(value.startsWith('http') ? value : `https://${value}`);
      return '';
    } catch {
      return 'URL inválida';
    }
  },

  alphanumeric: (value) => {
    if (!value) return '';
    const alphanumericRegex = /^[a-zA-Z0-9\s]+$/;
    if (!alphanumericRegex.test(value)) {
      return 'Solo se permiten letras, números y espacios';
    }
    return '';
  }
};

// Utilidades de formato
export const formatters = {
  capitalizeFirst: (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  },

  capitalizeWords: (str) => {
    if (!str) return '';
    return str.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  },

  formatPhone: (phone) => {
    if (!phone) return '';
    // Remover caracteres no numéricos
    const cleaned = phone.replace(/\D/g, '');
    // Formatear como (XXX) XXX-XXXX si es posible
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
  },

  truncateText: (text, maxLength = 100) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  },

  formatDate: (date) => {
    if (!date) return '';
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  },

  formatUrl: (url) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `https://${url}`;
  }
};

// Utilidades de búsqueda y filtrado
export const searchUtils = {
  searchUsers: (users, searchTerm) => {
    if (!searchTerm) return users;
    
    const term = searchTerm.toLowerCase();
    return users.filter(user => 
      user.name?.toLowerCase().includes(term) ||
      user.email?.toLowerCase().includes(term) ||
      user.username?.toLowerCase().includes(term) ||
      user.phone?.toLowerCase().includes(term) ||
      user.company?.name?.toLowerCase().includes(term)
    );
  },

  sortUsers: (users, sortBy = 'name', order = 'asc') => {
    return [...users].sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      // Manejar valores anidados como company.name
      if (sortBy.includes('.')) {
        const keys = sortBy.split('.');
        aValue = keys.reduce((obj, key) => obj?.[key], a);
        bValue = keys.reduce((obj, key) => obj?.[key], b);
      }

      if (!aValue) aValue = '';
      if (!bValue) bValue = '';

      // Comparación
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (order === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  }
};

// Utilidades de localStorage
export const storageUtils = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error al guardar en localStorage:', error);
    }
  },

  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error al leer de localStorage:', error);
      return defaultValue;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error al remover de localStorage:', error);
    }
  },

  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error al limpiar localStorage:', error);
    }
  }
};

// Utilidades de debounce
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

// Utilidades de generación de IDs
export const generateId = () => {
  return Date.now() + Math.random().toString(36).substr(2, 9);
};

// Utilidades de validación de archivos
export const fileUtils = {
  isValidImageType: (file) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    return validTypes.includes(file.type);
  },

  isValidFileSize: (file, maxSizeMB = 5) => {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    return file.size <= maxSizeBytes;
  },

  formatFileSize: (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
};

// Utilidades de animación
export const animationUtils = {
  easeInOut: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  
  smoothScrollTo: (element, to, duration = 300) => {
    const start = element.scrollTop;
    const change = to - start;
    const startTime = performance.now();

    const animateScroll = (currentTime) => {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = animationUtils.easeInOut(progress);
      
      element.scrollTop = start + change * ease;
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  }
};
