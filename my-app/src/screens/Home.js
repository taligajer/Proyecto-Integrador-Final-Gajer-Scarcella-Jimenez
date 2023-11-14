import { TextInput, FlatList, View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import React, {Component} from 'react'
import {auth, db} from '../firebase/config'
import Post from '../components/Post'

export default class Home extends Component {
    constructor(props){
        super(props)
        this.state={
            posteos: []
        }
    }

    componentDidMount(){
        db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(docs => {
            let arrPosteos = []
            docs.forEach(doc => {
                arrPosteos.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
        this.setState({
            posteos: arrPosteos
        })
        })
    }

    render(){
        return(
            <View style={styles.containerGral} >
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
            flex:1,
            alignItems: 'center',
            backgroundColor:'pink'
        }
    }
)