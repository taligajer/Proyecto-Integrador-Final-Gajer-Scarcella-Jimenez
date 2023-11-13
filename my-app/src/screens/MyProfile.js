import {Text, View, TouchableOpacity, StyleSheet, FlatList} from 'react-native'
import React, {Component} from 'react'
import {auth, db} from '../firebase/config'
import Post from '../components/Post'

export default class MyProfile extends Component {
    constructor(props){
        super(props)
        this.state = {
            usuario: [],
            posts: []

        }
    }

    componentDidMount(){
        db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot((docs) => { //empaqueta todos los documentos que tenga ahi
            let arrDocs = []
            docs.forEach((doc) => {
                arrDocs.push({
                    id: doc.id,
                    data: doc.data()
                })
            });
            console.log(arrDocs);
            this.setState({
                posts: arrDocs
            }, () => console.log(this.state.posts));
        });
        db.collection('users').where('owner', '==', auth.currentUser.email).onSnapshot((docs) => { //empaqueta todos los documentos que tenga ahi
            let arrDocs = []
            docs.forEach((doc) => {
                arrDocs.push({
                    id: doc.id,
                    data: doc.data()
                })
            });
            console.log(arrDocs);
            this.setState({
                usuario: arrDocs
            });
        });
    }
    
    
    logout(){
        auth.signOut()
        this.props.navigation.navigate('Login')
    }

    render(){
        return(
            <View style={styles.containerGral}>
                {this.state.usuario.length > 0?
                <Text> 
                    Mail: {this.state.usuario[0].data.owner}
                    Name: {this.state.usuario[0].data.name}
                    Minibio: {this.state.usuario[0].data.minibio}
                </Text>
                
                :false}
                
                <FlatList
                    data={this.state.posts}
                    keyExtractor={(item)=> item.id.toString()}
                    renderItem={({item})=> <Post navigation={this.props.navigation} data={item.data} id={item.id}/>}
                />
                <View>
                    <TouchableOpacity
                    style={styles.signOutBtn}
                    onPress={() => this.logout()}
                    >
                        <Text>Cerrar sesion</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerGral:{
        flex:1,
        alignItems: 'center',
        backgroundColor:'pink'
    },
    signOutBtn: {
        backgroundColor: 'red',
        padding: 16
    }
})