import React, {Component} from 'react'
import {auth} from '../../firebase/config';

export default class Register extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            email:'',
            password: ''
        }
    }

    registrarUsuario(email, password){
        auth.createUserWithEmailAndPassword(email, password)
        .then(response => {
            this.setState({registered: true});
        })
        .catch(error => {
            this.setState({error: 'Fallo en el registro'})
        })
        }
}