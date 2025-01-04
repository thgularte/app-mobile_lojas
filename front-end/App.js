import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PageHome from './pages/home/home'; // Tela principal
import PageAcess from './pages/telaAcesso/tela_acesso'; // Tela de acesso
import PageCadastro from './pages/cadastro/cadastro';
import PageLogin from './pages/login/login';
import PageLoja from './pages/loja/loja';
import PageAddProduto from './pages/addProduto/addProduto'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PageHome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="PageHome" component={PageHome} />
        <Stack.Screen name="PageAcess" component={PageAcess} />
        <Stack.Screen name="PageCadastro" component={PageCadastro} />
        <Stack.Screen name="PageLogin" component={PageLogin} />
        <Stack.Screen name="PageLoja" component={PageLoja} />
        <Stack.Screen name="PageAddProduto" component={PageAddProduto} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

