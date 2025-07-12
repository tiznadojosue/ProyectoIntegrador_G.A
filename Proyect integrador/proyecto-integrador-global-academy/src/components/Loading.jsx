import React from 'react';

const Loading = ({ size = 'medium', text = 'Cargando...' }) => {
  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'loading--small';
      case 'large':
        return 'loading--large';
      case 'medium':
      default:
        return 'loading--medium';
    }
  };

  return (
    <div className={`loading ${getSizeClass()}`} data-aos="fade-in">
      <div className="loading__spinner">
        <div className="loading__dot loading__dot--1"></div>
        <div className="loading__dot loading__dot--2"></div>
        <div className="loading__dot loading__dot--3"></div>
      </div>
      {text && <p className="loading__text">{text}</p>}
    </div>
  );
};

export default Loading;
