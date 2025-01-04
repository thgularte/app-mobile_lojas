import { Router } from 'express';
import ControllersCategorias from '../controllers/categorias-controllers';
// Inicializa o roteador
const router = Router();
const controllers_categorias = new ControllersCategorias
router.post('/', (req: any, res: any) => {})
router.get('/listar', (req: any, res: any) => { controllers_categorias.get_categorias(req, res)})
router.get('/:id')
router.put('/:id')
router.delete('/:id')

export default router;