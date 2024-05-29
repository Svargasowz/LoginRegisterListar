import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegistrarFincas from './src/views/RegistrarFincas.jsx';
import Navigation from './Navigation.jsx';
import Lotes from './src/views/Usuario.jsx'
import Actualizar from './src/views/ActualizarFinca.jsx';
import Login from './src/views/Login.jsx'

const Stack = createNativeStackNavigator();

function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Login'
        screenOptions={{
          headerStyle: {backgroundColor: '#648DFF',},
          headerTintColor: '#FFFFFF',fontWeight: 'bold',headerTitleStyle: {
          fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="MADAC_COFFE" component={Navigation} />
        <Stack.Screen name="RegistrarFincas" component={RegistrarFincas} />
        <Stack.Screen name='Lotes' component={Lotes} />
        <Stack.Screen name='Actualizar' component={Actualizar} />
        <Stack.Screen name='Login' component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;