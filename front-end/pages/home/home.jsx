import React, { useState, useEffect } from "react";
import { View, SafeAreaView, StyleSheet, TouchableOpacity, Image } from "react-native";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
import { get_lojas } from "../../controllers/lojas_controllers";
import AsyncStorage from '@react-native-async-storage/async-storage';

const PageHome = () => {
  const navigation = useNavigation();
  const [logado, setLogado] = useState(false);
  const [storeLocations, setStoreLocations] = useState([]);
  const [dadosUsuario, setDadosUsuario] = useState([])
  
  useEffect(() => {
    const getUsuario = async () => {
      try {
        const usuario = await AsyncStorage.getItem('usuario');
        if (usuario !== null) {
          // Converte de volta para um objeto
          const parsedUsuario = JSON.parse(usuario);  
          console.log('DADOS SALVOS: ',usuario)
          setDadosUsuario(parsedUsuario); // Armazena o usuário já parseado
          setLogado(true); // Atualiza o estado de logado
        }
      } catch (error) {
        console.error('Erro ao recuperar o usuário:', error);
      }
    };
  
    getUsuario(); // Chama a função assíncrona
  }, []);

  async function getLojas() {
    const response = await get_lojas();
    
    // Verifique se a resposta tem a estrutura que você espera
    if (response && response) {
      console.log(response)
      return response; // Retorna os dados, que são a parte importante
    } else {
      console.log('Erro: dados não encontrados na resposta');
      return []; // Retorna um array vazio em caso de erro
    }
  }

  useEffect(() => {
    // Função assíncrona para pegar as categorias dentro do useEffect
    const fetchLojas = async () => {
      const fetchedLojas = await getLojas();  // Aguarda os dados da API

    };

    fetchLojas(); 

  }, []);

  const mapHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css"/>
      <script src="https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.5.3/leaflet.markercluster.js"></script>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.5.3/MarkerCluster.Default.css" />
      <style>
        html, body, #map {
          margin: 0;
          padding: 0;
          height: 100%;
          width: 100%;
        }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        const map = L.map('map').setView([-23.55052, -46.633308], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

        // Dados dos marcadores
        const markers = ${JSON.stringify(storeLocations)};

        // Adicionar marcadores ao mapa
        const markerCluster = L.markerClusterGroup();
        markers.forEach(location => {
          L.marker([location.lat, location.lng]).addTo(markerCluster);
        });
        map.addLayer(markerCluster);
      </script>
    </body>
    </html>
  `;

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho de navegação */}
      <View style={styles.navCab}>
        <TouchableOpacity>
          <Image source={require('../../assets/images/logo.png')} style={styles.iconHeader} />
        </TouchableOpacity>

        {logado ? (
          <TouchableOpacity onPress={() => navigation.navigate("PageLoja")}> 
            <Image source={require('../../assets/images/perfil.png')} style={styles.btnPerfil} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => navigation.navigate("PageAcess")}> 
            <Image source={require('../../assets/images/btnEntrar.png')} style={styles.btnEntrar} />
          </TouchableOpacity>
        )}
      </View>
  
      {/* Conteúdo principal com WebView */}
      <View style={styles.content}>
        <WebView source={{ html: mapHtml }} style={styles.map} />
      </View>
  
      {/* Barra inferior de navegação */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navButton}>
          <Image source={require('../../assets/images/buscar.png')} style={styles.icon}  />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Image source={require('../../assets/images/inicio.png')} style={styles.icon}  onPress={() => navigation.navigate("PageHome")} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Image source={require('../../assets/images/favs.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  navCab: {
    height: 70,
    backgroundColor: "#501D68",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  iconHeader: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  btnEntrar: {
    width: 45,
    height: 45,
    resizeMode: "contain",
  },
  btnPerfil: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
  content: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  navBar: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#501D68",
  },
  navButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
});

export default PageHome;
