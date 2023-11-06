import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { Component } from 'react'
import { Camera } from 'expo-camera'
import { Storage } 

export default class CamaraPost extends Component {
    constructor(props){
        super(props)
        this.state = {
            mostrarCamara: true,
            permisos: false,
            urlTemp: ''
        }
        this.metodosDeCamara = null
    }

    componentDidMount(){
        Camera.requestCameraPermissionAsync()
        .then((resp) => this.setState({
            permisos: true
        }))
        .catch((err) => console.log(err))
    }

    tomarFoto(){
        this.metodosDeCamara.takePictureAsync()
        .then(imgTemp => this.setState({
            urlTemp: imgTemp.uri,
            mostrarCamara: false
        }))
        .catch((err) => console.log(err))
    }

    rechazarFoto(){
        this.setState({
            mostrarCamara
        })
    }

    aceptarFoto(){
        fetch(this.state.urlTemp)
        .then(resp => resp.blob()) //binary large object
        .then(img => {
            const ref = Storage.ref(`fotos/${Date.now()}.jpg`)
            ref.put(img)
            .then(resp => {
                ref.getDownloadURL()
                .then((url) => this.props.actualizarFotourl(url))
            } )
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }

  render() {
    return (
      <View style= {styles.container}>
        {
            this.state.permisos && this.state.mostrarCamara ?
            <>
  
        <Camera
        style= {styles.camara}
        type={Camera.Constants.Type.back}
        ref={metodosDeCamara => this.metodosDeCamara = metodosDeCamara} //especie de queryselector que usa react, accede a los metodos interno
        />
        <TouchableOpacity
        onPress={() => this.tomarFoto()}
        >
        <Text> Tomar foto</Text>
        </TouchableOpacity>
        </>
        : this.state.permisos && this.state.mostrarCamara === false ?
        <Text>No tienes permiso para usar la camara</Text>
        <>
        <Image 
            source={{uri: this.state.urlTemp}}
            style = {styles.img}
            reasizeMode={'contain'}
        />

        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    camara: {
        height: 300,

    },
    img: {
        height: 300
    }
})