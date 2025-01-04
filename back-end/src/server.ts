import express from 'express';
import cors from 'cors'; // Importando o CORS
import router from './routes/router';
import middlewares from './middleware/config_json';

export const app = express();
middlewares(app);

// Middleware para CORS (permitir requisições de origens diferentes)
app.use(cors({
  origin: '*' // Permite conexões de qualquer origem
}));
// Middleware para JSON
app.use(express.json());

// Usa o roteador
app.use('/', router); // Todas as rotas começam com "/api"

// Porta do servidor
const PORT = 3000;
app.listen(PORT,  () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
