import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'

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
            onChangeText={(text) => this.setState({
                descripcionPost: text
            })}
            value= {this.state.descripcionPost}
            style={styles.input}
            />
            <TouchableOpacity
                style={styles.btn}
                onPress={() => this.props.onSubmit({ descripcion: this.state.descripcionPost})}
            >
                <Text>
                    Enviar
                </Text>
            </TouchableOpacity>
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