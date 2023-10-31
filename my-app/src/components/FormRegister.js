import React, {Component} from 'react'
import {auth} from '../firebase/config';
import { TextInput, View, Text, TouchableOpacity, Stylesheet} from 'react-native'

export default class FormRegister extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            email:'',
            password: ''
        }
    }
    render(){
        return (
            <View>
                <Text>Registrate a mi App</Text>
                <View>
                    <TextInput
                        style = {styles.input} 
                        placeholder = 'Pon tu nombre'
                        keyboardType = 'default'
                        value = {this.state.name}
                        onChangeText = {(text) => this.setState({name:text}) }
                    />

                    <TextInput
                        style = {styles.input} 
                        placeholder = 'Pon tu email'
                        keyboardType = 'email-adress'
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
                    <TouchableOpacity 
                    onPress={() => this.registrarUsuario(this.state.name, this.state.email, this.state.password)}
                    style= {styles.btn}>
                        <Text style= {styles.textBn}> Registrame </Text>
                    </TouchableOpacity>

                </View>
            </View>
        
        
        ) }


    registrarUsuario(name,email, password){
        auth.createUserWithEmailAndPassword(email, password)
        .then(response => {
            this.setState({registered: true});
        })
        .catch(error => {
            this.setState({error: 'Fallo en el registro'})
        })
        }
}

const styles = Stylesheet.create({
    input: {
        borderWidth: 1,
        borderColor: 'green',
        marginBottom: 24

    },
    btn: {
        backgroundColor: 'purple',
        padding: 16
    },
    textBn: {
        color: 'white'
    }
})