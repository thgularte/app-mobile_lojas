import axios from "axios"
import {BASE_API} from '../resources/base_api'

interface DadosCadastro {
    email: string;
    senha: string;
    nomeEstabelecimento: string;
    cnpjCpf: string;
    cep: string;
    rua: string;
    numero: string;
    comunicacao: {
      whatsapp: string;
      instagram: string;
      facebook: string;
      twitter: string;
    };
    tags: string;
    descricao: string;
  }
  
async function post_loja(dadosCadastro: DadosCadastro): Promise<any> {
    try {
      console.log('Dados enviados:', dadosCadastro);
  
      // Envia os dados como JSON
      const response = await axios.post(`${BASE_API}/lojas`, dadosCadastro, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log('Resposta do servidor:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao cadastrar loja:', error);
      throw error;
    }
  }
  


async function get_lojas(){
    try{
        const response = await axios.get(`${BASE_API}/lojas/listar`)
        return response.data
    }catch(error){
        console.log('Erro ao buscar lojas: ', error)
    }
}

export {post_loja, get_lojas}