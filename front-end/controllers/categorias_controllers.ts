import axios from "axios"
import {BASE_API} from '../resources/base_api'

async function get_categorias(){
    try{
        const response = await axios.get(`${BASE_API}/categorias/listar`)
        return response.data
    }catch(error){
        console.log('Erro ao buscar categorias: ', error)
    }
}

export {get_categorias}