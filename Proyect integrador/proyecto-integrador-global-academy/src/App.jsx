import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Contexto - donde guardamos información que toda la app puede usar
import { AppProvider } from './context/AppContext';

// Componentes - piezas reutilizables de la interfaz
import Header from './components/Header';
import Notification from './components/Notification';
import ErrorBoundary from './components/ErrorBoundary';

// Páginas - las diferentes pantallas de la aplicación
import Home from './pages/Home';
import Users from './pages/Users';
import UserDetail from './pages/UserDetail';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import NotFound from './pages/NotFound';

// Componente de debug temporal
import UsersDebug from './components/UsersDebug';
import UsersSimple from './components/UsersSimple';

function App() {
  useEffect(() => {
    // Inicializar AOS (biblioteca que hace las animaciones cuando haces desplazamiento)
    AOS.init({
      duration: 800,        // cuanto tiempo duran las animaciones (en milisegundos)
      easing: 'ease-out-cubic',  // tipo de animacion suave
      once: false,          // repetir animaciones cuando desplazas hacia arriba
      mirror: true,         // animar cuando sales de la vista tambien
      offset: 50,           // cuando empezar la animacion (50 pixeles antes)
      delay: 0,             // sin demora entre animaciones
      anchorPlacement: 'top-bottom',  // donde detectar el elemento en pantalla
      // Configuraciones extra para que funcione mejor
      startEvent: 'DOMContentLoaded', // cuando empezar las animaciones
      animatedClassName: 'aos-animate', // clase CSS que se agrega al animar
      initClassName: 'aos-init',       // clase CSS inicial
      useClassNames: false,            // usar nombres de clase personalizados
      disableMutationObserver: false,  // seguir observando cambios en la página
      debounceDelay: 50,              // evitar muchas actualizaciones seguidas
      throttleDelay: 99               // limitar frecuencia de actualizaciones
    });

    // Actualizar animaciones cuando cambie la página
    AOS.refresh();

    // Detectar si estamos en modo noche y aplicar efectos especiales
    const aplicarEfectosNeon = () => {
      const esTemaOscuro = document.documentElement.getAttribute('data-theme') === 'dark';
      if (esTemaOscuro) {
        // Agregar clase especial para efectos brillantes de neón
        document.body.classList.add('neon-mode');
        
        // Crear efecto de particulas brillantes en el fondo
        crearParticulasNeon();
      } else {
        document.body.classList.remove('neon-mode');
        eliminarParticulasNeon(); // quitar particulas si no es modo noche
      }
    };

    // Vigilar cuando el usuario cambie entre modo dia y noche
    const observador = new MutationObserver(aplicarEfectosNeon);
    observador.observe(document.documentElement, {
      attributes: true,                    // observar cambios en atributos
      attributeFilter: ['data-theme']      // solo vigilar el atributo data-theme
    });

    // Aplicar efectos la primera vez que carga la página
    aplicarEfectosNeon();

    return () => {
      AOS.refresh();              // actualizar animaciones antes de limpiar
      observador.disconnect();      // dejar de vigilar cambios
      eliminarParticulasNeon();      // quitar particulas si las hay
    };
  }, []);

  // Función para crear particulas brillantes en el fondo (solo modo noche)
  const crearParticulasNeon = () => {
    // Si ya hay particulas, no crear mas
    if (document.querySelector('.neon-particles')) return;

    const contenedorParticulas = document.createElement('div');
    contenedorParticulas.className = 'neon-particles';
    contenedorParticulas.style.cssText = `
      position: fixed;      
      top: 0;               
      left: 0;              
      width: 100%;          
      height: 100%;         
      pointer-events: none; 
      z-index: -1;
      overflow: hidden;
    `;

    // Crear partículas flotantes
    for (let i = 0; i < 20; i++) {
      const particula = document.createElement('div');
      particula.className = 'neon-particle';
      particula.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        background: var(--neon-blue);
        border-radius: 50%;
        box-shadow: 0 0 10px currentColor;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: neonFloat ${Math.random() * 10 + 15}s linear infinite;
        opacity: ${Math.random() * 0.7 + 0.3};
      `;
      
      // Colores aleatorios de neón
      const colores = ['var(--neon-blue)', 'var(--neon-purple)', 'var(--neon-pink)', 'var(--neon-green)'];
      particula.style.background = colores[Math.floor(Math.random() * colores.length)];
      
      contenedorParticulas.appendChild(particula);
    }

    document.body.appendChild(contenedorParticulas);
  };

  // Función para remover partículas
  const eliminarParticulasNeon = () => {
    const particulas = document.querySelector('.neon-particles');
    if (particulas) {
      particulas.remove();
    }
  };

  return (
    <AppProvider>
      <Router>
        <div className="app">
          <Header />
          
          <main className="main">
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users-debug" element={<UsersDebug />} />
                <Route path="/users-simple" element={<UsersSimple />} />
                <Route path="/user/:id" element={<UserDetail />} />
                <Route path="/add-user" element={<AddUser />} />
                <Route path="/edit-user/:id" element={<EditUser />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ErrorBoundary>
          </main>

          <Notification />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
