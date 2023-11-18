import {Text, View, TouchableOpacity, StyleSheet, FlatList} from 'react-native'
import React, {Component} from 'react'
import {auth, db} from '../firebase/config'
import Post from '../components/Post'

export default class UserProfile extends Component {
    constructor(props){
        super(props)
        this.state = {
            usuarios: [],
            posts: [],
        }
    }

    componentDidMount(){
        db.collection('users').where('owner', '==', this.props.route.params.user).onSnapshot((docs) => { //empaqueta todos los documentos que tenga ahi
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
        db.collection('posts').where('owner', '==', this.props.route.params.user).onSnapshot((docs) => { //empaqueta todos los documentos que tenga ahi
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
    }
    
    
    render(){
        return(
            <View style={styles.containerGral}>
                <View>
                    <FlatList
                        data={this.state.usuarios}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <View>
                            <Text>Usuario: {item.data.name}</Text>
                            <Text>Email: {item.data.owner}</Text>
                            {item.data.minibio ?
                                <Text>Minibio: {item.data.minibio}</Text>
                                :
                                ''
                            }
                        </View>
                        }
                    />
                </View>
                <Text>Posteos</Text>
                <Text>Cantidad: {this.state.posts.length}</Text>
                <FlatList
                    data={this.state.posts}
                    keyExtractor={(item)=> item.id.toString()}
                    renderItem={({item})=> <Post navigation={this.props.navigation} data={item.data} id={item.id}/>}
                />
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
    letra:{
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    }
})