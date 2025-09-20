#  Guía de instalación - Eventify

## Prerrequisitos del sistema

### Software requerido
- **Node.js** versión 16.0.0 o superior
  - [Descargar Node.js](https://nodejs.org/)
  - Verifica la instalación: `node --version`
- **npm** (incluido con Node.js)
  - Verifica la instalación: `npm --version`
- **Git** (opcional pero recomendado)
  - [Descargar Git](https://git-scm.com/)

### Verificación del entorno
```bash
# Verificar versiones instaladas
node --version    # Debería mostrar v16.x.x o superior
npm --version     # Debería mostrar 8.x.x o superior
git --version     # Opcional
```

##  Instalación desde GitHub

### Opción 1: Clonar repositorio (recomendado)
```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/eventify.git

# Entrar al directorio del proyecto
cd eventify

# Instalar dependencias
npm install

# Verificar instalación
npm run dev
```

### Opción 2: Descargar ZIP
1. Ir a la página del repositorio en GitHub
2. Hacer clic en "Code" → "Download ZIP"
3. Extraer el archivo ZIP
4. Abrir terminal en la carpeta extraída
5. Ejecutar `npm install`

##  Configuración inicial

### 1. Verificar estructura de archivos
Después de clonar, deberías tener esta estructura:
```
eventify/
├── package.json
├── app.js
├── src/
├── data/
├── public/
└── docs/
```

### 2. Instalar dependencias
```bash
# Instalación completa
npm install

# O instalar dependencias individuales si es necesario
npm install express pug method-override
npm install --save-dev nodemon
```

### 3. Verificar archivos de datos
Los archivos JSON se crearán automáticamente si no existen:
```bash
# Verificar que existan estos archivos en data/
ls data/
# Deberías ver: roles.json, areas.json, empleados.json, tareas.json, etc.
```

## 🏃 Ejecutar el proyecto

### Modo desarrollo (recomendado)
```bash
npm run dev
```
- **Puerto:** http://localhost:3000
- **Recarga automática:** Sí (con nodemon)
- **Logs detallados:** Sí

### Modo Producción
```bash
npm start
```
- **Puerto:** http://localhost:3000 (o variable PORT)
- **Recarga automática:** No
- **Optimizado para:** Servidor en producción

### Configurar puerto personalizado
```bash
# Windows
set PORT=8080 && npm start

# macOS/Linux
PORT=8080 npm start
```

##  Verificar instalación

### 1. Acceso Web
- Abrir navegador en http://localhost:3000
- Debería ver la página de inicio de Eventify
- Verificar que aparezcan los enlaces a "Gestionar Empleados" y "Gestionar Tareas"

### 2. Pruebas de funcionalidad
```bash
# En otra terminal, probar endpoints con curl
curl http://localhost:3000/api/system-info
curl http://localhost:3000/empleados
```

### 3. Verificar Logs
El servidor debería mostrar:
```
Servidor Eventify corriendo en http://localhost:3000
Entorno: development
```

##  Solución de problemas comunes

### Error: "Cannot find module 'express'"
```bash
# Solución: Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

### Error: "Port 3000 already in use"
```bash
# Opción 1: Cambiar puerto
PORT=3001 npm run dev

# Opción 2: Encontrar y terminar proceso
# Windows
netstat -ano | findstr :3000
taskkill /PID [PID] /F

# macOS/Linux
lsof -ti:3000 | xargs kill -9
```

### Error: "ENOENT: no such file or directory"
```bash
# Crear directorios faltantes
mkdir -p data public/css src/models src/controllers src/routes src/views
```

### Problemas con CSS
```bash
# Verificar que existe el archivo CSS
ls public/css/style.css

# Forzar recarga en navegador: Ctrl + F5 (Windows) o Cmd + Shift + R (Mac)
```

##  Acceso desde otros dispositivos

### Red local
```bash
# Encontrar IP local
# Windows: ipconfig
# macOS/Linux: ifconfig

# Ejecutar servidor
npm run dev

# Acceder desde otro dispositivo
# http://[TU_IP]:3000
# Ejemplo: http://192.168.1.100:3000
```

##  Actualizar el proyecto

### Actualizar desde Git
```bash
# Obtener últimos cambios
git pull origin main

# Reinstalar dependencias si cambió package.json
npm install

# Reiniciar servidor
npm run dev
```

### Actualizar dependencias
```bash
# Verificar dependencias desactualizadas
npm outdated

# Actualizar dependencias menores
npm update

# Actualizar dependencias mayores (con cuidado)
npm install express@latest
```

##  Scripts disponibles

```json
{
  "start": "node app.js",           // Producción
  "dev": "nodemon app.js",          // Desarrollo con recarga automática
  "test": "echo \"No tests specified\"" // Placeholder para tests
}
```

### Uso de scripts
```bash
npm run dev     # Desarrollo
npm start       # Producción
npm test        # Pruebas (aún no implementado)
```

##  Datos de ejemplo

El proyecto viene con datos de ejemplo preconfigurados:
- **Roles:** Administrador, Planner, Coordinador
- **Áreas:** Producción y Logística, Planificación y Finanzas
- **Eventos:** Conferencia Tech 2024, Boda Rodriguez-Perez
- **Clientes:** TechCorp SA, María Rodriguez

Estos datos se cargan automáticamente al iniciar el proyecto.

##  Consideraciones de seguridad

### Desarrollo local
- El proyecto está configurado para desarrollo local
- No usar en producción sin configuración adicional de seguridad
- Los archivos JSON no tienen encriptación

### Variables de entorno
```bash
# Crear archivo .env (opcional)
PORT=3000
NODE_ENV=development
```

##  Checklist post-instalación

- [ ] Node.js y npm instalados y verificados
- [ ] Proyecto clonado/descargado
- [ ] `npm install` ejecutado sin errores
- [ ] Servidor inicia con `npm run dev`
- [ ] Página principal accesible en http://localhost:3000
- [ ] Empleados y tareas funcionan correctamente
- [ ] CSS se carga correctamente
- [ ] No hay errores en la consola del navegador

##  Soporte

### Si encuentras problemas:
1. Verificar que cumples todos los prerrequisitos
2. Revisar la sección de solución de problemas
3. Consultar los logs del servidor en la terminal
4. Verificar la consola del navegador (F12)

### Información del sistema para soporte
```bash
# Ejecutar para obtener información del sistema
node --version
npm --version
npm list --depth=0
```

---

**Eventify instalado correctamente**

Próximos pasos: Revisar [ESTRUCTURA.md](./ESTRUCTURA.md) para entender el código y [API.md](./API.md) para conocer los endpoints disponibles.