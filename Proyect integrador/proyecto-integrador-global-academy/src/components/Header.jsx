import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Users, Plus, Home } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Header = () => {
  const { state, actions } = useAppContext();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header className="header" data-aos="fade-down">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo">
            <Users className="logo-icon" />
            <span className="logo-text">
              <span className="text-gradient">Global Academy</span>
              <small>Proyecto Integrador</small>
            </span>
          </Link>

          {/* Navegación */}
          <nav className="nav">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/')}`}
            >
              <Home size={16} />
              Inicio
            </Link>
            <Link 
              to="/users" 
              className={`nav-link ${isActive('/users')}`}
            >
              <Users size={16} />
              Usuarios
            </Link>
            <Link 
              to="/add-user" 
              className={`nav-link ${isActive('/add-user')}`}
            >
              <Plus size={16} />
              Agregar
            </Link>
          </nav>

          {/* Controles */}
          <div className="header-controls">
            <button 
              className="theme-toggle"
              onClick={actions.toggleTheme}
              title={state.theme === 'light' ? 'Modo oscuro' : 'Modo claro'}
            >
              {state.theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
