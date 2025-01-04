import axios from "axios"
import {BASE_API} from '../resources/base_api'

interface Produto {
    nome: string,
    valor: string,
    imagem: string | File
}

async function post_produto(produto: Produto) {
    try {
        const response = await axios.post(`${BASE_API}/produtos`, produto, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
    } catch (error) {
        console.log('Erro ao buscar produtos: ', error);
        throw error; // Repassa o erro para tratamento externo, se necessário
    }
}

async function get_produtos(id_loja){
    try{
        const response = await axios.get(`${BASE_API}/produtos/listar/${id_loja}`)
        return response.data
    }catch(error){
        console.log('Erro ao buscar produtos: ', error)
    }
}

export {post_produto, get_produtos}