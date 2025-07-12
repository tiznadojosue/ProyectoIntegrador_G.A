import React, { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Notification = () => {
  const { state, actions } = useAppContext();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (state.notification) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [state.notification]);

  if (!state.notification) return null;

  const getIcon = () => {
    switch (state.notification.type) {
      case 'success':
        return <CheckCircle size={20} />;
      case 'error':
        return <AlertCircle size={20} />;
      case 'warning':
        return <AlertTriangle size={20} />;
      case 'info':
      default:
        return <Info size={20} />;
    }
  };

  return (
    <div 
      className={`notification notification--${state.notification.type} ${isVisible ? 'notification--visible' : ''}`}
      data-aos="slide-left"
    >
      <div className="notification__content">
        <div className="notification__icon">
          {getIcon()}
        </div>
        <p className="notification__message">
          {state.notification.message}
        </p>
        <button 
          className="notification__close"
          onClick={actions.clearNotification}
          title="Cerrar notificación"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default Notification;
