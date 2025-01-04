import { Router } from 'express';
import lojas_routes from './lojas-routes'
import categorias_routes from './categorias-routes'
import tags_routes from './tags-routes'
import posicoes_routes from './posicoes-routes'
import produtos_routes from './produtos-routes'
import lojasTags_routes from './lojasTags-routes'
import login_routes from './login-routes'

// Inicializa o roteador
const router = Router();
router.use('/login', login_routes)
router.use('/lojas', lojas_routes)
router.use('/posicoes', posicoes_routes)
router.use('/categorias', categorias_routes)
router.use('/tags', tags_routes)
router.use('/produtos', produtos_routes)
router.use('/lojasTags', lojasTags_routes)

export default router;
