import React, {Component} from 'react'
import {auth} from '../firebase/config'
import { TextInput, View, Text, TouchableOpacity, StyleSheet} from 'react-native'

export default class FormLogin extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: ''
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
                <Text>Logueate en mi App</Text>
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
                        onChangeText = {(text) => this.setState({password:text}) }
                    />
                </View>
                <TouchableOpacity
                    onPress={() => this.loguearUsuario(this.state.email, this.state.password)}
                    style= {styles.btn}>
                    <Text style= {styles.textBtn}>Iniciar sesion</Text>
                </TouchableOpacity>
            </View>
        )}


}

const styles = StyleSheet.create({
    container:{
        width: 500,
        maxWidth: 1000,
        flex: 1,
        padding: 10
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
