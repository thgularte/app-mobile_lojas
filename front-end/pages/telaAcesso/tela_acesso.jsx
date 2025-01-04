import React, {useEffect, useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
const PageAcess = () => {
    const navigation = useNavigation()
   
  return (
    <ImageBackground
      source={require('../../assets/images/background.png')} // Substitua pelo caminho da sua imagem de fundo
      style={styles.background}
      resizeMode="cover" // Adapta a imagem ao tamanho da tela
    >
      <SafeAreaView style={styles.container}>
        {/* Logo e título */}
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Image
              source={require('../../assets/images/logo_redondo.png')} // Substituir pelo caminho correto do seu logo
              style={styles.logoImage}
            />
          </View>
        </View>

        {/* Descrição */}
        <Text style={styles.description}>
          Encontre lojas e produtos variados mais próximo de você
        </Text>

        {/* Botões principais */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate("PageCadastro")}>
            <Text style={styles.primaryButtonText}>Cadastrar loja</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate("PageLogin")}>
            <Text style={styles.secondaryButtonText}>Login</Text>
          </TouchableOpacity>
        </View>

        {/* Botão de acesso sem cadastro */}
        <TouchableOpacity style={styles.linkButton}  onPress={() => navigation.navigate("PageHome")}>
          <Text style={styles.linkButtonText}>Acessar sem cadastro</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  logoImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  description: {
    fontSize: 25,
    color: "#FFF",
    textAlign: "center",
    marginBottom: 32,
  },
  buttonsContainer: {
    width: "70%",
    alignItems: "center",
    marginBottom: 24,
  },
  primaryButton: {
    width: "100%",
    backgroundColor: "#FFF",
    borderWidth: 2,         
    borderColor: '#400C58',    
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    fontSize: 20,
    color: "#400C58",
    fontWeight: "bold",
  },
  secondaryButton: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#FFF",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#400C58',
  },
  secondaryButtonText: {
    fontSize: 20,
    color: "#FFF",
    fontWeight: "bold",
  },
  linkButton: {
    position: 'absolute',
    bottom: 30, // Distância de 20px da parte inferior da tela
  },
  linkButtonText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: "#FFF",
    textDecorationLine: "underline",
  },
});

export default PageAcess;
