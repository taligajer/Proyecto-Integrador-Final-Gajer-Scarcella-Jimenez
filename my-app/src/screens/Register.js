import {Text, View, StyleSheet, } from 'react-native'
import React, {Component} from 'react'
import {auth} from '../firebase/config'
import FormRegister from '../components/FormRegister'

export default class Register extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        console.log(this.props)
        /*auth.onAuthStateChanged((user) => {
            if(user != null){
            this.props.navigation.navigate('TabNavigation')
            }})*/
    }

    render(){
        return(
            <View style = {styles.container}>
                <FormRegister navigation = {this.props.navigation} />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    } 
})