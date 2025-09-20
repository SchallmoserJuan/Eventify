import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send('Ruta de tareas funcionando');
});

export default router;