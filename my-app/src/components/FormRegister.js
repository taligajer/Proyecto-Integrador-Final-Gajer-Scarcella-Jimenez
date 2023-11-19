import React, {Component} from 'react'
import {auth, db} from '../firebase/config';
import { TextInput, View, Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native'
import MyImage from './MyImage';

export default class FormRegister extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            email:'',
            password: '',
            minibio: '',
            errorEmail: false,
            errorPass: false,
            errorName: false,
            idDocumentoRegistrado:'',
            step1: true,
            fotoDePerfil: ''
        }
    }

    registrarUsuario(name,email, password){
        if(name == ''){
            return this.setState({errorName: true})
        }
        if(email == ''){
            return this.setState({errorEmail: true})
        }
        if(password == ''){
            return this.setState({errorPass: true})
        }
        auth.createUserWithEmailAndPassword(email, password)
        .then(user => db.collection('users').add({
            owner: this.state.email,
            createdAt: Date.now(),
            name: this.state.name,
            minibio: this.state.minibio,
            fotoPerfil: ''
        })
        .then((resp) => this.setState({
            idDocumentoRegistrado: resp.id,
            step1: false
        }))
        )
        //.then((resp) => this.props.navigation.navigate('AgregarFoto', {docId: resp.id}))
        .catch(error => 
            console.log(error))
    }
    actualizarEstadoFotoDePerfil(url){
        this.setState({
            fotoDePerfil:url
        }, ()=> this.actualizarDocDelUsuario()
        )
    }

    actualizarDocDelUsuario(){
        console.log(this.props);
        db.collection('users')
        .doc(this.state.idDocumentoRegistrado)
        .update({
            fotoDePerfil: this.state.fotoDePerfil
        })
        .then(resp => {
            this.props.navigation.navigate('TabNavigation') 
        })
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.formContainer}>
                <Text style= {styles.titulo}>Registrate a mi App</Text>
                {
                    this.state.step1 ?
                    <View>
                    {
                        this.state.errorName ?
                        <Text style={styles.errorText}>Ingresa un nombre valido</Text>
                        : ''
                    }
                    <TextInput
                        style = {styles.input} 
                        placeholder = 'Pon tu nombre'
                        keyboardType = 'default'
                        value = {this.state.name}
                        onChangeText = {(text) => this.setState({name:text}) }
                    />
                    {
                        this.state.errorEmail ?
                        <Text style={styles.errorText} >Ingresa un email valido</Text>
                        : ''

                    }
                    <TextInput
                        style = {styles.input} 
                        placeholder = 'Pon tu email'
                        keyboardType = 'email-adress'
                        value = {this.state.email}
                        onChangeText = {(text) => this.setState({email:text}) }
                    />

                    <TextInput
                        style = {styles.input}
                        placeholder = 'Crea una minibio'
                        value = {this.state.minibio}
                        onChangeText = {(text) => this.setState({minibio:text}) }
                    />
                    {
                        this.state.errorPass ?
                        <Text style={styles.errorText}>Ingresa una contraseña valida</Text>
                        : ''
                    }
                    <TextInput
                        style = {styles.input} 
                        placeholder = 'Pon tu password'
                        keyboardType = 'default'
                        value = {this.state.password}
                        secureTextEntry = {true}
                        onChangeText = {(text) => this.setState({password:text}) }
                    />
            {
            this.state.name && this.state.email && this.state.password && this.state.email.includes('@') && this.state.email.includes('.com') && this.state.password.length >= 6 ? 

                ''
            : 
            this.state.email.includes('@') === false || this.state.email.includes('.com') === false ? (
            
                <Text style={styles.errorText}>El email debe contener '@' y '.com'</Text>
            ) : 
                '' }
            { this.state.password.length < 6 ? (

                <Text style={styles.errorText}>La contraseña debe tener 6 o mas caracteres.</Text>
            ) 
            : ''
            }

                    <Text 
                    style = {styles.textlink}>
                        Tenes una cuenta? 
                        <TouchableOpacity 
                        onPress={() => this.props.navigation.navigate('Login')}
                        >
                       <Text style={styles.link}> Loguéate aquí!</Text>
                        </TouchableOpacity>
                    </Text>
                    {this.state.email == '' || this.state.name == '' || this.state.password == '' ? '' :
                    <TouchableOpacity 
                    onPress={() => this.registrarUsuario(this.state.name, this.state.email, this.state.password)}
                    style= {styles.btn}>
                        <Text style= {styles.textBn}> Registrame </Text>
                    </TouchableOpacity>
                    }
                </View>: 
                <MyImage actualizarEstadoFotoDePerfil={(url)=> this.actualizarEstadoFotoDePerfil(url)}navigation={this.props.navigation}/>
                //<AgregarFoto navigation={this.props.navigation}/>
            }  
                
            </View>
            </View>
        
        
        ) }

}

const styles = StyleSheet.create({

    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    formContainer: {
        width: '80%',
        maxWidth: 400,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 3,
      },
      titulo: {
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
      },
      input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        marginBottom: 16,
        fontSize: 16,
        padding: 12,
      },
      btn: {
        backgroundColor: "#002454",
        padding: 16,
        alignItems: 'center',
        borderRadius: 8,
        marginBottom: 16,
      },
      textBn: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
      errorText: {
        color: 'red',
        marginBottom: 16,
        fontSize: 14,
      },
      textlink: {
        marginTop: 16,
        fontSize: 16,
      },
      link: {
        color:  "#002454",
        fontWeight: 'bold',
      },
})