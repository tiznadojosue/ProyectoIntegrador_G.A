@echo off
echo Iniciando servidor de desarrollo...
cd /d "c:\Users\POSITIVO\Desktop\Proyect integrador\proyecto-integrador-global-academy"

echo Instalando dependencias si es necesario...
call npm install --silent

echo.
echo Iniciando servidor en http://localhost:5173
echo.
echo Rutas disponibles para probar:
echo   http://localhost:5173/                 - Página principal
echo   http://localhost:5173/users            - Usuarios original (puede fallar)
echo   http://localhost:5173/users-simple     - Usuarios simplificado (debería funcionar)
echo   http://localhost:5173/users-debug      - Debug de usuarios
echo.
echo Presiona Ctrl+C para detener el servidor
echo.

call npm run dev
