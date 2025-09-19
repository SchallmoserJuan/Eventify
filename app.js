import express, { json, urlencoded } from 'express';
import { join } from 'path';
import methodOverride from 'method-override'; 

const app = express();
const PORT = process.env.PORT;

// Configuración de Pug
app.set('view engine', 'pug');
app.set('views', join(__dirname, 'src/views'));

// Middlewares
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.static(join(__dirname, 'public')));
app.use(methodOverride('_method')); 

// Importar rutas 
import empleadoRoutes from './src/routes/empleadoRoutes';
import tareaRoutes from './src/routes/tareaRoutes';

// Usar rutas 
app.use('/empleados', empleadoRoutes);
app.use('/tareas', tareaRoutes);

// Ruta básica de prueba
app.get('/', (req, res) => {
    res.render('index', { titulo: 'Eventify - Sistema de Gestión' });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default app;