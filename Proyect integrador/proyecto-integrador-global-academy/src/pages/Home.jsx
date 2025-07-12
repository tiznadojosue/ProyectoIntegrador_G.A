import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Plus, Eye, Code, Github, Sparkles } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Home = () => {
  const { state } = useAppContext();

  const features = [
    {
      icon: <Users size={24} />,
      title: 'Gestión de Usuarios',
      description: 'Administra usuarios de forma intuitiva con todas las funciones CRUD.',
      color: 'var(--primary-color)'
    },
    {
      icon: <Plus size={24} />,
      title: 'Formularios Avanzados',
      description: 'Formularios controlados con validación en tiempo real y manejo de errores.',
      color: 'var(--secondary-color)'
    },
    {
      icon: <Eye size={24} />,
      title: 'API Integration',
      description: 'Consumo de APIs externas con estados de loading y manejo de errores.',
      color: 'var(--accent-color)'
    },
    {
      icon: <Code size={24} />,
      title: 'React Moderno',
      description: 'Hooks, Context API, React Router y las mejores prácticas de desarrollo.',
      color: 'var(--primary-dark)'
    }
  ];

  const stats = [
    { number: state.users.length, label: 'Usuarios Registrados' },
    { number: state.users.filter(u => u.isLocal).length, label: 'Usuarios Locales' },
    { number: '100%', label: 'React & Vite' },
    { number: '4.5⭐', label: 'Calidad del Código' }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero" data-aos="fade-up">
        <div className="container">
          <div className="hero__content">
            <div className="hero__text">
              <h1 className="hero__title" data-aos="fade-up" data-aos-delay="100">
                <span className="text-gradient">Proyecto Integrador</span>
                <br />
                Global Academy
              </h1>
              
              <p className="hero__description" data-aos="fade-up" data-aos-delay="200">
                Una aplicación completa de gestión de usuarios desarrollada con React, 
                implementando las mejores prácticas modernas de desarrollo frontend.
              </p>

              <div className="hero__actions" data-aos="fade-up" data-aos-delay="300">
                <Link to="/users" className="btn">
                  <Users size={18} />
                  Ver Usuarios
                </Link>
                
                <Link to="/add-user" className="btn btn-secondary">
                  <Plus size={18} />
                  Agregar Usuario
                </Link>
              </div>

              <div className="hero__tech" data-aos="fade-up" data-aos-delay="400">
                <span>Tecnologías:</span>
                <div className="tech-badges">
                  <span className="tech-badge">React</span>
                  <span className="tech-badge">Vite</span>
                  <span className="tech-badge">React Router</span>
                  <span className="tech-badge">Context API</span>
                  <span className="tech-badge">AOS</span>
                </div>
              </div>
            </div>

            <div className="hero__visual" data-aos="fade-left" data-aos-delay="200">
              <div className="hero__card">
                <div className="hero__card-header">
                  <div className="hero__card-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <span className="hero__card-title">Global Academy</span>
                </div>
                <div className="hero__card-content">
                  <div className="hero__stats">
                    {stats.map((stat, index) => (
                      <div key={index} className="hero__stat" data-aos="zoom-in" data-aos-delay={500 + (index * 100)}>
                        <div className="hero__stat-number">{stat.number}</div>
                        <div className="hero__stat-label">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <h2 className="section-title">
              <Sparkles size={28} />
              Funcionalidades Implementadas
            </h2>
            <p className="section-description">
              Este proyecto demuestra el dominio de conceptos avanzados de React y desarrollo frontend moderno.
            </p>
          </div>

          <div className="features__grid">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="feature-card"
                data-aos="fade-up"
                data-aos-delay={100 + (index * 100)}
              >
                <div className="feature-card__icon" style={{ color: feature.color }}>
                  {feature.icon}
                </div>
                <h3 className="feature-card__title">{feature.title}</h3>
                <p className="feature-card__description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="quick-actions">
        <div className="container">
          <div className="quick-actions__content" data-aos="fade-up">
            <h2 className="quick-actions__title">¿Listo para comenzar?</h2>
            <p className="quick-actions__description">
              Explora las funcionalidades de la aplicación y descubre cómo funciona la gestión moderna de usuarios.
            </p>
            
            <div className="quick-actions__buttons">
              <Link to="/users" className="btn" data-aos="fade-right" data-aos-delay="100">
                <Eye size={18} />
                Explorar Usuarios
              </Link>
              
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-secondary"
                data-aos="fade-left" 
                data-aos-delay="200"
              >
                <Github size={18} />
                Ver en GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
