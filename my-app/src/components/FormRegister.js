import React, {Component} from 'react'
import {auth, db} from '../firebase/config';
import { TextInput, View, Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native'

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
            errorName: false
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
        }))
        .then((resp) => this.props.navigation.navigate('InfoAdicionalUser', {docId: resp.id}))
        .catch(error => 
            console.log(error))
    }

    render(){
        return (
            <View style={styles.container}>
                <Text style= {styles.titulo}>Registrate a mi App</Text>
                <View>
                    {
                        this.state.errorName ?
                        <Text>Ingresa un nombre valido</Text>
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
                        <Text>Ingresa un email valido</Text>
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
                        <Text>Ingresa una contraseña valida</Text>
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

                    <Text 
                    style = {styles.textlink}>
                        Tenes una cuenta? 
                        <TouchableOpacity 
                        onPress={() => this.props.navigation.navigate('Login')}
                        >
                        Logueate aca!
                        </TouchableOpacity>
                    </Text>

                    <TouchableOpacity 
                    onPress={() => this.registrarUsuario(this.state.name, this.state.email, this.state.password)}
                    style= {styles.btn}>
                        <Text style= {styles.textBn}> Registrame </Text>
                    </TouchableOpacity>

                </View>
            </View>
        
        
        ) }

}

const styles = StyleSheet.create({
    containergral:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    container:{
        width: 500,
        maxWidth: 1000,
        flex: 1,
        padding: 10,
    },
    titulo:{
        marginBottom:10,
        textAlign:'center',
        fontSize: 20
    },
    input: {
        borderWidth: 1,
        borderColor: 'green',
        marginBottom: 24,
        fontSize: 15,
        padding: 10

    },
    btn: {
        backgroundColor: 'purple',
        padding: 16,
        alignItems: 'center',
        marginBottom: 24
    },
    textBn: {
        color: 'white',
        fontSize: 15
    }
})