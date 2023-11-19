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
        irAlPerfil() {
            this.props.data.owner == auth.currentUser.email
              ? this.props.navigation.navigate('MyProfile')
              : this.props.navigation.navigate('UserProfile', { user: this.props.data.owner });
          }
    render(){
        return(
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.irAlPerfil()}>
                <Text style={styles.nombreUsuario}>{this.props.data.owner}</Text>
                </TouchableOpacity>
                <Image style={styles.fotoUrl} source= {{uri: this.props.data.fotoUrl ? this.props.data.fotoUrl: ''}}/>
                {/* {console.log(this.props.data)} */}
                <Text style = {styles.descripcionPost}>{this.props.data.descripcion}</Text>
                <View style={styles.containerChico}>
                    <Text>{this.props.data.likes.length} likes </Text>
                    {
                        this.state.estaMiLike ?
                    <TouchableOpacity onPress={()=> this.unlike()} style={styles.icono}>
                    <FontAwesome name='heart' color='red' size={25}/>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={()=> this.like()} style={styles.icono}>
                    <FontAwesome name='heart-o' color='red' size={25}/>
                    </TouchableOpacity>
                    }
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text>{this.props.data.comentarios.length} comentarios </Text>
                    <TouchableOpacity
                    onPress ={()=> this.irAComentar()}
                    >
                       <FontAwesome name='comment-o' size={15} style={styles.icono}/>
                    </TouchableOpacity>
                </View>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    fotoUrl:{
        height: 400,
        width: '100%', 
        overflow: 'hidden', 
        marginBottom: 10,
    },
    container:{
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10,
        overflow: 'hidden', 
        elevation: 3, 
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    containerChico:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },

    nombreUsuario:{
        fontFamily: 'DM Sans',
        color: '#002454',
        fontSize: 15,
        fontWeight: 'bold',
        padding: 10,
    },
    descripcionPost:{
        fontFamily: "DM Sans",
        fontSize: 20 ,
        padding: 10,
    },
    icono: {
        marginRight: 10,
    }
})