# Estructura del proyecto - Eventify

## Organización general

```
eventify/
├── 📄 package.json             # Dependencias y configuración del proyecto
├── 📄 package-lock.json        # Versiones exactas de dependencias
├── 📄 app.js                   # Archivo principal del servidor
├── 📄 .gitignore               # Archivos a ignorar en Git
├── 📄 README.md                # Documentación principal
│
├── 📁 src/                     # Código fuente principal
│   ├── 📁 controllers/         # Lógica de negocio
│   ├── 📁 models/              # Modelos de datos
│   ├── 📁 routes/              # Definición de rutas
│   ├── 📁 views/               # Plantillas Pug
│   ├── 📁 middleware/          # Middleware personalizado
│   └── 📁 utils/               # Utilidades y helpers
│
├── 📁 data/                    # Base de datos JSON
├── 📁 public/                  # Archivos estáticos
│   └── 📁 css/                 # Hojas de estilo
├── 📁 docs/                    # Documentación del proyecto
└── 📁 node_modules/            # Dependencias (no versionado)
```

---

## Arquitectura MVC

### **M**odel - **V**iew - **C**ontroller

```
┌─────────────────────────────────────────┐
│                CLIENTE                  │
│         (Navegador/Thunder)             │
└─────────────┬───────────────────────────┘
              │ HTTP Request
              ▼
┌─────────────────────────────────────────┐
│             ROUTES                      │
│        (empleadoRoutes.js)              │
│     Define URLs y métodos HTTP          │
└─────────────┬───────────────────────────┘
              │ req, res
              ▼
┌─────────────────────────────────────────┐
│           CONTROLLER                    │
│      (empleadoController.js)            │
│    Lógica de negocio y coordinación     │
└─────────────┬───┬───────────────────────┘
              │   │
              │   │ Datos para vista
              │   ▼
              │ ┌─────────────────────────┐
              │ │         VIEW            │
              │ │    (empleados/*.pug)    │
              │ │   Presentación HTML     │
              │ └─────────────────────────┘
              │
              │ Operaciones de datos
              ▼
┌─────────────────────────────────────────┐
│             MODEL                       │
│        (Empleado.js)                    │
│   Manejo de datos y lógica de entidad   │
└─────────────┬───────────────────────────┘
              │ FileManager
              ▼
┌─────────────────────────────────────────┐
│         DATA LAYER                      │
│     (empleados.json, tareas.json)       │
│        Almacenamiento de datos          │
└─────────────────────────────────────────┘
```

---

## Descripción detallada de carpetas

### **app.js** - Servidor principal
```javascript
// Responsabilidades:
- Configuración de Express
- Definición de middlewares
- Conexión de rutas principales
- Manejo global de errores
- Configuración de vistas (Pug)
- Inicio del servidor

// Flujo de middlewares (orden importante):
1. express.json()           // Parsear JSON
2. express.urlencoded()     // Parsear form data  
3. express.static()         // Archivos estáticos
4. methodOverride()         // PUT/DELETE en forms
5. Middleware personalizado // Logging
6. Rutas de la aplicación   // /empleados, /tareas
7. Error handling           // Captura errores
8. 404 handler              // Rutas no encontradas
```

### **src/** - Código fuente

#### **src/models/** - Capa de datos
```javascript
// Empleado.js - Ejemplo de modelo
class Empleado {
    // Constructor - Crear instancias
    constructor(id, nombre, email, rolId, areaId) { ... }
    
    // Métodos estáticos - Operaciones CRUD
    static async getAll()           // SELECT * FROM empleados
    static async getById(id)        // SELECT * WHERE id = ?
    static async create(data)       // INSERT INTO empleados
    static async update(id, data)   // UPDATE empleados SET ... WHERE id = ?
    static async delete(id)         // DELETE FROM empleados WHERE id = ?
    
    // Métodos de instancia - Operaciones específicas
    async save()                    // Guardar cambios
    async validate()                // Validar datos
}

// ¿Por qué métodos estáticos?
// No necesitas crear una instancia para buscar todos los empleados
// Empleado.getAll() vs new Empleado().getAll()
```

#### **src/controllers/** - Lógica de negocio
```javascript
// empleadoController.js - Ejemplo de controlador
const empleadoController = {
    // GET /empleados
    async index(req, res) {
        // 1. Obtener datos del modelo
        // 2. Procesar/filtrar si es necesario
        // 3. Renderizar vista con los datos
    },
    
    // GET /empleados/nuevo
    async create(req, res) {
        // 1. Cargar datos necesarios (roles, áreas)
        // 2. Renderizar formulario vacío
    },
    
    // POST /empleados  
    async store(req, res) {
        // 1. Validar datos del request
        // 2. Crear empleado usando el modelo
        // 3. Redirigir o mostrar error
    },
    
    // Patrón: Un método por acción HTTP
    // index = listar, create = mostrar form, store = procesar form
    // edit = mostrar form edición, update = procesar edición
    // destroy = eliminar
};

// ¿Por qué separar del modelo?
// El modelo solo maneja datos
// El controlador maneja lógica de la aplicación
```

#### **src/routes/** - Definición de URLs
```javascript
// empleadoRoutes.js - Ejemplo de rutas
const router = express.Router();

// Rutas que devuelven HTML (vistas)
router.get('/', empleadoController.index);           // Lista
router.get('/nuevo', empleadoController.create);     // Formulario crear
router.get('/:id/editar', empleadoController.edit);  // Formulario editar

// Rutas que procesan datos
router.post('/', empleadoController.store);          // Crear empleado
router.put('/:id', empleadoController.update);       // Actualizar empleado
router.delete('/:id', empleadoController.destroy);   // Eliminar empleado

// Patrón RESTful:
// GET    /empleados            → index (listar todos)
// GET    /empleados/nuevo      → create (formulario crear)
// POST   /empleados            → store (procesar creación)
// GET    /empleados/:id        → show (mostrar uno)
// GET    /empleados/:id/editar → edit (formulario editar)
// PUT    /empleados/:id        → update (procesar edición)
// DELETE /empleados/:id        → destroy (eliminar)
```

#### **src/views/** - Plantillas de presentación
```pug
// layout.pug - Plantilla base
doctype html
html
  head
    title= titulo
    link(rel='stylesheet', href='/css/style.css')
  body
    nav
      h1 Eventify
    main
      block content    // ← Aquí se inserta contenido específico
    footer
      p © 2024 Eventify

// empleados/index.pug - Vista específica
extends ../layout     // ← Hereda de layout.pug

block content        // ← Define qué va en el block content
  h2 Lista de Empleados
  each empleado in empleados
    p= empleado.nombre

// ¿Por qué Pug vs HTML?
// - Menos código (no tags de cierre)
// - Variables dinámicas: = empleado.nombre
// - Herencia: extends layout
// - Lógica: if, each, etc.
```

#### **src/utils/** - Utilidades compartidas
```javascript
// fileManager.js - Gestor de archivos
class FileManager {
    // Singleton - Una sola instancia en toda la app
    constructor() {
        this.dataPath = path.join(__dirname, '../../data');
    }
    
    // Operaciones de archivo reutilizables
    async readJSON(filename) {
        // 1. Intentar leer archivo
        // 2. Si no existe, crear vacío
        // 3. Si está corrupto, manejar error
        // 4. Devolver datos parseados
    }
    
    async writeJSON(filename, data) {
        // 1. Convertir objeto a JSON string
        // 2. Escribir archivo
        // 3. Manejar errores de permisos/espacio
        // 4. Confirmar escritura exitosa
    }
    
    // ¿Por qué una clase utilitaria?
    // Evita repetir código en cada modelo
    // Centraliza manejo de errores de archivos
    // Fácil de testear y mantener
}

module.exports = new FileManager(); // ← Exportar instancia única
```

#### **src/middleware/** - Lógica intermedia
```javascript
// authMiddleware.js - Ejemplo (no implementado aún)
const authMiddleware = (req, res, next) => {
    // 1. Verificar si usuario está logueado
    // 2. Si no, redirigir a login
    // 3. Si sí, continuar con next()
    
    if (req.session && req.session.userId) {
        next(); // Continuar al siguiente middleware/controller
    } else {
        res.redirect('/login');
    }
};

// validationMiddleware.js - Validación de datos
const validateEmpleado = (req, res, next) => {
    const { nombre, email } = req.body;
    
    if (!nombre || nombre.length < 2) {
        return res.status(400).json({ error: 'Nombre muy corto' });
    }
    
    if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'Email inválido' });
    }
    
    next(); // Validación pasada, continuar
};

// ¿Por qué middleware?
// Reutilizable en múltiples rutas
// Separar validación de lógica de negocio  
// Ejecución en cadena: auth → validation → controller
```

---

## **data/** - Base de datos JSON

```json
// empleados.json - Estructura de datos
[
  {
    "id": 1,
    "nombre": "Juan Pérez",
    "email": "juan@eventify.com", 
    "rolId": 2,                    // ← Relación con roles.json
    "areaId": 1,                   // ← Relación con areas.json
    "fechaIngreso": "2024-01-15T00:00:00.000Z"
  }
]

// tareas.json - Relaciones múltiples
[
  {
    "id": 1,
    "titulo": "Coordinar catering",
    "empleadoId": 1,               // ← FK a empleados.json
    "eventoId": 2,                 // ← FK a eventos.json
    "estado": "pendiente",         // ← Enum: pendiente|en proceso|finalizada
    "prioridad": "alta"            // ← Enum: alta|media|baja
  }
]

// ¿Por qué JSON en lugar de base de datos real?
// Ventajas:
// - Fácil de entender para aprender
// - No requiere instalación de DB
// - Versionable en Git
// - Rápido para prototipos

// Desventajas:
// - No es escalable
// - Sin transacciones
// - Sin índices/optimización
// - Fácil corrupción
```

---

## **public/** - Recursos estáticos

```css
/* public/css/style.css - Organización de estilos */

/* 1. Variables globales */
:root {
    --primary-color: #007bff;
    --success-color: #28a745;
    /* ... más variables */
}

/* 2. Reset y base */
* { box-sizing: border-box; }
body { font-family: var(--font-family); }

/* 3. Componentes reutilizables */
.btn { /* estilos de botones */ }
.card { /* estilos de tarjetas */ }

/* 4. Layout específico */
.dashboard-grid { /* grid del dashboard */ }
.tarea-card { /* tarjetas de tareas */ }

/* 5. Estados y modificadores */
.btn-primary { background: var(--primary-color); }
.tarea-card.prioridad-alta { border-left: 4px solid red; }

/* 6. Responsive */
@media (max-width: 768px) {
    .dashboard-grid { grid-template-columns: 1fr; }
}

/* ¿Por qué esta organización?
 * 1. Variables facilitan cambios globales
 * 2. Componentes reutilizables evitan duplicación
 * 3. Modificadores permiten variaciones
 * 4. Mobile-first responsive design
 */
```

---

## Flujo de datos completo

### **Ejemplo: crear un empleado**

```
1. USUARIO: Hace click en "Nuevo empleado"
   ↓
2. BROWSER: GET /empleados/nuevo
   ↓
3. ROUTER: empleadoRoutes.js recibe la petición
   ↓ 
4. CONTROLLER: empleadoController.create()
   ├─ Carga roles desde modelo: fileManager.readJSON('roles.json')
   ├─ Carga áreas desde modelo: fileManager.readJSON('areas.json') 
   └─ Renderiza vista: res.render('empleados/form', { roles, areas })
   ↓
5. VIEW: empleados/form.pug genera HTML con formulario
   ↓
6. BROWSER: Muestra formulario al usuario
   ↓
7. USUARIO: Llena formulario y hace submit
   ↓
8. BROWSER: POST /empleados con form data
   ↓
9. MIDDLEWARE: 
   ├─ express.urlencoded() parsea form data
   ├─ validationMiddleware verifica datos (si existe)
   └─ Pasa control al controller
   ↓
10. CONTROLLER: empleadoController.store()
    ├─ Valida datos del req.body
    ├─ Llama al modelo: Empleado.create(req.body)
    └─ Redirige: res.redirect('/empleados')
    ↓
11. MODEL: Empleado.create()
    ├─ Lee empleados existentes: fileManager.readJSON()
    ├─ Genera nuevo ID
    ├─ Crea instancia: new Empleado(...)
    ├─ Agrega a array
    └─ Guarda archivo: fileManager.writeJSON()
    ↓
12. REDIRECT: Browser hace GET /empleados
    ↓
13. CONTROLLER: empleadoController.index()
    ├─ Carga empleados: Empleado.getAll()
    ├─ Carga datos relacionados: roles, áreas
    └─ Renderiza: res.render('empleados/index', { empleados })
    ↓
14. VIEW: empleados/index.pug muestra lista actualizada
    ↓
15. BROWSER: Usuario ve el nuevo empleado en la lista ✅
```

---

## Patrones de diseño utilizados

### **1. MVC (Model-View-Controller)**
```
Separación de responsabilidades:
- Model: ¿Qué datos tengo?
- View: ¿Cómo los muestro?  
- Controller: ¿Qué hago con ellos?
```

### **2. Singleton (FileManager)**
```javascript
// Una sola instancia en toda la aplicación
module.exports = new FileManager();

// ¿Por qué?
// - Evita múltiples conexiones a archivos
// - Configuración centralizada
// - Menos uso de memoria
```

### **3. Factory Pattern (en modelos)**
```javascript
class Empleado {
    static async create(data) {
        // Factory: crea instancias de manera controlada
        const nuevoId = await this.getNextId();
        return new Empleado(nuevoId, data.nombre, data.email);
    }
}
```

### **4. Repository Pattern (modelos como repositorios)**
```javascript
// El modelo actúa como repositorio de datos
class Empleado {
    static async getAll()       // findAll()
    static async getById(id)    // findById()
    static async create(data)   // save()
    static async delete(id)     // remove()
}
```

### **5. Middleware Pattern (Express)**
```javascript
// Cadena de procesamiento
app.use(middleware1);
app.use(middleware2); 
app.use(middleware3);

// Cada middleware puede:
// - Procesar request
// - Modificar response
// - Llamar next() o terminar cadena
```

---

## Escalabilidad y mejoras futuras

### **Preparado para MongoDB (v2.0)**
```javascript
// La estructura actual se adapta fácilmente:

// models/Empleado.js - Version JSON actual
static async getAll() {
    return await fileManager.readJSON('empleados.json');
}

// models/Empleado.js - Version MongoDB futura  
static async getAll() {
    return await EmpleadoSchema.find({});
}

// ¡Los controladores no cambian!
```

### **Preparado para API REST**
```javascript
// Controladores actuales retornan vistas HTML
async index(req, res) {
    const empleados = await Empleado.getAll();
    res.render('empleados/index', { empleados });
}

// Versión API: detectar Accept header
async index(req, res) {
    const empleados = await Empleado.getAll();
    
    if (req.accepts('json')) {
        res.json(empleados);           // Para API
    } else {
        res.render('empleados/index', { empleados }); // Para web
    }
}
```

### **Preparado para autenticación**
```javascript
// Solo agregar middleware a las rutas:
router.get('/', authMiddleware, empleadoController.index);
router.post('/', authMiddleware, validateMiddleware, empleadoController.store);
```

---

## Testing y Debugging

### **Estructura de Testing (futura)**
```
tests/
├── unit/
│   ├── models/
│   │   ├── Empleado.test.js
│   │   └── Tarea.test.js
│   ├── utils/
│   │   └── fileManager.test.js
│   └── controllers/
├── integration/
│   ├── empleados.test.js
│   └── tareas.test.js
└── e2e/
    └── workflows.test.js
```

### **Debugging Tips**
```javascript
// 1. Logs en cada capa
console.log('CONTROLLER: Creando empleado', req.body);
console.log('MODEL: Empleados antes de crear', empleados.length);
console.log('FILEMANAGER: Escribiendo archivo', filename);

// 2. Try-catch completo
try {
    const empleado = await Empleado.create(data);
    console.log('✅ Empleado creado:', empleado.id);
} catch (error) {
    console.error('❌ Error creando empleado:', error.message);
    console.error('Stack:', error.stack);
}

// 3. Validación de datos
if (!data.nombre) {
    throw new Error('Nombre es requerido');
}
```

---

## Convenciones de código

### **Nomenclatura**
```javascript
// Archivos: camelCase
empleadoController.js
fileManager.js

// Clases: PascalCase  
class Empleado { }
class FileManager { }

// Variables y funciones: camelCase
const nuevoEmpleado = { };
async function crearEmpleado() { }

// Constantes: UPPER_SNAKE_CASE
const MAX_EMPLEADOS = 100;
const DEFAULT_ROLE = 'coordinador';

// URLs: kebab-case
GET /empleados/nuevo-empleado
GET /tareas/alta-prioridad
```

### **Estructura de archivos**
```javascript
// Orden estándar en archivos:
// 1. Imports
const express = require('express');
const Empleado = require('../models/Empleado');

// 2. Configuración/constantes
const router = express.Router();

// 3. Funciones/métodos (orden lógico)
// 4. Exports
module.exports = router;
```

### **Comentarios útiles**
```javascript
// BUENOS comentarios
/**
 * Crea un nuevo empleado con validaciones
 * @param {Object} datos - Datos del empleado
 * @param {string} datos.nombre - Nombre completo
 * @returns {Promise<Empleado>} Empleado creado
 */
static async create(datos) { }

// MALOS comentarios  
// Incrementa i en 1
i++;
```

---

## Conclusión de arquitectura

### **Ventajas de esta estructura**
- **Mantenible:** Cada archivo tiene una responsabilidad clara
- **Escalable:** Fácil agregar nuevas funcionalidades
- **Testeable:** Cada capa se puede probar independientemente  
- **Reutilizable:** Componentes como FileManager se usan en toda la app
- **Profesional:** Sigue estándares de la industria

### **Lo que aprendiste**
- Patrón MVC en aplicaciones web
- Organización profesional de código Node.js
- Manejo de datos con JSON como BD transitoria
- Sistema de vistas con plantillas Pug
- Middleware y flujo de peticiones HTTP
- Preparación para migración a BD real

### **Próximos pasos**
- Migrar a MongoDB manteniendo la misma estructura
- Agregar tests unitarios y de integración
- Implementar autenticación y autorización
- Crear API REST completa
- Deploy a producción

---

**Arquitectura sólida y profesional** 

Esta estructura te permitirá crecer desde un proyecto de aprendizaje hasta una aplicación enterprise-ready.