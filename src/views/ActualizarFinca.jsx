import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import axios from 'axios';
import { SelectList } from 'react-native-dropdown-select-list';

const ActualizarFinca = ({ route, navigation }) => {
  const [finca, setFinca] = useState({
    dimension_mt2: '',
    fk_caficultor: '',
    municipio: '',
    vereda: '',
  });

  const [dataCaficultores, setDataCaficultores] = useState([]);
  const [dataMunicipios, setDataMunicipios] = useState([]);

  const urlCaficultores = 'http://10.0.2.2:3000/usuarios/listar';
  const urlMunicipios = 'http://10.0.2.2:3000/municipios/listar';

  useEffect(() => {
    console.log('Datos de la finca recibidos:', route.params);
    const { fincaData } = route.params;
    const { dimension_mt2, fk_caficultor, municipio, vereda } = fincaData;
    setFinca({
      dimension_mt2: dimension_mt2 || '',
      fk_caficultor: fk_caficultor || '',
      municipio: municipio || '',
      vereda: vereda || '',
    });

    async function fetchData() {
      try {
        const responseCaficultores = await axios.get(urlCaficultores);
        const tempCaficultores = responseCaficultores.data.usuarios.map((item) => {
          return { key: item.identificacion.toString(), value: item.nombre };
        });
        setDataCaficultores(tempCaficultores);

        const responseMunicipios = await axios.get(urlMunicipios);
        const tempMunicipios = responseMunicipios.data.map((item) => {
          return { key: item.id_municipio.toString(), value: item.nombre };
        });
        setDataMunicipios(tempMunicipios);
      } catch (e) {
        console.log('Error fetching data:', e);
      }
    }
    fetchData();
  }, [route.params]);

  const handleSelectCaficultor = (val) => {
    if (val) {
      setFinca({ ...finca, fk_caficultor: val });
    }
  };

  const handleSelectMunicipio = (val) => {
    if (val) {
      setFinca({ ...finca, municipio: val });
    }
  };

  const handleActualizarFinca = async () => {
    try {
      const response = await axios.put(`http://10.0.2.2:3000/fincas/actualizar/${route.params.fincaData.codigo}`, finca);
      if (response.status === 200) {
        Alert.alert('Éxito', 'Los datos de la finca se han actualizado correctamente.');
        navigation.goBack(); 
      } else {
        Alert.alert('Error', 'No se pudieron actualizar los datos de la finca.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudieron actualizar los datos de la finca.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer2}>
        <Text style={styles.title}>ACTUALIZAR</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Dimension (mt2):</Text>
          <TextInput
            style={styles.input}
            value={finca.dimension_mt2}
            onChangeText={(text) => setFinca({ ...finca, dimension_mt2: text })}
            placeholder="Dimension (mt2)"
          />
        </View>
        <View style={styles.inputContainer3}>
          <Text style={styles.inputLabel2}>Caficultor:</Text>
          <SelectList
            setSelected={handleSelectCaficultor}
            data={dataCaficultores}
            save="key"
            defaultOption={dataCaficultores.find(option => option.value === finca.fk_caficultor)}
          />
        </View>
        <View style={styles.inputContainer3}>
          <Text style={styles.inputLabel2}>Municipio:</Text>
          <SelectList
            setSelected={handleSelectMunicipio}
            data={dataMunicipios}
            save="key"
            defaultOption={dataMunicipios.find(option => option.value === finca.municipio)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Vereda:</Text>
          <TextInput
            style={styles.input}
            value={finca.vereda}
            onChangeText={(text) => setFinca({ ...finca, vereda: text })}
            placeholder="Vereda"
          />
        </View>
      </View>
      <TouchableOpacity onPress={handleActualizarFinca} style={styles.button}>
        <Text style={styles.buttonText}>Actualizar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C8B6A6', 
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    top: -29,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  inputContainer3: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    left: -20,
    width: 500,
  },
  inputContainer2: {
    backgroundColor: '#EBDCCC',
    height: 500,
    width: 360,
    borderRadius: 15,
    marginTop: -120,
    paddingVertical: 60,
  },
  inputLabel: {
    width: 120,
    marginRight: 10,
    left: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputLabel2: {
    width: 120,
    marginRight: 10,
    left: 40,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    left: -20,
    borderColor: 'gray',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'green', 
    paddingVertical: 10,
    width: 200,
    borderRadius: 10,
    left: -75,
    bottom: -30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
 
  selectContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

export default ActualizarFinca;
