import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FloatingButton = () => {
  const navigation = useNavigation();

  const navigateToRegistrarFincas = () => {
    navigation.navigate('RegistrarFincas');
  };

  return (
    <TouchableOpacity style={styles.button} onPress={navigateToRegistrarFincas}>
      <Text style={styles.buttonText}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FFD700',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    color: '#0A0A1A',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default FloatingButton;