import {Text, View} from 'react-native'
import React, {Component} from 'react'
import {auth} from '../firebase/config'
import FormRegister from '../components/FormRegister'

export default class Register extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        console.log(this.props)
        auth.onAuthStateChanged((user) => {
            if(user != null){
            
            }})
    }

    render(){
        return(
            <View>
                <FormRegister />
            </View>
        )
    }
}