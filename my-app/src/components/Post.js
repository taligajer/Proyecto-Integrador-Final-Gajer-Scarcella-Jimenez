import {Text, View, TouchableOpacity, StyleSheet} from 'react-native'
import React, {Component} from 'react'

export default class Post extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View>

                {console.log(this.props.data)}
                <Text>{this.props.data.descripcion}</Text>
            </View>
        )
    }
}