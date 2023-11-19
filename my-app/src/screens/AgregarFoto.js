import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { db } from '../firebase/config'
import React, { Component } from 'react'
import MyImage from '../components/MyImage'

export default class   extends Component {
    constructor(props){
        super(props)
        this.state = {
            fotoDePerfil: ''
        }
    }

    actualizarEstadoFotoDePerfil(url){
        this.setState({
            fotoDePerfil: url
        })
    }

    actualizarDoc(){
        console.log(this.props)
        db.collection('users')
        .doc(this.props.route.params.docId)
        .update({
            fotoDePerfil: this.state.fotoDePerfil
        })
        .then(resp => {
            this.props.navigation.navigate('TabNavigation')
        })
        
    }

  render() {
    return (
      <View style = {styles.container}>
        <Text style= {styles.titulo}>Foto De Perfil</Text>
        <MyImage actualizarEstadoFotoDePerfil = {(url)=> this.actualizarEstadoFotoDePerfil(url)}/>
        {this.state.foto !== '' ?
            <TouchableOpacity
                style={styles.btn}
                onPress={()=> this.actualizarDoc()}
            >
                <Text>Añadir foto de perfil</Text>
            </TouchableOpacity>
            :
            <></>
        }
        <TouchableOpacity
        style={styles.btn}
        onPress={()=> this.props.navigation.navigate('TabNavigation')}
        >
            <Text>Omitir este paso</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
    titulo:{
        marginBottom:10,
        textAlign:'center',
        fontSize: 20
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn:{
    backgroundColor:'pink',
    padding: 10,
    margin: 10
    }
})