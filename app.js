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
import empleadosApiRoutes from "./src/routes/empleadoApiRoutes.js";
import tareaApiRoutes from "./src/routes/tareaApiRoutes.js";


// Usar rutas
app.use("/api/empleados", empleadosApiRoutes);
app.use("/api/tareas", tareaApiRoutes);
app.use("/empleados", empleadoRoutes);
app.use("/tareas", tareaRoutes);

// Ruta básica de prueba
app.get("/", (req, res) => {
  res.render("index", { 
    titulo: "Eventify - Sistema de Gestión de Eventos",
    mensaje: "Bienvenido al sistema de gestión integral de eventos"
  });
});