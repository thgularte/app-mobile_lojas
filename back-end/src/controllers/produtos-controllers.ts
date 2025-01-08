import { PrismaClient } from "@prisma/client";
import { Request, Response } from 'express';

const prisma = new PrismaClient() // usado para lidar com consultas no banco
export default class ControllersProdutos {

    async post_produto(req: Request, res: Response) {
        try{
            const { id_loja, nome, valor, imagem } = req.body;
            
            
            console.log('Nome:', nome);
            console.log('Valor:', valor);
            console.log('Imagem:', imagem);
        
            // Aqui você pode salvar os dados no banco
            res.status(200).json({ msg: 'Produto recebido com sucesso!' });
        }catch(error){
            console.log('Erro ao adicionar produto.', error)
            res.status(500).json({msg: 'Erro interno ao adicionar produto'})
        }
       
    }  
    
    async get_produtos(req: Request, res: Response){
        try {
            const {id_loja} = req.params
            const produto = await prisma.produtos.findMany({where: {id_loja: id_loja}});
            res.status(200).json({ msg: 'produtos encontradas', dados: produto });
          } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            res.status(500).json({ msg: 'Erro interno do servidor'});
          }
    }

    async get_id_produto(req: Request, res: Response){
        console.log(res,req)
    }

    async update_loja(req: Request, res: Response){
        console.log(res,req)
    }

    async delete_loja(req: Request, res: Response){
        console.log(res,req)
    }
}