import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Plus, Users as UsersIcon, SortAsc, SortDesc, Grid, List } from 'lucide-react';
import { useUsers } from '../hooks';
import { useAppContext } from '../context/AppContext';
import { searchUtils, debounce } from '../utils';
import UserCard from '../components/UserCard';
import Loading from '../components/Loading';

const Users = () => {
  const { actions } = useAppContext();
  const { users, loading, error, refetch } = useUsers();
  
  // Debug logs
  console.log('Users component render:', { users, loading, error });
  
  // Estados para filtros y búsqueda
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterType, setFilterType] = useState('all'); // all, local, api
  const [viewMode, setViewMode] = useState('grid'); // grid, list

  // Debounced search
  const debouncedSearch = useMemo(
    () => debounce((term) => setSearchTerm(term), 300),
    []
  );

  // Filtrar y ordenar usuarios
  const filteredAndSortedUsers = useMemo(() => {
    try {
      let filtered = users || [];

      // Filtrar por tipo
      if (filterType === 'local') {
        filtered = filtered.filter(user => user.isLocal);
      } else if (filterType === 'api') {
        filtered = filtered.filter(user => !user.isLocal);
      }

      // Buscar
      if (searchTerm) {
        filtered = searchUtils.searchUsers(filtered, searchTerm);
      }

      // Ordenar
      return searchUtils.sortUsers(filtered, sortBy, sortOrder);
    } catch (err) {
      console.error('Error al filtrar usuarios:', err);
      return [];
    }
  }, [users, searchTerm, sortBy, sortOrder, filterType]);

  const handleDelete = async (userId) => {
    try {
      actions.deleteUser(userId);
    } catch (error) {
      actions.setNotification({
        type: 'error',
        message: 'Error al eliminar el usuario'
      });
    }
  };

  const handleSortChange = (newSortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('asc');
    }
  };

  const getSortIcon = (field) => {
    if (sortBy !== field) return null;
    return sortOrder === 'asc' ? <SortAsc size={14} /> : <SortDesc size={14} />;
  };

  if (loading) {
    return <Loading text="Cargando usuarios..." />;
  }

  if (error) {
    return (
      <div className="error-state" data-aos="fade-up">
        <div className="container">
          <div className="error-state__content">
            <h2>Error al cargar usuarios</h2>
            <p>{error}</p>
            <button onClick={refetch} className="btn">
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="users-page">
      <div className="container">
        {/* Header */}
        <div className="users-page__header" data-aos="fade-up">
          <div className="users-page__title-section">
            <h1 className="users-page__title">
              <UsersIcon size={32} />
              Gestión de Usuarios
            </h1>
            <p className="users-page__subtitle">
              {filteredAndSortedUsers.length} de {users.length} usuarios
            </p>
          </div>

          <Link to="/add-user" className="btn" data-aos="fade-left">
            <Plus size={18} />
            Agregar Usuario
          </Link>
        </div>

        {/* Controles */}
        <div className="users-page__controls" data-aos="fade-up" data-aos-delay="100">
          {/* Búsqueda */}
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Buscar usuarios por nombre, email, teléfono..."
              onChange={(e) => debouncedSearch(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Filtros */}
          <div className="filters">
            <div className="filter-group">
              <Filter size={16} />
              <select 
                value={filterType} 
                onChange={(e) => setFilterType(e.target.value)}
                className="filter-select"
              >
                <option value="all">Todos los usuarios</option>
                <option value="local">Solo locales</option>
                <option value="api">Solo de API</option>
              </select>
            </div>

            {/* Ordenamiento */}
            <div className="sort-controls">
              <button 
                onClick={() => handleSortChange('name')}
                className={`sort-btn ${sortBy === 'name' ? 'active' : ''}`}
              >
                Nombre {getSortIcon('name')}
              </button>
              
              <button 
                onClick={() => handleSortChange('email')}
                className={`sort-btn ${sortBy === 'email' ? 'active' : ''}`}
              >
                Email {getSortIcon('email')}
              </button>
              
              <button 
                onClick={() => handleSortChange('company.name')}
                className={`sort-btn ${sortBy === 'company.name' ? 'active' : ''}`}
              >
                Empresa {getSortIcon('company.name')}
              </button>
            </div>

            {/* Modo de vista */}
            <div className="view-controls">
              <button 
                onClick={() => setViewMode('grid')}
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                title="Vista en grilla"
              >
                <Grid size={16} />
              </button>
              
              <button 
                onClick={() => setViewMode('list')}
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                title="Vista en lista"
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Lista de usuarios */}
        {filteredAndSortedUsers.length === 0 ? (
          <div className="empty-state" data-aos="fade-up" data-aos-delay="200">
            <UsersIcon size={64} />
            <h3>No se encontraron usuarios</h3>
            <p>
              {searchTerm 
                ? `No hay usuarios que coincidan con "${searchTerm}"`
                : 'Aún no hay usuarios registrados'
              }
            </p>
            {!searchTerm && (
              <Link to="/add-user" className="btn">
                <Plus size={18} />
                Agregar el primer usuario
              </Link>
            )}
          </div>
        ) : (
          <div 
            className={`users-grid ${viewMode === 'list' ? 'users-grid--list' : ''}`}
            data-aos="fade-up" 
            data-aos-delay="200"
          >
            {filteredAndSortedUsers.map((user, index) => (
              <UserCard 
                key={user.id} 
                user={user} 
                onDelete={handleDelete}
                data-aos="fade-up"
                data-aos-delay={100 + (index * 50)}
              />
            ))}
          </div>
        )}

        {/* Stats Footer */}
        {users.length > 0 && (
          <div className="users-stats" data-aos="fade-up" data-aos-delay="300">
            <div className="stat">
              <span className="stat__number">{users.length}</span>
              <span className="stat__label">Total</span>
            </div>
            
            <div className="stat">
              <span className="stat__number">{users.filter(u => u.isLocal).length}</span>
              <span className="stat__label">Locales</span>
            </div>
            
            <div className="stat">
              <span className="stat__number">{users.filter(u => !u.isLocal).length}</span>
              <span className="stat__label">De API</span>
            </div>
            
            <div className="stat">
              <span className="stat__number">{filteredAndSortedUsers.length}</span>
              <span className="stat__label">Mostrados</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
