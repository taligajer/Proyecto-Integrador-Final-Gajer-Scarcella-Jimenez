import React, {Component} from 'react'
import {auth} from '../../firebase/config'

export default class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

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
