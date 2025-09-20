#  Eventify - Sistema de Gestión de Eventos

Sistema de gestión integral para empresas de eventos, desarrollado con Node.js, Express y almacenamiento en JSON.

##  Descripción del Proyecto

Eventify es un sistema backend para la gestión de eventos corporativos y sociales. Permite centralizar la información de empleados, tareas, clientes y proveedores en una plataforma unificada.

### Empresa: Organización de Eventos
- **Servicios**: Planificación y ejecución de eventos corporativos y sociales
- **Alcance**: Desde pequeñas reuniones hasta conferencias a gran escala
- **Gestión**: Proveedores, sedes, catering, cronogramas e invitados

### Problemas que Resuelve
- Coordinación ineficiente de equipos y proveedores
- Múltiples herramientas sin centralización
- Gestión manual de presupuestos y cronogramas
- Control de acceso deficiente en eventos

##  Funcionalidades Actuales

### Implementado (Primera Entrega)
- **CRUD de Empleados**: Gestión completa del personal
- **CRUD de Tareas**: Organización por áreas con filtros avanzados
- **Sistema de Roles**: Administrador, Planner, Coordinador
- **Áreas de Trabajo**: Producción, Finanzas, Atención al Cliente
- **Filtros Avanzados**: Por estado, prioridad, empleado, evento

### Próximamente (Segunda Entrega)
- Migración a MongoDB
- Dashboard con estadísticas
- Sistema de reportes
- API REST completa

## Tecnologías Utilizadas

- **Backend**: Node.js + Express
- **Vistas**: Pug (motor de plantillas)
- **Base de Datos**: JSON (primera entrega)
- **Estilos**: CSS3 con variables nativas
- **Control de Versiones**: Git + GitHub

## Estructura del Proyecto
```
eventify/
├── src/
│   ├── controllers/    # Lógica de negocio
│   ├── models/         # Modelos de datos
│   ├── routes/         # Definición de rutas
│   ├── views/          # Plantillas Pug
│   ├── middleware/     # Middleware personalizado
│   └── utils/          # Utilidades (FileManager)
├── data/               # Archivos JSON (BD)
├── public/             # Archivos estáticos
├── docs/               # Documentación
└── app.js              # Archivo principal
```
