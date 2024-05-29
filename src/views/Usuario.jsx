import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Button, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');



const Usuario = () => {

  const [userModalVisible, setUserModalVisible] = useState(false);
  const [fincaModalVisible, setFincaModalVisible] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    };

    fetchUserData();
  }, []);

  const handleUserButtonPress = () => {
    setUserModalVisible(true);
  };

  const handleFincaButtonPress = () => {
    setFincaModalVisible(true);
  };

  const handleCloseUserModal = () => {
    setUserModalVisible(false);
  };

  const handleCloseFincaModal = () => {
    setFincaModalVisible(false);
  };

  return (
    <View style={styles.fondoTodo}>
      <View style={styles.fondoDatos}>
        <View style={styles.imageContainer}>
          <Image source={require('../img/persona2.png')} style={styles.image} />
        </View>
        <View style={styles.usuarioContainer}>
          {user && <Text style={styles.usuarioText}>{user.nombre}</Text>}
          {user && <Text style={styles.usuarioText}>{user.tipo_usuario}</Text>}
          {user && <Text style={styles.usuarioText}>{user.correo_electronico}</Text>}
      <TouchableOpacity style={styles.userDetailsButton} onPress={handleUserButtonPress}>
        <Text style={styles.userDetailsButtonText}>Ver todos tus datos</Text>
      </TouchableOpacity>
        </View>
      </View>


      <View style={styles.usuarioFinca}>
        <Text style={styles.usuarioText}>Finca</Text>
        <TouchableOpacity style={styles.button} onPress={handleFincaButtonPress}>
          <Image source={require('../img/granja.png')} style={styles.iconBlue} />
        </TouchableOpacity>
      </View>

      {/* Modal para datos del usuario */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={userModalVisible}
        onRequestClose={handleCloseUserModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Todos tus datos</Text>
            {user && (
              <View>
                <Text style={styles.modalText}>Cedula: {user.identificacion}</Text>
                <Text style={styles.modalText}>Teléfono: {user.telefono}</Text>
                <Text style={styles.modalText}>Nombre: {user.nombre}</Text>
                <Text style={styles.modalText}>Correo Electrónico: {user.correo_electronico}</Text>
                <Text style={styles.modalText}>Tipo de Usuario: {user.tipo_usuario}</Text>
              </View>
            )}
            <Button title="Cerrar" onPress={handleCloseUserModal} />
          </View>
        </View>
      </Modal>

      {/* Modal para finca */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={fincaModalVisible}
        onRequestClose={handleCloseFincaModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>hola desde fincas</Text>

            <Button title="Cerrar" onPress={handleCloseFincaModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Usuario;

const styles = StyleSheet.create({
  fondoDatos: {
    backgroundColor: '#F5F9FF',
    height: height * 0.27,
    width: width * 0.9,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  fondoTodo: {
    padding: 15,
    backgroundColor: '#ABC4FF',
    height: '100%',
  },
  usuarioFinca: {
    alignItems: 'center',
    marginTop: 20,
  },
  usuarioText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  usuarioContainer: {
    position: 'absolute',
    top: '10%',
    left: '40%',
  },
  button: {
    marginTop: 10,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  iconBlue: {
    width: 50,
    height: 50,
    tintColor: '#28C8FF',
  },
  imageContainer: {
    position: 'absolute',
    top: '7%',
    left: '5%',
    width: 100,
    height: 100,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  userDetailsButton: {
    position: 'absolute',
    bottom: '-120%',
    left: '-90%',
    width: 200,
    height: 50,
    borderRadius: 20,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#28C8FF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  userDetailsButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
  },
});
