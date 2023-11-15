import { Text, View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import Image from '../components/Image'
import { db } from '../firebase/config'

export default class InfoAdicionalUser extends Component {
    constructor(props){
        super(props)
        this.state = {
            fotoDePerfil: ''
        }
    }

    actualizarEstadoFotoDePerfil(url){
        this.setState({
            fotoDePerfil:url
        })
    }

    actualizarDocDelUsuario(){
        console.log(this.props);
        db.collection('users')
        .doc(this.props.route.params.docId)
        .update({
            fotoDePerfil: this.state.fotoDePerfil
        })
        .then(resp => {
            this.props.navigation.navigate('HomeNav') //VER ESTO
        })
    }

  render() {
    return (
      <View>
        <Text>infoAdicionalUser</Text>
        <Image actualizarFotoPerfil = {() => this.actualizarEstadoFotoDePerfil(url)}/>
        {
            this.state.fotoDePerfil !== '' ?
            <TouchableOpacity
            onPress={() => this.actualizarDocDelUsuario()}
            >
                <Text>
                    Añadir foto de perfil
                </Text>
            </TouchableOpacity>
            : null
        }
            <TouchableOpacity>
                <Text>
                    Omitir este paso
                </Text>
            </TouchableOpacity>
    
      </View>
    )
  }
}