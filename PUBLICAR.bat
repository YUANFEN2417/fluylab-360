@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo   ====================================
echo    FLUYLAB 360  -  Publicar cambios
echo   ====================================
echo.
echo   Subiendo archivos nuevos...
echo.
git add -A
git commit -m "Actualizacion de contenido (fotos/videos)"
git push origin main
echo.
echo   ------------------------------------
echo    Listo. En 1-2 minutos se ve en:
echo    https://yuanfen2417.github.io/fluylab-360/
echo   ------------------------------------
echo.
pause
