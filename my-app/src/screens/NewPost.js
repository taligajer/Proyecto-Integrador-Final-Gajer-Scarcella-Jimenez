import {Text, View, TouchableOpacity, StyleSheet} from 'react-native'
import React, {Component} from 'react'
import {auth, db} from '../firebase/config'
import FormDescripcionPost from '../components/FormDescripcionPost'
import {Camera} from 'expo-camera'
import CamaraPost from '../components/CamaraPost'

export default class NewPost extends Component {
    constructor(props){
        super(props)
        this.state = {
            descripcion: '',
            urlFoto: '',
            paso1: true
        }
    }

    onSubmit({descripcion, fotoUrl}){
        db.collection('posts').add({
            owner: auth.currentUser.email,
            createdAt: Date.now(),
            descripcion: descripcion,
            fotoUrl: fotoUrl,
            likes:[],
            comentarios:[]
        })
        .then(()=> this.props.navigation.navigate('Home'))
        .catch((e) => console.log(e))
    }

    actualizarDescripcion(text){
        this.setState({
            descripcion: text
        })
    }

    actualizarFotourl(url){
        this.setState({
            urlFoto: url,
            paso1: false
        })
    }

    render(){
        return(
            <View style = {styles.container} >
            <Text style={styles.sectionTitle}>
                New Post
            </Text>
            {
                this.state.paso1 ?
                <CamaraPost
                    actualizarFotourl={(url) => this.actualizarFotourl(url)}
                />
                : 
                <>
            <FormDescripcionPost
                onSubmit={(obj) => this.onSubmit(obj)} 
                actualizarDescripcion={(descripcion) => this.actualizarDescripcion(descripcion)}
                estadoDescripcion = {this.state.descripcion}
                style={styles.formContainer}
            />

            <TouchableOpacity
                onPress={() => this.onSubmit({ 
                    descripcion: this.state.descripcion,
                    fotoUrl: this.state.urlFoto
                })
            }
            style={styles.button}
            >
                <Text style={styles.buttonText}>
                    Enviar
                </Text>
            </TouchableOpacity>
            </>
            }
            </View>
        )
    }
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingVertical: 20,
      },
      sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
      },
      formContainer: {
        marginBottom: 20,
      },
      input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        fontSize: 16,
      },
      button: {
        backgroundColor: "#002454" ,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
      },
      buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
      },
})