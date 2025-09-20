# Documentación de la API - Eventify

## Información general

- **URL Base:** `http://localhost:3000`
- **Formato de respuesta:** JSON
- **Autenticación:** No implementada (versión 1.0)
- **Versionado:** v1.0 (Primera entrega)

## Endpoints generales

### Información del sistema
```http
GET /api/system-info
```
Devuelve información técnica del servidor.

**Respuesta de ejemplo:**
```json
{
  "nodeVersion": "v18.17.0",
  "platform": "win32",
  "uptime": 3600.123,
  "memory": {
    "rss": 45678912,
    "heapTotal": 8654848,
    "heapUsed": 5234567
  },
  "projectStructure": {
    "models": "Manejo de datos",
    "controllers": "Lógica de negocio",
    "routes": "Definición de endpoints",
    "views": "Plantillas Pug",
    "utils": "Utilidades como FileManager"
  }
}
```

### Test de FileManager
```http
GET /api/test-filemanager
```
Prueba que FileManager funcione correctamente.

**Respuesta de ejemplo:**
```json
{
  "message": "FileManager funcionando correctamente",
  "data": [
    {
      "id": 1,
      "nombre": "administrador",
      "descripcion": "Acceso completo al sistema"
    }
  ],
  "timestamp": "2024-06-15T10:30:00.000Z"
}
```

---

## API de empleados

### Listar empleados
```http
GET /empleados
```
Obtiene la lista completa de empleados con información de roles y áreas.

**Headers de respuesta HTML:**
- `Content-Type: text/html` (vista Pug)

**Respuesta:** Vista HTML renderizada con tabla de empleados.

---

### Obtener empleado por ID
```http
GET /empleados/:id
```

**Parámetros de URL:**
- `id` (number): ID único del empleado

**Respuesta de ejemplo:**
```json
{
  "id": 1,
  "nombre": "Juan Pérez",
  "email": "juan.perez@eventify.com",
  "rolId": 2,
  "areaId": 1,
  "fechaIngreso": "2024-01-15T00:00:00.000Z"
}
```

**Códigos de estado:**
- `200`: Empleado encontrado
- `404`: Empleado no encontrado

---

### Crear empleado
```http
POST /empleados
```

**Headers requeridos:**
- `Content-Type: application/x-www-form-urlencoded` (desde formulario)
- `Content-Type: application/json` (desde API)

**Body (JSON):**
```json
{
  "nombre": "Ana García",
  "email": "ana.garcia@eventify.com",
  "rolId": 2,
  "areaId": 1
}
```

**Body (Form Data):**
```
nombre=Ana García
email=ana.garcia@eventify.com
rolId=2
areaId=1
```

**Validaciones:**
- `nombre`: Requerido, string, min 2 caracteres
- `email`: Requerido, formato email válido
- `rolId`: Requerido, number, debe existir en roles.json
- `areaId`: Requerido, number, debe existir en areas.json

**Respuesta exitosa (201):**
```json
{
  "id": 5,
  "nombre": "Ana García",
  "email": "ana.garcia@eventify.com",
  "rolId": 2,
  "areaId": 1,
  "fechaIngreso": "2024-06-15T10:30:00.000Z"
}
```

**Respuesta de error (400):**
```json
{
  "error": "Datos inválidos",
  "details": {
    "email": "Formato de email inválido"
  }
}
```

---

### Actualizar empleado
```http
PUT /empleados/:id
```

**Parámetros de URL:**
- `id` (number): ID del empleado a actualizar

**Body (mismo formato que POST):**
```json
{
  "nombre": "Juan Pérez Actualizado",
  "email": "juan.nuevo@eventify.com",
  "rolId": 1,
  "areaId": 2
}
```

**Respuesta exitosa (200):**
```json
{
  "id": 1,
  "nombre": "Juan Pérez Actualizado",
  "email": "juan.nuevo@eventify.com",
  "rolId": 1,
  "areaId": 2,
  "fechaIngreso": "2024-01-15T00:00:00.000Z"
}
```

**Códigos de estado:**
- `200`: Actualización exitosa
- `404`: Empleado no encontrado
- `400`: Datos inválidos

---

### Eliminar empleado
```http
DELETE /empleados/:id
```

**Parámetros de URL:**
- `id` (number): ID del empleado a eliminar

**Respuesta exitosa (200):**
```json
{
  "message": "Empleado eliminado correctamente",
  "id": 1
}
```

**Códigos de estado:**
- `200`: Eliminación exitosa
- `404`: Empleado no encontrado

---

## API de tareas

### Listar tareas
```http
GET /tareas
```
Obtiene todas las tareas sin filtros.

**Respuesta:** Vista HTML renderizada con grid de tareas.

---

### Listar tareas con filtros
```http
GET /tareas?estado=pendiente&prioridad=alta&empleadoId=1&eventoId=2
```

**Query parameters (opcionales):**
- `estado` (string): `pendiente`, `en proceso`, `finalizada`
- `prioridad` (string): `alta`, `media`, `baja`
- `empleadoId` (number): ID del empleado asignado
- `eventoId` (number): ID del evento relacionado

**Ejemplos de filtros:**
```http
GET /tareas?estado=pendiente
GET /tareas?prioridad=alta&estado=en%20proceso
GET /tareas?empleadoId=1
GET /tareas?eventoId=2&prioridad=media
```

---

### Obtener tarea por ID
```http
GET /tareas/:id
```

**Respuesta de ejemplo:**
```json
{
  "id": 1,
  "titulo": "Coordinar catering evento",
  "descripcion": "Contactar proveedores y confirmar menú",
  "estado": "pendiente",
  "prioridad": "alta",
  "fechaInicio": "2024-06-01",
  "fechaFin": "2024-06-05",
  "empleadoId": 1,
  "eventoId": 2,
  "horasEstimadas": 12,
  "horasReales": 0,
  "fechaCreacion": "2024-05-15T09:00:00.000Z"
}
```

---

### Crear tarea
```http
POST /tareas
```

**Body (JSON):**
```json
{
  "titulo": "Nueva tarea de coordinación",
  "descripcion": "Descripción detallada de la tarea",
  "prioridad": "alta",
  "fechaInicio": "2024-06-01",
  "fechaFin": "2024-06-05",
  "empleadoId": 1,
  "eventoId": 2,
  "horasEstimadas": 8,
  "estado": "pendiente"
}
```

**Validaciones:**
- `titulo`: Requerido, string, min 3 caracteres
- `descripcion`: Requerido, string
- `prioridad`: Requerido, enum: `alta`, `media`, `baja`
- `fechaInicio`: Requerido, formato ISO date
- `fechaFin`: Requerido, formato ISO date, debe ser >= fechaInicio
- `empleadoId`: Requerido, number, debe existir
- `eventoId`: Requerido, number, debe existir
- `horasEstimadas`: Requerido, number, > 0
- `estado`: Opcional, default `pendiente`

**Respuesta exitosa (201):**
```json
{
  "id": 15,
  "titulo": "Nueva tarea de coordinación",
  "descripcion": "Descripción detallada de la tarea",
  "estado": "pendiente",
  "prioridad": "alta",
  "fechaInicio": "2024-06-01",
  "fechaFin": "2024-06-05",
  "empleadoId": 1,
  "eventoId": 2,
  "horasEstimadas": 8,
  "horasReales": 0,
  "fechaCreacion": "2024-06-15T10:30:00.000Z"
}
```

---

### Actualizar tarea
```http
PUT /tareas/:id
```

**Body (mismo formato que POST, todos los campos opcionales):**
```json
{
  "titulo": "Tarea actualizada",
  "estado": "en proceso",
  "horasReales": 4
}
```

**Respuesta exitosa (200):**
```json
{
  "id": 1,
  "titulo": "Tarea actualizada",
  "estado": "en proceso",
  "horasReales": 4,
  // ... resto de propiedades
}
```

---

### Eliminar tarea
```http
DELETE /tareas/:id
```

**Respuesta exitosa (200):**
```json
{
  "message": "Tarea eliminada correctamente",
  "id": 1
}
```

---

## Datos de referencia

### Roles disponibles
```http
GET /api/roles
```

**Respuesta:**
```json
[
  {
    "id": 1,
    "nombre": "administrador",
    "descripcion": "Acceso completo al sistema",
    "permisos": ["crear", "leer", "actualizar", "eliminar"]
  },
  {
    "id": 2,
    "nombre": "planner",
    "descripcion": "Planificador de eventos",
    "permisos": ["crear", "leer", "actualizar"]
  },
  {
    "id": 3,
    "nombre": "coordinador",
    "descripcion": "Coordinador de tareas",
    "permisos": ["leer", "actualizar"]
  }
]
```

### Áreas disponibles
```http
GET /api/areas
```

**Respuesta:**
```json
[
  {
    "id": 1,
    "nombre": "Producción y Logística",
    "descripcion": "Coordinación con proveedores, montaje, verificación técnica",
    "color": "#FF6B6B"
  },
  {
    "id": 2,
    "nombre": "Planificación y Finanzas",
    "descripcion": "Control de presupuesto, contratos, cronogramas",
    "color": "#4ECDC4"
  }
]
```

---

## Códigos de estado HTTP

### Exitosos (2xx)
- `200 OK`: Solicitud exitosa
- `201 Created`: Recurso creado exitosamente

### Errores del cliente (4xx)
- `400 Bad Request`: Datos inválidos o malformados
- `404 Not Found`: Recurso no encontrado
- `422 Unprocessable Entity`: Datos válidos pero reglas de negocio no cumplidas

### Errores del servidor (5xx)
- `500 Internal Server Error`: Error interno del servidor

---

## Ejemplos de uso con Thunder Client

### Crear empleado
```json
POST http://localhost:3000/empleados
Content-Type: application/json

{
  "nombre": "María López",
  "email": "maria.lopez@eventify.com",
  "rolId": 2,
  "areaId": 1
}
```

### Filtrar tareas
```http
GET http://localhost:3000/tareas?estado=pendiente&prioridad=alta
```

### Actualizar estado de tarea
```json
PUT http://localhost:3000/tareas/1
Content-Type: application/json

{
  "estado": "finalizada",
  "horasReales": 10
}
```

---

## Flujo de datos

### Creación de tarea completa
1. **GET /empleados** - Obtener lista de empleados
2. **GET /api/eventos** - Obtener lista de eventos
3. **POST /tareas** - Crear tarea con empleadoId y eventoId
4. **GET /tareas** - Verificar que se creó correctamente

### Filtrado avanzado
1. **GET /tareas** - Ver todas las tareas
2. **GET /tareas?estado=pendiente** - Filtrar por estado
3. **GET /tareas?estado=pendiente&empleadoId=1** - Combinar filtros
4. **PUT /tareas/:id** - Actualizar estado a "en proceso"

---

## Limitaciones actuales

### Primera entrega (v1.0)
- **Autenticación:** No implementada
- **Validación:** Básica, solo campos requeridos
- **Paginación:** No implementada
- **Rate limiting:** No implementado
- **Logs de auditoría:** No implementados

### Próxima entrega (v2.0)
- Migración a MongoDB
- API REST completa con JSON responses
- Sistema de autenticación
- Validaciones avanzadas
- Paginación y ordenamiento

---

## Testing

### Postman Collection
Se puede importar una colección completa con todos los endpoints:

```json
{
  "info": {
    "name": "Eventify API v1.0",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Empleados",
      "item": [
        {
          "name": "Listar Empleados",
          "request": {
            "method": "GET",
            "url": "{{baseUrl}}/empleados"
          }
        }
      ]
    }
  ],
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:3000"
    }
  ]
}
```

---

**API Documentation v1.0**

Para más información técnica, consultar [ESTRUCTURA.md](./ESTRUCTURA.md)