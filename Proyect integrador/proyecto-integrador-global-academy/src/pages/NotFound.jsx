import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="container">
        <div className="not-found__content" data-aos="fade-up">
          <div className="not-found__visual" data-aos="zoom-in" data-aos-delay="100">
            <div className="not-found__number">404</div>
            <div className="not-found__icon">
              <Search size={64} />
            </div>
          </div>

          <div className="not-found__text" data-aos="fade-up" data-aos-delay="200">
            <h1 className="not-found__title">Página no encontrada</h1>
            <p className="not-found__description">
              Lo sentimos, la página que estás buscando no existe o ha sido movida.
            </p>
          </div>

          <div className="not-found__actions" data-aos="fade-up" data-aos-delay="300">
            <Link to="/" className="btn">
              <Home size={18} />
              Ir al inicio
            </Link>
            
            <button 
              onClick={() => window.history.back()}
              className="btn btn-secondary"
            >
              <ArrowLeft size={18} />
              Volver atrás
            </button>
          </div>

          <div className="not-found__suggestions" data-aos="fade-up" data-aos-delay="400">
            <h3>¿Qué puedes hacer?</h3>
            <ul>
              <li>
                <Link to="/users">Ver todos los usuarios</Link>
              </li>
              <li>
                <Link to="/add-user">Agregar un nuevo usuario</Link>
              </li>
              <li>
                <Link to="/">Explorar las funcionalidades</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
