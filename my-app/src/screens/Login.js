import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import React, {Component} from 'react'
import {auth} from '../firebase/config'
import FormLogin from '../components/FormLogin'

export default class Login extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        console.log(this.props)
        auth.onAuthStateChanged((user) => {
            if(user != null){
            this.props.navigation.navigate('TabNavigation')
            }}) 
    }
    

    render(){
        return(
            <View style = {styles.container}>
                <FormLogin/>
                <Text>
                    Todavia no tenes cuenta? 
                    <TouchableOpacity 
                    onPress={() => this.props.navigation.navigate('Register')}> 
                    Registrate aca</TouchableOpacity>
                </Text>
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