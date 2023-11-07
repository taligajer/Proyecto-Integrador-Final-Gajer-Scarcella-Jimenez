import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { TextInputComponent } from 'react-native'

export default class FormDescripcionPost extends Component {
    constructor(props){
        super(props)
        this.state = {
            descripcionPost: ''
        }
    }
  
  
  
    render() {
    return (
      <View>
        <Text>Describi tu posteo</Text>
        <View>
            <TextInput
            placeholder='Añadi la descripcion'
            onChangeText={(descripcion) => this.props.actualizarDescripcion(descripcion)}
            value= {this.props.estadoDescripcion}
            style={styles.input}
            multiline= {true}
            numberOfLines= {8}
            />
        </View>
     </View>
    
    )
  }
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: 'red'
    },
    btn: {
        borderWidth: 1,
        borderColor: 'green'
    }
})