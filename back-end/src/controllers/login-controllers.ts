import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"; // Biblioteca para encriptar e comparar senhas

const prisma = new PrismaClient(); // Conexão com o banco de dados

export default class ControllersLogin {
  async login(req: any, res: any) {
    try {
        const { email, senha } = req.body;
        console.log('DADOS =-=- ', email,senha)
        // 1. Verificar se o email existe no banco de dados
        const loja = await prisma.lojas.findFirst({ //nao deveria ser first, mas como email nao esta como unico vou deixar assim
        where: { email }, 
        });

        if (!loja) {
        // Caso o email não exista
        return res.status(404).json({ code: 404, msg: "Email ou senha incorretos." });
        }

        // 2. Verificar se a senha está correta
        const senhaCorreta = await bcrypt.compare(senha, loja.senha); // Compara a senha enviada com a armazenada

        if (!senhaCorreta) {
        // Caso a senha esteja errada
        return res.status(401).json({ code: 401, msg: "Email ou senha incorretos." });
        }

        // 3. Login bem-sucedido
        return res.status(200).json({
        code: 200,
        msg: "Login realizado com sucesso!",
        loja: loja,
        });
        } catch (error) {
        console.error("Erro no login:", error);
        return res.status(500).json({ code: 500, msg: "Erro interno no servidor." });
        }
  }
}
