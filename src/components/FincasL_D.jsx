import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import FloatingButton from './FloatingButton';

const ListarPersona = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const navigation = useNavigation(); // Obtener la función de navegación

  const [persona, setPersona] = useState({
    dimension_mt2: '',
    fk_caficultor: '',
    municipio:'',
    vereda:'',
  });

  
  const URL2 = 'http://10.0.2.2:3000/fincas/listar';

  const mostrarFincas = async () => {
    try {
      const response = await fetch(URL2);
      const json = await response.json();
      setData(json);
      mostrarFincas()
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No funcionó');
    } finally {
      setLoading(false);
    }
  };

  const desactivarFinca = async (codigo) => {
    try {
      const response = await axios.put(`http://10.0.2.2:3000/fincas/desactivar/${codigo}`);
      if (response.status === 200) {
        mostrarFincas();
        Alert.alert('Finca desactivada exitosamente');
      } else {
        Alert.alert('Error', 'No se pudo desactivar la finca');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Error en el servidor');
    }
  };

  const actualizarFinca = async (fincaData) => {
    // Llama a la función navigate para ir a la vista ActualizarFinca
    navigation.navigate('Actualizar', { fincaData });
  };

  useEffect(() => {
    mostrarFincas();
  }, []);

  return (
    <View style={estilo.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#FFD700" />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ codigo }) => codigo.toString()}
          renderItem={({ item }) => (
            <View style={estilo.itemContainer}>
              <View style={estilo.labelContainer}>
                <Text style={estilo.label}>Codigo:</Text>
                <Text style={estilo.label}>Dimension (mt2):</Text>
                <Text style={estilo.label}>Caficultor:</Text>
                <Text style={estilo.label}>Municipio:</Text>
                <Text style={estilo.label}>Vereda:</Text>
                <Text style={estilo.label}>Estado:</Text>
                <View style={estilo.contenedorBoton}>
                  <TouchableOpacity onPress={() => desactivarFinca(item.codigo)} style={estilo.buttonB}>
                    <Text style={estilo.buttonText}>Desactivar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => actualizarFinca(item)} style={estilo.button}>
  <Text style={estilo.buttonText}>Actualizar</Text>
</TouchableOpacity>
                </View>
              </View>
              <View style={estilo.valueContainer}>
                <Text style={estilo.value}>{item.codigo}</Text>
                <Text style={estilo.value}>{item.dimension_mt2}</Text>
                <Text style={estilo.value}>{item.fk_caficultor}</Text>
                <Text style={estilo.value}>{item.municipio}</Text>
                <Text style={estilo.value}>{item.vereda}</Text>
                <Text style={estilo.value}>{item.estado}</Text>
              </View>
            </View>
          )}
        />
      )}
      <FloatingButton />
    </View>
  );
};

const estilo = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C8B6A6', // Color de fondo un tono cafecito claro
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 9,
    paddingHorizontal: 7,
    paddingVertical: 10,
    backgroundColor: '#EBDCCC', // Color de fondo un tono cafecito más oscuro
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#C0C0C0', // Borde un tono cafecito más claro
  },
  labelContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  valueContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  label: {
    color: '#6D6D6D', // Color de texto un tono cafecito más oscuro
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    color: '#4C4C4C', // Color de texto un tono cafecito
    fontSize: 18,
    textAlign: 'right',
    top: -24,
    paddingTop: 6,
    fontWeight: 'bold',
  },
  contenedorBoton: {
    flexDirection: 'row',
    marginTop: 9,
  },
  button: {
    backgroundColor: '#FFC700', // Color de botón un tono doradito
    justifyContent: 'center',
    alignItems: 'center',
    width: 106,
    paddingVertical: 8,
    borderRadius: 13,
    marginLeft: 4,
  },
  buttonB: {
    backgroundColor: '#ED6158', // Color de botón un tono doradito
    justifyContent: 'center',
    alignItems: 'center',
    width: 106,
    paddingVertical: 8,
    borderRadius: 13,
    marginLeft: 4,
  },
  buttonText: {
    color: '#0A0A1A',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
export default ListarPersona;
