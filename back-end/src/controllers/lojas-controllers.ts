import { PrismaClient } from "@prisma/client";
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import axios from 'axios'

const prisma = new PrismaClient() // usado para lidar com consultas no banco
export default class ControllersLojas {

    async post_loja(req: Request, res: Response) {
        try {
            const {
                email,
                nomeEstabelecimento,
                senha,
                cep,
                rua,
                numero,
                bairro,
                estado,
                cidade,
                cnpjCpf,
                comunicacao,
                tags,
                descricao,
                categoria
            } = req.body;
    
            const logo = req.file ? req.file.buffer : null;
    
            // Verificar se o CNPJ/CPF já existe na tabela lojas
            const lojaExistente = await prisma.lojas.findFirst({
                where: { documento: cnpjCpf },
            });
    
            if (lojaExistente) {
                return res.status(400).json({ error: "CNPJ/CPF já cadastrado." });
            }
    
            // Criptografar a senha
            const hashedPassword = await bcrypt.hash(senha, 10);
    
            // Verificar a categoria
            const categoria_existe = await prisma.categorias.findFirst({
                where: { nome: categoria },
            });
    
            // Criar a loja
            const loja = await prisma.lojas.create({
                data: {
                    id_categoria: categoria_existe?.id_categoria || null,
                    email,
                    nome: nomeEstabelecimento,
                    senha: hashedPassword,
                    cep,
                    endereco: rua,
                    documento: cnpjCpf,
                    comunicacao,
                    descricao,
                    logo,
                },
            });
    
            if (!loja) {
                return res.status(400).json({ error: "Erro ao cadastrar loja." });
            }
    
            // Processar as tags
            const tagsArray = tags
                .split(",")
                .map((tag: any) => tag.trim())
                .filter((tag: any) => tag !== "");
    
            const idsTags = await Promise.all(
                tagsArray.map(async (tagNome: any) => {
                    let tag = await prisma.tags.findFirst({ where: { nome: tagNome } });
                    if (!tag) {
                        tag = await prisma.tags.create({ data: { nome: tagNome } });
                    }
    
                    // Criar relação na tabela lojas_tags
                    await prisma.lojas_tags.upsert({
                        where: {
                            id_loja_id_tag: { id_loja: loja.id_loja, id_tag: tag.id_tag },
                        },
                        create: {
                            id_loja: loja.id_loja,
                            id_tag: tag.id_tag,
                        },
                        update: {}, // Não há necessidade de atualizar
                    });
    
                    return tag.id_tag;
                })
            );
    
            // Geolocalização
            const address = `${rua}, ${numero}, ${bairro}, ${cep}, ${cidade}, ${estado}, Brasil`;
            const resultado_coordenadas = await axios.get(
                `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${process.env.API_KEY_GEO}&result_type=rooftop`
            );
    
            if (!resultado_coordenadas.data.results[0]) {
                return res.status(400).json({ error: "Endereço não encontrado." });
            }
    
            const { lat, lng } = resultado_coordenadas.data.results[0].geometry;
    
            // Criar a posição da loja
            const ponto_criando = await prisma.posicao_lojas.create({
                data: {
                    id_loja: loja.id_loja,
                    ponto_localizacao: [lat, lng],
                },
            });
    
            if (!ponto_criando) {
                return res.status(400).json({ error: "Erro ao criar posição da loja." });
            }
    
            // Responder com sucesso
            res.status(200).json({
                msg: "Loja cadastrada com sucesso!",
                loja,
                idsTags,
                posicao: { lat, lng },
            });
        } catch (err) {
            console.error('Erro ao criar loja:', err);
            res.status(500).json({ error: "Erro ao criar loja.", details: err });
        }
    }  
    
    async get_lojas(req: Request, res: Response){
        try {
            const lojas = await prisma.lojas.findMany({
                include: {
                  posicao: true, // Inclui os dados da posição relacionada à loja
                },
              });            
            res.status(200).json({ msg: 'Lojas encontradas', dados: lojas });
          } catch (error) {
            console.error('Erro ao buscar lojas:', error);
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