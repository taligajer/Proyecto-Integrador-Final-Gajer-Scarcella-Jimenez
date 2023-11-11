import {Text, View, TouchableOpacity, StyleSheet, FlatList} from 'react-native'
import React, {Component} from 'react'
import {auth, db} from '../firebase/config'
import Post from '../components/Post'

export default class MyProfile extends Component {
    constructor(props){
        super(props)
        this.state = {
            usuarios: [],
            posts: []

        }
    }

    componentDidMount(){
        console.log(arrDocs);
        db.collection('users').where('owner', '==', auth.currentUser.email).onSnapshot((docs) => { //empaqueta todos los documentos que tenga ahi
            let arrDocs = []
            docs.forEach((doc) => {
                arrDocs.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            this.setState({
                usuarios: arrDocs
            }, () => console.log(this.state.usuarios))
            
        })
    }
    
    
    logout(){
        auth.signOut()
        this.props.navigation.navigate('Register')
    }

    render(){
        return(
            <View>
                <Text>El email del usuario es:</Text>
                    <FlatList 
                        data={this.state.usuarios}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => <View>
                        <Text>{item.data.name} </Text>
                        <Text>{item.data.minibio}</Text>
                        </View>
                        }
                    />
                <View>
                    <TouchableOpacity
                    style={signOutBtn}
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
    signoutBtn: {
        backgroundColor: 'red',
        padding: 16
    }
})