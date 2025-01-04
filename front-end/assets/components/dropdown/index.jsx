import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { get_categorias } from '../../../controllers/categorias_controllers';

const DropDown = ({selectedValue, setSelectedValue}) => {
  const [categories, setCategories] = useState([]); // Estado para armazenar as categorias (você vai buscar isso no banco)
    // Função assíncrona para pegar as categorias
    async function getCategorias() {
      const response = await get_categorias();
      
      // Verifique se a resposta tem a estrutura que você espera
      if (response && response.dados) {
        return response.dados; // Retorna os dados, que são a parte importante
      } else {
        console.log('Erro: dados não encontrados na resposta');
        return []; // Retorna um array vazio em caso de erro
      }
    }
  
    useEffect(() => {
      // Função assíncrona para pegar as categorias dentro do useEffect
      const fetchCategories = async () => {
        const fetchedCategories = await getCategorias();  // Aguarda os dados da API
  
        const categorias = fetchedCategories.map(category => ({
          label: category.nome,
          value: category.id_categoria           
        }));
        setCategories(categorias);
      };
  
      fetchCategories(); 
  
    }, []);
  // Pegando a largura da tela para calcular 90% dela
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha uma categoria</Text>

      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue) => setSelectedValue(itemValue)} // Atualiza o estado com o valor selecionado
        style={[styles.picker, { width: screenWidth * 0.9 }]} // Ajusta a largura do picker para 90% da tela
      >
        {categories.map((category) => (
          <Picker.Item key={category.value} label={category.label} value={category.value} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    marginLeft: -210,
    color: '#FFF'
  },
  picker: {
    height: 50,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    paddingLeft: 10,
    paddingRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  }
});

export default DropDown;
