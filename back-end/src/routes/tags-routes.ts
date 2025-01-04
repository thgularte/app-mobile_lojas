import { Router } from 'express';

// Inicializa o roteador
const router = Router();

router.post('/', () => {})
router.get('/listar')
router.get('/:id')
router.put('/:id')
router.delete('/:id')

export default router;