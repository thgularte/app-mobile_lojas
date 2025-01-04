import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { get_produtos } from '../../controllers/produtos_controllers';

const Loja = () => {
  const [lojaData, setLojaData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchLojaData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('usuario');
        if (storedData) {
          setLojaData(JSON.parse(storedData));
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Erro ao carregar os dados da loja:', error);
      }
    };

   

    fetchLojaData();
  }, []);
 const buscarProdutos = async () => {
      if (lojaData?.id_loja) {
        try {
          const response = await get_produtos(lojaData.id_loja);
          if (response) {
            setProdutos(response);
            console.log(response);
          } else {
            console.log('Erro ao buscar produtos da loja');
          }
        } catch (error) {
          console.error('Erro na requisição de produtos:', error);
        }
      }
    };
  useEffect(() => {
    if (lojaData) {
      buscarProdutos();
    }
  }, [lojaData]);

  if (!lojaData) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Milojas</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.link}>Voltar</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.storeName}>{lojaData.nome}</Text>
      {isLoggedIn ? (<TouchableOpacity>
        <Image source={require('../../assets/images/editar.png')} style={styles.icon_editar} />
        </TouchableOpacity>
        ) : (<View></View>)}

      <View style={styles.profileSection}>
        <View style={styles.row}>
          <View style={styles.imagePlaceholder}>
            {lojaData.logo ? (
              <Image source={{ uri: lojaData.logo }} style={styles.image} />
            ) : null}
          </View>
          <View style={styles.infoSection}>
            <Text style={styles.storeInfo}>Endereço: {lojaData.endereco}</Text>
            <Text style={styles.storeInfo}>Descrição: {lojaData.descricao}</Text>
            {lojaData.comunicacao && (
              <View>
                <Text style={styles.storeInfo}>WhatsApp: {lojaData.comunicacao.whatsapp}</Text>
                <Text style={styles.storeInfo}>Instagram: {lojaData.comunicacao.instagram}</Text>
                <Text style={styles.storeInfo}>Facebook: {lojaData.comunicacao.facebook}</Text>
                <Text style={styles.storeInfo}>Twitter: {lojaData.comunicacao.twitter}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
      {isLoggedIn ? (
        <TouchableOpacity style={{marginLeft: 14}} onPress={() => {navigation.navigate('PageAddProduto')}}>
          <Text style={{textDecorationLine: 'underline', color:'#fff', fontSize: 21,fontWeight: 'bold',}}> Adicionar novos produtos</Text>
        </TouchableOpacity>
        ) : (<View></View>)}
   
        <View style={styles.productsSection}>
          <Text style={styles.sectionTitle}>Veja alguns produtos disponíveis</Text>
          {produtos.length > 0 ? (
            <View style={styles.productsRow}>
              {produtos.map((produto, index) => (
                <View key={index} style={styles.productItem}>
                  <Image source={{ uri: produto.imagem }} style={styles.productImage} />
                  <Text style={styles.productName}>{produto.nome}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.noProductsText}>Nenhum produto disponível no momento.</Text>
          )}
        </View>

      <TouchableOpacity style={styles.button_visualizar} onPress={() => navigation.navigate('MapaLoja', { loja: lojaData })}>
        <Text style={styles.buttonVisualizarText}>Visualizar caminho até a loja</Text>
      </TouchableOpacity>

      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Buscar')}>
          <Image source={require('../../assets/images/buscar.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('PageHome')}>
          <Image source={require('../../assets/images/inicio.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Favoritos')}>
          <Image source={require('../../assets/images/favs.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6A1B9A',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6A1B9A',
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  profileSection: {
    marginTop: 50,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  infoSection: {
    flex: 1,
    marginLeft: 16,
  },
  storeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 130,
    marginLeft: 60,
    marginBottom: -30
  },
  storeInfo: {
    color: '#FFFFFF',
    marginBottom: 4,
  },
  productsSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    marginLeft: 15,
    marginTop: 10
  },
  productsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productItem: {
    width: 100,
    margin: 8,
    alignItems: 'center',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  productName: {
    color: '#FFFFFF',
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  button_visualizar: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 300,
    
  },
  buttonText: {
    color: '#6A1B9A',
    fontWeight: 'bold',
  },
  buttonVisualizarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },

  navBar: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#501D68",
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  navButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#501D68',
    paddingHorizontal: 16,
    paddingVertical: 8,
    position: 'absolute',
    top: 20,
    width: '100%',
    height: 60,
    zIndex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  link: {
    color: '#FFFFFF',
    textDecorationLine: 'underline',
  },
  icon_editar: {
    width: 20,
    height: 20,
    marginLeft: 200,
    marginTop: 9
  },
  noProductsText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
});

export default Loja;
