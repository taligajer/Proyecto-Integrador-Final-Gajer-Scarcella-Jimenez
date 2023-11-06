import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native'
import React, {Component} from 'react'

export default class Post extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View>
                <Image source= {{uri: this.props.data.fotoUrl ? this.props.data.fotoUrl: ''}}/>
                {console.log(this.props.data)}
                <Text>{this.props.data.descripcion}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    
})