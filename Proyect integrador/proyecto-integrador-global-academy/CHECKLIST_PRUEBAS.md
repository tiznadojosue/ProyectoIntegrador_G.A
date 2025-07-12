📋 CHECKLIST DE PRUEBAS - PROYECTO INTEGRADOR
================================================

🎯 OBJETIVO: Verificar que todos los requisitos del proyecto estén funcionando correctamente

## ✅ PRUEBAS TÉCNICAS OBLIGATORIAS

### 1️⃣ ESTRUCTURA Y COMPONENTES
- [ ] El proyecto se inicia con `npm run dev` sin errores
- [ ] Los componentes se renderizan correctamente
- [ ] JSX está bien formateado y funcional
- [ ] La organización por carpetas es lógica

### 2️⃣ FORMULARIOS CONTROLADOS
**Ruta: /add-user**
- [ ] Los inputs están controlados (se pueden escribir)
- [ ] Las validaciones funcionan (campos obligatorios)
- [ ] Los mensajes de error aparecen cuando corresponde
- [ ] El formulario se envía correctamente
- [ ] Los datos se guardan en localStorage

**Ruta: /edit-user/1**
- [ ] El formulario se pre-llena con datos existentes
- [ ] Se pueden modificar los campos
- [ ] Los cambios se guardan correctamente

### 3️⃣ CONSUMO DE API
**Ruta: /users o /users-simple**
- [ ] Se muestran usuarios de JSONPlaceholder API
- [ ] Aparece estado de "Cargando..." al inicio
- [ ] Si hay error de conexión, se muestra mensaje apropiado
- [ ] Los usuarios locales se combinan con los de la API

### 4️⃣ ENRUTAMIENTO
- [ ] **/** - Página principal carga
- [ ] **/users** - Lista de usuarios carga
- [ ] **/user/1** - Detalle de usuario carga
- [ ] **/add-user** - Formulario agregar carga
- [ ] **/edit-user/1** - Formulario editar carga
- [ ] **/ruta-inexistente** - Página 404 aparece

### 5️⃣ ESTADO GLOBAL
- [ ] Los usuarios agregados aparecen inmediatamente en la lista
- [ ] Los usuarios editados se actualizan en tiempo real
- [ ] Las notificaciones aparecen cuando se realiza una acción
- [ ] El cambio de tema (claro/oscuro) funciona
- [ ] El estado se mantiene al navegar entre páginas

### 6️⃣ PERSISTENCIA DE DATOS
- [ ] Los usuarios locales se guardan en localStorage
- [ ] Al recargar la página, los usuarios locales siguen ahí
- [ ] El tema seleccionado persiste entre sesiones
- [ ] Los datos no se pierden al cerrar y abrir el navegador

### 7️⃣ BUENAS PRÁCTICAS
- [ ] No hay errores en la consola del navegador (F12)
- [ ] Los componentes están bien organizados
- [ ] El código está comentado en español
- [ ] No hay código duplicado innecesario

## 🎨 PRUEBAS DE FUNCIONALIDAD ADICIONAL

### BÚSQUEDA Y FILTROS
**Ruta: /users**
- [ ] La barra de búsqueda funciona
- [ ] Se puede filtrar por tipo de usuario (local/API)
- [ ] El ordenamiento por nombre/email funciona
- [ ] La vista grilla/lista se puede cambiar

### INTERFAZ DE USUARIO
- [ ] Las animaciones se ven suaves
- [ ] El diseño es responsive (se adapta al tamaño)
- [ ] Los iconos se muestran correctamente
- [ ] Los botones responden al hacer clic

### NAVEGACIÓN
- [ ] Los enlaces funcionan correctamente
- [ ] El botón "atrás" del navegador funciona
- [ ] Se puede navegar con el teclado (Tab)
- [ ] Las rutas se actualizan en la barra de direcciones

## 🐛 VERIFICACIÓN DE ERRORES

### CONSOLA DEL NAVEGADOR (F12)
- [ ] No hay errores rojos en la consola
- [ ] No hay advertencias importantes
- [ ] Los logs de debug son informativos

### CASOS EXTREMOS
- [ ] ¿Qué pasa si no hay conexión a internet?
- [ ] ¿Qué pasa si se ingresa una URL incorrecta?
- [ ] ¿Qué pasa si se envía un formulario vacío?
- [ ] ¿Qué pasa si se edita un usuario inexistente?

## 📊 RESULTADOS DE LA PRUEBA

### PUNTUACIÓN POR CATEGORÍA
- Estructura y Componentes: ___/10
- Formularios Controlados: ___/10  
- Consumo de API: ___/10
- Enrutamiento: ___/10
- Estado Global: ___/10
- Persistencia: ___/10
- Buenas Prácticas: ___/10

### TOTAL: ___/70 puntos

## 📝 NOTAS Y OBSERVACIONES
_____________________________________
_____________________________________
_____________________________________
_____________________________________

## ✅ VEREDICTO FINAL
- [ ] ✅ APROBADO - Cumple todos los requisitos
- [ ] ⚠️ APROBADO CON OBSERVACIONES - Falta algo menor
- [ ] ❌ NECESITA CORRECCIONES - Faltan elementos importantes

================================================
Proyecto evaluado por: ________________________
Fecha: ______________________________________
