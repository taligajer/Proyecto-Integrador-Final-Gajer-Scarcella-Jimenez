import { TextInput, FlatList, View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import React, {Component} from 'react'
import {auth} from '../firebase/config'
import Post from '../components/Post'

export default class Home extends Component {
    constructor(props){
        super(props)
        this.state={
            posteos: []
        }
    }

    render(){
        return(
            <View>
                <FlatList
                    data={this.state.posteos}
                    keyExtractor={(item)=> item.id.toString()}
                    renderItem={({item})=> <Post navigation={this.props.navigation} data={item.data} id={item.id}/>}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        containerGral:{
            flex:1
        },
        container:{
            flex:2,
            alignContent: 'centrer'
        },
        containerGrande:{
            flex:3,
            backgroundColor: 'purple'
        },
        containerChico:{
            flex:1,
            backgroundColor: 'pink'
        }
    }
)