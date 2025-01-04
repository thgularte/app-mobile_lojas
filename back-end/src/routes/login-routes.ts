import { Router } from 'express';
import ControllersLogin from '../controllers/login-controllers';

// Inicializa o roteador
const router = Router();
const controllers_login = new ControllersLogin
router.post('/', (req,res) => {controllers_login.login(req,res)})

export default router;
