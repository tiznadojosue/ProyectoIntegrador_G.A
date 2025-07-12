import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Globe, Building, MapPin, Edit, Trash2, Eye } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { formatters } from '../utils';

const UserCard = ({ user, onDelete }) => {
  const { actions } = useAppContext();

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      try {
        await onDelete(user.id);
        actions.setNotification({
          type: 'success',
          message: 'Usuario eliminado exitosamente'
        });
      } catch (error) {
        actions.setNotification({
          type: 'error',
          message: 'Error al eliminar el usuario'
        });
      }
    }
  };

  return (
    <div className="user-card" data-aos="fade-up" data-aos-delay="100">
      {/* Avatar y nombre */}
      <div className="user-card__header">
        <div className="user-card__avatar">
          <img 
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=667eea&color=fff&size=80`}
            alt={user.name}
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=667eea&color=fff&size=80`;
            }}
          />
          {user.isLocal && <div className="user-card__badge">Local</div>}
        </div>
        
        <div className="user-card__info">
          <h3 className="user-card__name">
            {formatters.capitalizeWords(user.name)}
          </h3>
          <p className="user-card__username">@{user.username}</p>
        </div>
      </div>

      {/* Información de contacto */}
      <div className="user-card__contact">
        <div className="user-card__contact-item">
          <Mail size={16} />
          <a href={`mailto:${user.email}`} className="user-card__link">
            {user.email}
          </a>
        </div>
        
        <div className="user-card__contact-item">
          <Phone size={16} />
          <a href={`tel:${user.phone}`} className="user-card__link">
            {formatters.formatPhone(user.phone)}
          </a>
        </div>
        
        {user.website && (
          <div className="user-card__contact-item">
            <Globe size={16} />
            <a 
              href={formatters.formatUrl(user.website)} 
              target="_blank" 
              rel="noopener noreferrer"
              className="user-card__link"
            >
              {user.website}
            </a>
          </div>
        )}
      </div>

      {/* Detalles adicionales */}
      <div className="user-card__details">
        {user.company?.name && (
          <div className="user-card__detail">
            <Building size={14} />
            <span>{user.company.name}</span>
          </div>
        )}
        
        {user.address?.city && (
          <div className="user-card__detail">
            <MapPin size={14} />
            <span>{user.address.city}</span>
          </div>
        )}
      </div>

      {/* Acciones */}
      <div className="user-card__actions">
        <Link 
          to={`/user/${user.id}`}
          className="btn btn-sm"
        >
          <Eye size={14} />
          Ver
        </Link>
        
        <Link 
          to={`/edit-user/${user.id}`}
          className="btn btn-secondary btn-sm"
        >
          <Edit size={14} />
          Editar
        </Link>
        
        <button 
          onClick={handleDelete}
          className="btn btn-danger btn-sm"
        >
          <Trash2 size={14} />
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default UserCard;
