import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native'
import React, {Component} from 'react'

export default class Post extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View>
                <Image style={styles.fotoUrl} source= {{uri: this.props.data.fotoUrl ? this.props.data.fotoUrl: ''}}/>
                {console.log(this.props.data)}
                <Text>{this.props.data.descripcion}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    fotoUrl:{
        height:400,
        width:400,
        border: '2px solid #ddd',
        padding: 5,
        borderRadius:4,
        alignItems: 'center'
    }
    
})