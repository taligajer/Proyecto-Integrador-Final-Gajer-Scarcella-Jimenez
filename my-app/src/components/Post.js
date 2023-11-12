import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native'
import {FontAwesome} from '@expo/vector-icons'
import React, {Component} from 'react'
import { db, auth } from '../firebase/config';
import firebase from 'firebase';

export default class Post extends Component {
    constructor(props){
        super(props)
        this.state={
            likes:0,
            estaMiLike:false
        }
    }

    componentDidMount(){ //validamos si esta mi like
        console.log(this.props.data)
        let validacionLike = this.props.data.likes.includes(auth.currentUser.email) //buscamos el usuario logueado con include --> devuelve true o false
        this.setState({
            estaMiLike: validacionLike
        })
    }

    like(){
        db
        .collection('posts')
        .doc(this.props.id)
        .update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then((resp) =>{
            this.setState({
                estaMiLike:true
            })
        })
        .catch((err) => console.log(err))}
    
        unlike(){
            db
            .collection('posts')
            .doc(this.props.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email) //remove porque saca el like
            })
            .then((resp) =>{
                this.setState({
                    estaMiLike:false
                })
            })
            .catch((err) => console.log(err))
        }

        irAComentar(){
            this.props.navigation.navigate('Comments', {id: this.props.id})

        }
    render(){
        return(
            <View style={styles.container}>
                <Image style={styles.fotoUrl} source= {{uri: this.props.data.fotoUrl ? this.props.data.fotoUrl: ''}}/>
                {console.log(this.props.data)}
                <Text>{this.props.data.descripcion}</Text>
                <View style={styles.containerChico}>
                    <Text>{this.props.data.likes.length}</Text>
                    {
                        this.state.estaMiLike ?
                    <TouchableOpacity onPress={()=> this.unlike()}>
                    <FontAwesome name='heart' color='red' size={25}/>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={()=> this.like()}>
                    <FontAwesome name='heart-o' color='red' size={25}/>
                    </TouchableOpacity>
                    }
                </View>
                <View>
                
                    <TouchableOpacity
                    onPress ={()=> this.irAComentar()}
                    >
                        <Text>Comentar</Text>
                    </TouchableOpacity>
                </View>
                
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
        alignItems: 'center',
        margin: '10px' 
    },
    container:{
        flex:2,
        alignContent: 'centrer',
        backgroundColor:'white',
        margin: '30px'
    },
    containerChico:{
        flex:1
    }
    
})