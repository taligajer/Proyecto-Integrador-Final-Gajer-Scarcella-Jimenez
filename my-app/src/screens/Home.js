import {Text, View} from 'react-native'
import React, {Component} from 'react'
import {auth} from '../firebase/config'

export default class Home extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <Text>
                Home
            </Text>
        )
    }
}