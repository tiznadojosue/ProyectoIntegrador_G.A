import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, Mail, Phone, Globe, Building, MapPin, User, Calendar, Tag } from 'lucide-react';
import { useUser } from '../hooks';
import { useAppContext } from '../context/AppContext';
import { formatters } from '../utils';
import Loading from '../components/Loading';

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { actions } = useAppContext();
  const { user, loading, error } = useUser(id);

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      try {
        actions.deleteUser(parseInt(id));
        actions.setNotification({
          type: 'success',
          message: 'Usuario eliminado exitosamente'
        });
        navigate('/users');
      } catch (error) {
        actions.setNotification({
          type: 'error',
          message: 'Error al eliminar el usuario'
        });
      }
    }
  };

  if (loading) {
    return <Loading text="Cargando detalles del usuario..." />;
  }

  if (error || !user) {
    return (
      <div className="error-state" data-aos="fade-up">
        <div className="container">
          <div className="error-state__content">
            <h2>Usuario no encontrado</h2>
            <p>{error || 'El usuario que buscas no existe.'}</p>
            <Link to="/users" className="btn">
              <ArrowLeft size={16} />
              Volver a usuarios
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="user-detail">
      <div className="container">
        {/* Header */}
        <div className="user-detail__header" data-aos="fade-up">
          <Link to="/users" className="btn btn-secondary">
            <ArrowLeft size={16} />
            Volver
          </Link>

          <div className="user-detail__actions">
            <Link 
              to={`/edit-user/${user.id}`} 
              className="btn"
            >
              <Edit size={16} />
              Editar
            </Link>
            
            {user.isLocal && (
              <button 
                onClick={handleDelete}
                className="btn btn-danger"
              >
                <Trash2 size={16} />
                Eliminar
              </button>
            )}
          </div>
        </div>

        {/* Perfil principal */}
        <div className="user-profile" data-aos="fade-up" data-aos-delay="100">
          <div className="user-profile__header">
            <div className="user-profile__avatar">
              <img 
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=667eea&color=fff&size=120`}
                alt={user.name}
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=667eea&color=fff&size=120`;
                }}
              />
              {user.isLocal && (
                <div className="user-profile__badge">
                  <Tag size={14} />
                  Local
                </div>
              )}
            </div>

            <div className="user-profile__info">
              <h1 className="user-profile__name">
                {formatters.capitalizeWords(user.name)}
              </h1>
              <p className="user-profile__username">@{user.username}</p>
              
              {user.company?.name && (
                <p className="user-profile__company">
                  <Building size={16} />
                  {user.company.name}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Información detallada */}
        <div className="user-details-grid" data-aos="fade-up" data-aos-delay="200">
          {/* Información de contacto */}
          <div className="detail-card">
            <h3 className="detail-card__title">
              <Mail size={20} />
              Información de Contacto
            </h3>
            
            <div className="detail-card__content">
              <div className="detail-item">
                <Mail size={16} />
                <div>
                  <span className="detail-item__label">Email</span>
                  <a 
                    href={`mailto:${user.email}`}
                    className="detail-item__value detail-item__link"
                  >
                    {user.email}
                  </a>
                </div>
              </div>

              {user.phone && (
                <div className="detail-item">
                  <Phone size={16} />
                  <div>
                    <span className="detail-item__label">Teléfono</span>
                    <a 
                      href={`tel:${user.phone}`}
                      className="detail-item__value detail-item__link"
                    >
                      {formatters.formatPhone(user.phone)}
                    </a>
                  </div>
                </div>
              )}

              {user.website && (
                <div className="detail-item">
                  <Globe size={16} />
                  <div>
                    <span className="detail-item__label">Sitio web</span>
                    <a 
                      href={user.website.startsWith('http') ? user.website : `https://${user.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="detail-item__value detail-item__link"
                    >
                      {user.website}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Información profesional */}
          {user.company && (
            <div className="detail-card">
              <h3 className="detail-card__title">
                <Building size={20} />
                Información Profesional
              </h3>
              
              <div className="detail-card__content">
                {user.company.name && (
                  <div className="detail-item">
                    <Building size={16} />
                    <div>
                      <span className="detail-item__label">Empresa</span>
                      <span className="detail-item__value">{user.company.name}</span>
                    </div>
                  </div>
                )}

                {user.company.catchPhrase && (
                  <div className="detail-item">
                    <Tag size={16} />
                    <div>
                      <span className="detail-item__label">Slogan</span>
                      <span className="detail-item__value">{user.company.catchPhrase}</span>
                    </div>
                  </div>
                )}

                {user.company.bs && (
                  <div className="detail-item">
                    <User size={16} />
                    <div>
                      <span className="detail-item__label">Área de negocio</span>
                      <span className="detail-item__value">{user.company.bs}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Dirección */}
          {user.address && (
            <div className="detail-card">
              <h3 className="detail-card__title">
                <MapPin size={20} />
                Dirección
              </h3>
              
              <div className="detail-card__content">
                {user.address.street && (
                  <div className="detail-item">
                    <MapPin size={16} />
                    <div>
                      <span className="detail-item__label">Calle</span>
                      <span className="detail-item__value">
                        {user.address.street}
                        {user.address.suite && `, ${user.address.suite}`}
                      </span>
                    </div>
                  </div>
                )}

                {user.address.city && (
                  <div className="detail-item">
                    <Building size={16} />
                    <div>
                      <span className="detail-item__label">Ciudad</span>
                      <span className="detail-item__value">{user.address.city}</span>
                    </div>
                  </div>
                )}

                {user.address.zipcode && (
                  <div className="detail-item">
                    <Tag size={16} />
                    <div>
                      <span className="detail-item__label">Código Postal</span>
                      <span className="detail-item__value">{user.address.zipcode}</span>
                    </div>
                  </div>
                )}

                {user.address.geo && (
                  <div className="detail-item">
                    <Globe size={16} />
                    <div>
                      <span className="detail-item__label">Coordenadas</span>
                      <span className="detail-item__value">
                        {user.address.geo.lat}, {user.address.geo.lng}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Información del sistema */}
          <div className="detail-card">
            <h3 className="detail-card__title">
              <Calendar size={20} />
              Información del Sistema
            </h3>
            
            <div className="detail-card__content">
              <div className="detail-item">
                <User size={16} />
                <div>
                  <span className="detail-item__label">ID de Usuario</span>
                  <span className="detail-item__value">#{user.id}</span>
                </div>
              </div>

              <div className="detail-item">
                <Tag size={16} />
                <div>
                  <span className="detail-item__label">Tipo</span>
                  <span className="detail-item__value">
                    {user.isLocal ? 'Usuario Local' : 'Usuario de API'}
                  </span>
                </div>
              </div>

              <div className="detail-item">
                <Calendar size={16} />
                <div>
                  <span className="detail-item__label">Última actualización</span>
                  <span className="detail-item__value">
                    {formatters.formatDate(new Date())}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Acciones rápidas */}
        <div className="quick-actions-bar" data-aos="fade-up" data-aos-delay="300">
          <Link 
            to={`/edit-user/${user.id}`} 
            className="btn"
          >
            <Edit size={16} />
            Editar Usuario
          </Link>
          
          <a 
            href={`mailto:${user.email}`}
            className="btn btn-secondary"
          >
            <Mail size={16} />
            Enviar Email
          </a>

          {user.phone && (
            <a 
              href={`tel:${user.phone}`}
              className="btn btn-secondary"
            >
              <Phone size={16} />
              Llamar
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
