import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ListarPersona from './src/components/FincasL_D.jsx';
import Lotes from './src/views/Usuario.jsx';
import { Image, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

const TabBarIcon = ({ focused, iconName }) => (

  <Image
    source={iconName === 'home' ? require('./src/img/granja.png') : require('./src/img/lote.png')}
    style={[styles.tabIcon, { tintColor: focused ? '#FFFFFF' : 'black' }]}
  />
);


function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName='Fincas'
      screenOptions={{
        tabBarActiveTintColor: styles.colorEnCabezado,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
        tabBarBackgroundColor: '#4849E8',
      }}
    >
      <Tab.Screen
        name='Fincas'
        component={Lotes}
        options={{
          tabBarLabel: 'FINCAS',
          tabBarActiveTintColor: styles.colorEnCabezado,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} iconName='home' />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name='Registrar una nueva Persona'
        component={ListarPersona}
        options={{
          tabBarLabel: 'LOTES',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} iconName='settings' />
          ),
          headerShown: false, 
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#648DFF',
    borderTopWidth: 0,
  },
  tabLabel: {
    fontSize: 12,
    color: '#FFF',
    fontWeight: 'bold',
  },
  tabIcon: {
    width: 24,
    height: 24,
  },
  colorEnCabezado: {
    color: '#FFFFFF', 
  },
});

export default MyTabs;
