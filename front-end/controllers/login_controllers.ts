import axios from 'axios'
import { BASE_API } from '../resources/base_api';

interface Login{
    email: string,
    senha: string
}
async function post_login(dadosLogin: Login): Promise<any> {
    try {
      console.log('Dados enviados:', dadosLogin);
  
      const response = await axios.post(`${BASE_API}/login`, dadosLogin, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      console.log('Resposta do servidor:', response.data);
      return response.data; // Retorna os dados da resposta
    } catch (error) {
      // Trata erros, inclusive o retorno do backend
      if (error.response) {
        // O backend retornou um erro (status >= 400)
        console.error('Erro do servidor:', error.response.data);
        return error.response.data; // Ou lançar um erro customizado
      }
      console.error('Erro de rede:', error);
      throw error; // Propaga erro
    }
  }
  
  export { post_login };