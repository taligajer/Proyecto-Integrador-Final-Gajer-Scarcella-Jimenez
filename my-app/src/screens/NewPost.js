import {Text, View} from 'react-native'
import React, {Component} from 'react'
import {auth, db} from '../firebase/config'
import FormDescripcionPost from '../components/FormDescripcionPost'

export default class NewPost extends Component {
    constructor(props){
        super(props)
    }

    onSubmit({descripcion}){
        db.collection('posts').add({
            owner: auth.currentUser.email,
            createdAt: Date.now(),
            descripcion: descripcion
        })
        .then()
        .catch((e) => console.log(e))
    }
    render(){
        return(
            <View>
            <Text>
                New Post
            </Text>
            <FormDescripcionPost
            onSubmit={(obj) => this.onSubmit(obj)} 
            />
            </View>
        )
    }
}