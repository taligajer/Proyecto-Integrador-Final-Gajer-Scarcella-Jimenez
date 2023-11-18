import React, { Component } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default class FormSearch extends Component {
  constructor(props) {
    super(props);
  }

  evitarSubmit(evento) {
    evento.preventDefault()
  }

  controlarCambios(texto) {
    this.props.actualizarInput(texto)
    this.props.filtrarUsuarios(texto)
  }

  render() {
    return (
      <View style={styles.busqueda}>
        
        <TextInput
        style={styles.input}
          placeholder="Búsqueda"
          name="busqueda"
          onChangeText={(text) => this.controlarCambios(text)}
        />
        <Button
          title="Buscar"
          onPress={(evento) => this.evitarSubmit(evento)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  busqueda: {
    maxWidth: 1000,
    width: 500,
    padding: 10,
    margin: 10,
    backgroundColor: 'white'
  },
  input: {
    borderWidth: 1,
    borderColor: 'purple',
    marginBottom: 24,
    fontSize: 15,
    padding: 10
}
  
})
