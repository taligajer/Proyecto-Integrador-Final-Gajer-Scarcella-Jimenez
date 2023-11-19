import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { Component } from 'react'
import { Camera } from 'expo-camera'
import { storage } from '../firebase/config'

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
        Camera.requestCameraPermissionsAsync()
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
            mostrarCamara: true,
            urlTemp: ''
        })
    }

    aceptarFoto(){
        fetch(this.state.urlTemp)
        .then(resp => resp.blob()) //binary large object
        .then(img => {
            const ref = storage.ref(`fotos/${Date.now()}.jpg`)
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
            ref={(metodosDeCamara) => this.metodosDeCamara = metodosDeCamara} //especie de queryselector que usa react, accede a los metodos interno
        />

        <TouchableOpacity
        onPress={() => this.tomarFoto()}
        >
            <Text style = {styles.textoBoton}> Tomar foto</Text>
        </TouchableOpacity>
        </>

        : this.state.permisos && this.state.mostrarCamara === false ?
 
        <>
        <Image 
            source={{uri: this.state.urlTemp}}
            style = {styles.img}
            reasizeMode={'contain'}
        />
        <View style={styles.contenedorBotones}>
        <TouchableOpacity
        onPress={() => this.aceptarFoto()}
        >
            <Text style={styles.textoBoton}> Aceptar foto </Text>

        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => this.rechazarFoto()}
        >
            <Text style={styles.textoBoton}> Rechazar Foto </Text>

        </TouchableOpacity>
        </View>
        </>
        :
        <Text> No tienes permisos para usar la camara </Text>

        }

      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ECECE3'
    },
    camara: {
        height: 300,
        width: 500,
        borderRadius: 60,
        overflow: 'hidden',

    },
    contenedorBotones: {
        flexDirection: 'column',
        justifyContent: 'space-between',
      },
    textoBoton: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: "#002454",
        borderRadius: 5,
        padding: 15,
        alignItems: 'center',
        margin: 40,

      },
    img: {
        height: 300,
        width: 200,
        borderRadius: 10,
    }
})