import express, { json, urlencoded } from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import methodOverride from 'method-override';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de Pug
app.set('view engine', 'pug');
app.set('views', join(__dirname, 'src/views'));

// Middlewares
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static(join(__dirname, 'public')));
app.use(methodOverride('_method'));

// Importar rutas
import empleadoRoutes from './src/routes/empleadoRoutes.js';
import tareaRoutes from './src/routes/tareaRoutes.js';

// Usar rutas
app.use('/empleados', empleadoRoutes);
app.use('/tareas', tareaRoutes);

// Ruta básica de prueba
app.get('/', (req, res) => {
  res.render('index', { titulo: 'Eventify - Sistema de Gestión' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

export default app;
