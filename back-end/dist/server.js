import express from 'express';
import router from './routes/router';
const app = express();
// Middleware para JSON
app.use(express.json());
// Usa o roteador
app.use('/', router); // Todas as rotas começam com "/api"
// Porta do servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
