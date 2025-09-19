import { Router } from 'express';
const router = Router();
import { index, create, store, edit, update, destroy } from '../controllers/empleadoController';

// GET /empleados - Listar empleados
router.get('/', index);

// GET /empleados/nuevo - Formulario para crear
router.get('/nuevo', create);

// POST /empleados - Crear empleado
router.post('/', store);

// GET /empleados/:id/editar - Formulario para editar
router.get('/:id/editar', edit);

// PUT /empleados/:id - Actualizar empleado
router.put('/:id', update);

// DELETE /empleados/:id - Eliminar empleado
router.delete('/:id', destroy);

export default router;