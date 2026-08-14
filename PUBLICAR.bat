@echo off
chcp 65001 >nul
cd /d "%~dp0"
set "DST=C:\Users\Felipepc\OneDrive\Documentos\GitHub\fluylab-webs"

echo.
echo   ======================================
echo    FLUYLAB 360  -  Publicar al VPS
echo   ======================================
echo.

if not exist "%DST%\Dockerfile" (
  echo   ERROR: no encuentro el repo en:
  echo   %DST%
  echo.
  pause
  exit /b 1
)

echo   [1/3] Copiando archivos...
robocopy "%~dp0" "%DST%\servicios" index.html web.html software.html marketing.html /NJH /NJS /NDL /NP >nul
robocopy "%~dp0assets" "%DST%\servicios\assets" /MIR /NJH /NJS /NDL /NP >nul
robocopy "%~dp0demos"  "%DST%\servicios\demos"  /MIR /NJH /NJS /NDL /NP >nul

echo   [2/3] Guardando cambios...
pushd "%DST%"
git add servicios
git commit -m "Actualizacion de contenido desde PUBLICAR.bat"

echo   [3/3] Subiendo a GitHub...
git push origin main
popd

echo.
echo   --------------------------------------
echo    Archivos subidos.
echo.
echo    FALTA UN PASO MANUAL:
echo    Abre EasyPanel  http://2.24.81.37:3000
echo    proyecto: pruebas_de_automatizacion
echo    app: clientes
echo    pestana FUENTE  -^>  boton Implementar
echo.
echo    (el de la pestana ENTORNO no sirve,
echo     ese no baja codigo nuevo)
echo.
echo    Luego se ve en:
echo    https://clientes.fluylab.com/servicios/
echo   --------------------------------------
echo.
pause
