import { useNavigation } from "@react-navigation/native";
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ImageBackground, 
  Image 
} from 'react-native';
import { post_login } from "../../controllers/login_controllers";
import AsyncStorage from '@react-native-async-storage/async-storage';

const PageLogin = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigation = useNavigation()

  const handle_login = async (e, s) => {
    try{
      const dados = {
        email: e,
        senha: s
      }
      const response = await post_login(dados) 
      if (response.code === 200) {
        // Login bem-sucedido
        await AsyncStorage.setItem('usuario', JSON.stringify(response.loja)); // Usando AsyncStorage
        navigation.navigate('Home')
      } else {
        // Tratamento de erro do servidor
        console.error('Erro no login:', response.msg);
      }
    } catch (error) {
      // Tratamento de erros de rede ou do axios
      console.error('Erro ao realizar login:', error);
    }
  }

  return (
    <ImageBackground
      source={require('../../assets/images/background.png')} // Imagem de fundo
      style={styles.container}
    >
      {/* Cabeçalho */}
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Image source={require('../../assets/images/logo_redondo.png')} style={styles.icon} />
        </View>
        <Text style={styles.title}>Milojas</Text>
      </View>

      {/* Formulário de Login */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor="#888"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          placeholderTextColor="#888"
        />
      </View>

      {/* Botões */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={()=> handle_login(email, senha)}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate("PageCadastro")}>
          <Text style={styles.secondaryButtonText}>Cadastrar loja</Text>
        </TouchableOpacity>
      </View>

      {/* Link para acessar sem cadastro */}
      <TouchableOpacity onPress={() => navigation.navigate("PageHome")}>
        <Text style={styles.link}>Acessar sem cadastro</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  icon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
  },
  form: {
    width: '100%',
    marginBottom: 40,
  },
  input: {
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    color: '#000',
  },
  buttonsContainer: {
    width: '100%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderRadius: 8,
    borderColor: '#400C58',
    borderWidth: 2,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#4A148C',
    fontWeight: 'bold',
  },
  secondaryButton: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#FFF',
    paddingVertical: 14,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#400C58',
  },
  secondaryButtonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
  containerLink: {
  },
  link: {
    fontSize: 20,
    color: '#FFF',
    textDecorationLine: 'underline',
    marginBottom: 10,
    fontWeight: 'bold'
  },
});

export default PageLogin;
