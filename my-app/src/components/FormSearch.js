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
      <View>
        <TextInput

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
