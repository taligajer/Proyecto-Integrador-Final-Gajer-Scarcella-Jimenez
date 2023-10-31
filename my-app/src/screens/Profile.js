import {Text, View, TouchableOpacity, Stylesheet} from 'react-native'
import React, {Component} from 'react'
import {auth} from '../firebase/config'

export default class Profile extends Component {
    constructor(props){
        super(props)
    }
    
    logout(){
        auth.signOut()
        this.props.navigation.navigate('Register')
    }

    render(){
        return(
            <View>
                <Text>El email del usuario es:</Text>
                <Text>{auth.currentUser.email}</Text>
                <View>
                    <TouchableOpacity
                    onPress={() => this.logout()}
                    >
                        <Text>Cerrar sesion</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = Stylesheet.create({
    signoutBtn: {
        backgroundColor: 'red',
        padding: 16
    }
})