import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

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
      setSelectedImage(result.assets[0].uri);
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
      setSelectedImage(result.assets[0].uri);
    }
  };

  const addProduto = async () => {
    if (!nome || !valor || !selectedImage) {
      alert('Por favor, preencha todos os campos e selecione uma imagem');
      return;
    }

    setIsLoading(true);

    try {
      const produto = {
        nome: nome,
        valor: valor,
        imagem: selectedImage,
      };

      // Aqui você pode fazer a chamada para sua API
      console.log('Produto Adicionado:', produto);
      alert('Produto adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar produto:', error);
    } finally {
      setIsLoading(false);
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
