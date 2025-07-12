@echo off
echo.
echo ========================================
echo       PROBANDO LA APLICACION
echo ========================================
echo.

echo 🚀 Iniciando servidor de desarrollo...
start cmd /k "cd /d "%~dp0" && npm run dev"

echo.
echo ⏳ Esperando 5 segundos para que el servidor inicie...
timeout /t 5 /nobreak >nul

echo.
echo 🌐 Abriendo rutas para probar:
echo.

echo 📖 1. Abriendo pagina principal...
start http://localhost:5173
timeout /t 2 /nobreak >nul

echo 👥 2. Abriendo usuarios (version simple)...
start http://localhost:5173/users-simple
timeout /t 2 /nobreak >nul

echo 🔍 3. Abriendo version de debug...
start http://localhost:5173/users-debug
timeout /t 2 /nobreak >nul

echo ➕ 4. Abriendo formulario agregar usuario...
start http://localhost:5173/add-user
timeout /t 2 /nobreak >nul

echo 👤 5. Abriendo detalle de usuario (ID 1)...
start http://localhost:5173/user/1
timeout /t 2 /nobreak >nul

echo ✏️ 6. Abriendo editar usuario (ID 1)...
start http://localhost:5173/edit-user/1
timeout /t 2 /nobreak >nul

echo 🚫 7. Abriendo pagina 404...
start http://localhost:5173/pagina-inexistente
timeout /t 2 /nobreak >nul

echo.
echo ✅ TODAS LAS RUTAS ABIERTAS EN PESTAÑAS SEPARADAS
echo.
echo 📝 INSTRUCCIONES DE PRUEBA:
echo.
echo 1. Verifica que todas las paginas cargan correctamente
echo 2. Prueba agregar un nuevo usuario
echo 3. Prueba editar un usuario existente
echo 4. Prueba la busqueda en la lista de usuarios
echo 5. Verifica que el modo oscuro/claro funciona
echo 6. Prueba la navegacion entre paginas
echo.
echo 🎯 FUNCIONALIDADES A VERIFICAR:
echo.
echo ✅ Context API (estado global)
echo ✅ React Router (navegacion)
echo ✅ Formularios controlados
echo ✅ Validaciones
echo ✅ Consumo de API (JSONPlaceholder)
echo ✅ localStorage (persistencia)
echo ✅ useEffect (ciclo de vida)
echo ✅ Componentes reutilizables
echo ✅ Estados de loading/error
echo ✅ Notificaciones
echo.
echo ========================================
echo    PRUEBA COMPLETADA - EVALUAR PROYECTO
echo ========================================
echo.

pause
