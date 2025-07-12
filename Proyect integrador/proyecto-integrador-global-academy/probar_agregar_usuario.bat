@echo off
echo ======================================
echo   PROBANDO FUNCIONALIDAD AGREGAR USUARIO
echo ======================================
echo.
echo 1. Iniciando servidor de desarrollo...
start "Servidor" cmd /k "npm run dev"
echo.
echo 2. Esperando 5 segundos para que el servidor inicie...
timeout /t 5 /nobreak > nul
echo.
echo 3. Abriendo la aplicacion en el navegador...
start http://localhost:5173
echo.
echo 4. Esperando 3 segundos mas...
timeout /t 3 /nobreak > nul
echo.
echo 5. Abriendo directamente la pagina de agregar usuario...
start http://localhost:5173/add-user
echo.
echo ======================================
echo   INSTRUCCIONES:
echo ======================================
echo 1. Ve al navegador que se abrio
echo 2. Navega a "Ver Usuarios" 
echo 3. Haz clic en "Agregar Usuario"
echo 4. O ve directamente a: http://localhost:5173/add-user
echo.
echo Si ves una pagina 404, presiona F12 y mira la consola
echo para ver que error especifico aparece.
echo.
echo Presiona cualquier tecla para cerrar...
pause > nul
