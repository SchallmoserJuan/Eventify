import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import methodOverride from "method-override";

// Recrear __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de Pug
app.set("view engine", "pug");
app.set("views", join(__dirname, "src/views"));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "public")));
app.use(methodOverride("_method"));

// Middleware personalizado para logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Importar rutas
import empleadoRoutes from "./src/routes/empleadoRoutes.js";
import tareaRoutes from "./src/routes/tareaRoutes.js";

// Usar rutas
app.use("/empleados", empleadoRoutes);
app.use("/tareas", tareaRoutes);

// Ruta básica de prueba
app.get("/", (req, res) => {
  res.render("index", { 
    titulo: "Eventify - Sistema de Gestión de Eventos",
    mensaje: "Bienvenido al sistema de gestión integral de eventos"
  });
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('¡Algo salió mal!');
});

// Middleware para rutas no encontradas
app.use((req, res) => {
    res.status(404).render('error', { 
        titulo: 'Página no encontrada',
        mensaje: 'La página que buscas no existe'
    });
});

app.listen(PORT, () => {
  console.log(` Servidor Eventify corriendo en http://localhost:${PORT}`);
});

export default app;