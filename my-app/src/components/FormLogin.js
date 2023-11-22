import React, {Component} from 'react'
import {auth} from '../firebase/config'
import { TextInput, View, Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native'

export default class FormLogin extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '', 
        }
    }

    loguearUsuario(email, password){
        auth.signInWithEmailAndPassword(email, password)
        .then((user)=> {
            this.props.navigation.navigate('TabNavigation');
        })
        .catch(error =>
            console.log(error))
    }

    render(){
        return (
            
            <View style={styles.container}>
                 <View style={styles.formContainer}>
                <Text style={styles.titulo}>Logueate en mi App</Text>
                <View>
                    <TextInput
                        style = {styles.input} 
                        placeholder = 'Pon tu email'
                        keyboardType = 'default'
                        value = {this.state.email}
                        onChangeText = {(text) => this.setState({email:text}) }
                    />

                    <TextInput
                        style = {styles.input} 
                        placeholder = 'Pon tu password'
                        keyboardType = 'default'
                        value = {this.state.password}
                        secureTextEntry = {true}
                        onChangeText = {(text) => this.setState({password:text}) }
                    />
                </View>
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
                <Text>
                    Todavia no tenes cuenta?
                    <TouchableOpacity 
                    onPress={() => {
                        console.log('FUNCIONA EL BOTON');
                        this.props.navigation.navigate('Register')

                        }}> 
                    <Text style={styles.link}>Registrate aca</Text></TouchableOpacity>
                </Text>
            {this.state.email == '' || this.state.name == '' || this.state.password == '' ? '' :
                <TouchableOpacity
                    onPress={() => this.loguearUsuario(this.state.email, this.state.password)}
                    style= {styles.btn}>
                    <Text style= {styles.textBn}>Iniciar sesion</Text>
                </TouchableOpacity>
            }
            </View>
            </View>
            
        )}


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
        color: "#002454",
        fontWeight: 'bold',
      },
      btn: {
        backgroundColor: "#002454",
        padding: 16,
        alignItems: 'center',
        borderRadius: 8,
        marginBottom: 24,
      },
      textBtn: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
})
