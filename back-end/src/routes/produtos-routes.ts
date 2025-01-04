import { Router } from 'express';
import ControllersProdutos from '../controllers/produtos-controllers';

// Inicializa o roteador
const router = Router();
const controllers_produtos = new ControllersProdutos
router.post('/', () => {(req: any,res:any) => {controllers_produtos.post_produto(req,res)}})
router.get('/listar/:id_loja', (req,res) => {controllers_produtos.get_produtos(req,res)})
router.get('/:id')
router.put('/:id')
router.delete('/:id')

export default router;