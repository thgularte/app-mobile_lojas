import { PrismaClient } from "@prisma/client";
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import axios from 'axios'

const prisma = new PrismaClient() // usado para lidar com consultas no banco
export default class ControllersCategorias {

    async post_categoria(req: Request, res: Response) {
       
    }  
    
    async get_categorias(req: Request, res: Response){
        try {
            const categoria = await prisma.categorias.findMany();
            res.status(200).json({ msg: 'Categorias encontradas', dados: categoria });
          } catch (error) {
            console.error('Erro ao buscar categorias:', error);
            res.status(500).json({ msg: 'Erro interno do servidor'});
          }
    }

    async get_id_loja(req: Request, res: Response){
        console.log(res,req)
    }

    async update_loja(req: Request, res: Response){
        console.log(res,req)
    }

    async delete_loja(req: Request, res: Response){
        console.log(res,req)
    }
}