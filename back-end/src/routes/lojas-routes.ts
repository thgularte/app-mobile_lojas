import { Router } from 'express';
import ControllersLojas from '../controllers/lojas-controllers';
import upload from '../multer/multer';

// Inicializa o roteador
const router = Router();
const lojas_controllers = new ControllersLojas

router.post('/', upload.single('logo'), (req: any,res: any) => {lojas_controllers.post_loja(req,res)})
router.get('/listar', (req: any,res: any) => {lojas_controllers.get_lojas(req,res)})
router.get('/:id', (req: any,res: any) => {lojas_controllers.get_id_loja(req,res)})
router.put('/:id', (req: any,res: any) => {lojas_controllers.get_id_loja(req,res)})
router.delete('/:id', (req: any,res: any) => {lojas_controllers.get_id_loja(req,res)})

export default router;
