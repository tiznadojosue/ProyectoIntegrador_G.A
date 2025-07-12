import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, User, Mail, Phone, Globe, Building, MapPin } from 'lucide-react';
import { useFormValidation } from '../hooks';
import { validators, formatters } from '../utils';
import { useAppContext } from '../context/AppContext';

const UserForm = ({ user = null, onSubmit, title = "Agregar Usuario" }) => {
  const navigate = useNavigate();
  const { actions } = useAppContext();

  // Valores iniciales del formulario
  const initialValues = {
    name: user?.name || '',
    username: user?.username || '',
    email: user?.email || '',
    phone: user?.phone || '',
    website: user?.website || '',
    company: user?.company?.name || '',
    city: user?.address?.city || '',
    street: user?.address?.street || '',
    suite: user?.address?.suite || '',
    zipcode: user?.address?.zipcode || ''
  };

  // Reglas de validación
  const validationRules = {
    name: [validators.required, validators.minLength(2), validators.maxLength(50)],
    username: [validators.required, validators.minLength(3), validators.maxLength(20), validators.alphanumeric],
    email: [validators.required, validators.email],
    phone: [validators.phone],
    website: [validators.website],
    company: [validators.maxLength(50)],
    city: [validators.maxLength(30)],
    street: [validators.maxLength(50)],
    suite: [validators.maxLength(20)],
    zipcode: [validators.maxLength(10)]
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    setValues
  } = useFormValidation(initialValues, validationRules);

  // Cargar datos del usuario si estamos editando
  useEffect(() => {
    if (user) {
      setValues({
        name: user.name || '',
        username: user.username || '',
        email: user.email || '',
        phone: user.phone || '',
        website: user.website || '',
        company: user.company?.name || '',
        city: user.address?.city || '',
        street: user.address?.street || '',
        suite: user.address?.suite || '',
        zipcode: user.address?.zipcode || ''
      });
    }
  }, [user, setValues]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateAll()) {
      actions.setNotification({
        type: 'error',
        message: 'Por favor corrige los errores en el formulario'
      });
      return;
    }

    try {
      // Preparar datos para envío
      const userData = {
        id: user?.id, // Incluir ID si estamos editando
        name: values.name.trim(),
        username: values.username.trim().toLowerCase(),
        email: values.email.trim().toLowerCase(),
        phone: values.phone.trim(),
        website: values.website.trim(),
        company: {
          name: values.company.trim()
        },
        address: {
          street: values.street.trim(),
          suite: values.suite.trim(),
          city: values.city.trim(),
          zipcode: values.zipcode.trim()
        }
      };

      await onSubmit(userData);
      
      actions.setNotification({
        type: 'success',
        message: user ? 'Usuario actualizado exitosamente' : 'Usuario creado exitosamente'
      });

      navigate('/users');
    } catch (error) {
      actions.setNotification({
        type: 'error',
        message: error.message || 'Error al guardar el usuario'
      });
    }
  };

  const handleBackClick = () => {
    navigate('/users');
  };

  return (
    <div className="user-form" data-aos="fade-up">
      <div className="container">
        <div className="user-form__header">
          <h1 className="user-form__title">
            <User size={32} />
            {title}
          </h1>
          <button 
            type="button" 
            onClick={handleBackClick}
            className="btn btn-secondary"
          >
            <ArrowLeft size={16} />
            Volver
          </button>
        </div>

        <form onSubmit={handleSubmit} className="user-form__form">
          {/* Información Personal */}
          <fieldset className="form-fieldset" data-aos="slide-up" data-aos-delay="100">
            <legend>Información Personal</legend>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  placeholder="Ej: Juan Pérez"
                />
                {errors.name && (
                  <div className="error-message">
                    <User size={12} />
                    {errors.name}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="username" className="form-label">
                  Nombre de Usuario *
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`form-input ${errors.username ? 'error' : ''}`}
                  placeholder="Ej: juanperez"
                />
                {errors.username && (
                  <div className="error-message">
                    <User size={12} />
                    {errors.username}
                  </div>
                )}
              </div>
            </div>
          </fieldset>

          {/* Información de Contacto */}
          <fieldset className="form-fieldset" data-aos="slide-up" data-aos-delay="200">
            <legend>Información de Contacto</legend>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="Ej: juan@email.com"
                />
                {errors.email && (
                  <div className="error-message">
                    <Mail size={12} />
                    {errors.email}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`form-input ${errors.phone ? 'error' : ''}`}
                  placeholder="Ej: +1-555-0123"
                />
                {errors.phone && (
                  <div className="error-message">
                    <Phone size={12} />
                    {errors.phone}
                  </div>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="website" className="form-label">
                Sitio Web
              </label>
              <input
                type="url"
                id="website"
                name="website"
                value={values.website}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-input ${errors.website ? 'error' : ''}`}
                placeholder="Ej: https://ejemplo.com"
              />
              {errors.website && (
                <div className="error-message">
                  <Globe size={12} />
                  {errors.website}
                </div>
              )}
            </div>
          </fieldset>

          {/* Información Laboral */}
          <fieldset className="form-fieldset" data-aos="slide-up" data-aos-delay="300">
            <legend>Información Laboral</legend>
            
            <div className="form-group">
              <label htmlFor="company" className="form-label">
                Empresa
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={values.company}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-input ${errors.company ? 'error' : ''}`}
                placeholder="Ej: Tech Corp"
              />
              {errors.company && (
                <div className="error-message">
                  <Building size={12} />
                  {errors.company}
                </div>
              )}
            </div>
          </fieldset>

          {/* Información de Dirección */}
          <fieldset className="form-fieldset" data-aos="slide-up" data-aos-delay="400">
            <legend>Dirección</legend>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="street" className="form-label">
                  Calle
                </label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  value={values.street}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`form-input ${errors.street ? 'error' : ''}`}
                  placeholder="Ej: 123 Main St"
                />
                {errors.street && (
                  <div className="error-message">
                    <MapPin size={12} />
                    {errors.street}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="suite" className="form-label">
                  Apartamento/Suite
                </label>
                <input
                  type="text"
                  id="suite"
                  name="suite"
                  value={values.suite}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`form-input ${errors.suite ? 'error' : ''}`}
                  placeholder="Ej: Apt 4B"
                />
                {errors.suite && (
                  <div className="error-message">
                    <MapPin size={12} />
                    {errors.suite}
                  </div>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city" className="form-label">
                  Ciudad
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`form-input ${errors.city ? 'error' : ''}`}
                  placeholder="Ej: New York"
                />
                {errors.city && (
                  <div className="error-message">
                    <MapPin size={12} />
                    {errors.city}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="zipcode" className="form-label">
                  Código Postal
                </label>
                <input
                  type="text"
                  id="zipcode"
                  name="zipcode"
                  value={values.zipcode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`form-input ${errors.zipcode ? 'error' : ''}`}
                  placeholder="Ej: 10001"
                />
                {errors.zipcode && (
                  <div className="error-message">
                    <MapPin size={12} />
                    {errors.zipcode}
                  </div>
                )}
              </div>
            </div>
          </fieldset>

          {/* Botón de envío */}
          <div className="form-actions" data-aos="fade-up" data-aos-delay="500">
            <button 
              type="submit" 
              className="btn"
            >
              <Save size={16} />
              {user ? 'Actualizar Usuario' : 'Crear Usuario'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
