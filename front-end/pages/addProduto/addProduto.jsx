import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { post_produto } from '../../controllers/produtos_controllers';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PageAddProduto = () => {
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openImagePicker = async () => {
    // Solicita permissões para acessar a galeria
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permissão para acessar a galeria é necessária!');
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
  
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setSelectedImage(uri);
    }
  };
  
  const handleCameraLaunch = async () => {
    // Solicita permissões para usar a câmera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permissão para acessar a câmera é necessária!');
      return;
    }
  
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });
  
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setSelectedImage(uri);
    }
  };
  const addProduto = async () => {
    if (!nome || !valor || !selectedImage) {
      alert('Por favor, preencha todos os campos e selecione uma imagem');
      return;
    }
  
    setIsLoading(true);
  
    try {
      const usuario = await AsyncStorage.getItem('usuario');
      const parsedUsuario = JSON.parse(usuario); 
      const produto = {
        id_loja: parsedUsuario.id_loja,
        nome: nome,
        valor: valor,
        imagem: selectedImage
      }
      const response = await post_produto(produto);
      if (response.status === 200) {
        setIsLoading(false)
        alert('Produto adicionado com sucesso!');
      } else {
        alert('Erro ao adicionar produto');
      }
    } catch (error) {
      console.error('Erro ao enviar produto:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome do Produto"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Valor do Produto"
        value={valor}
        onChangeText={setValor}
        keyboardType="numeric"
      />
      {selectedImage && (
        <Image
          source={{ uri: selectedImage }}
          style={{ width: 200, height: 200, marginBottom: 10 }}
        />
      )}
      <TouchableOpacity style={styles.imageButton} onPress={openImagePicker}>
        <Text style={styles.buttonText}>Selecionar Imagem</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.imageButton} onPress={handleCameraLaunch}>
        <Text style={styles.buttonText}>Tirar Imagem</Text>
      </TouchableOpacity>
      {isLoading ? (
        <Text>Carregando...</Text>
      ) : (
        <TouchableOpacity style={styles.button} onPress={addProduto}>
          <Text style={styles.buttonText}>Adicionar Produto</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: '#fff' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
  imageButton: { backgroundColor: '#007BFF', padding: 10, marginBottom: 10, borderRadius: 5 },
  button: { backgroundColor: '#28A745', padding: 10, borderRadius: 5 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});

export default PageAddProduto;
