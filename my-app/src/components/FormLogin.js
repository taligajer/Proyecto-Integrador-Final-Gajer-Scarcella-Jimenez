import React, {Component} from 'react'
import {auth} from '../firebase/config'

export default class FormLogin extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }
    render(){
        return (
            <View>
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
                    <Text>Iniciar sesion</Text>
                </TouchableOpacity>
            </View>
        )}

    loguearUsuario(email, password){
        auth.signInWithEmailAndPassword(email, password)
        .then(response => {
            this.setState({loggedIn: true});
        })
        .catch(error => {
            this.setState({error: 'Credenciales invalidas'})
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
        padding: 16,
        marginBottom: 24
    },
    textBn: {
        color: 'white'
    }
})
