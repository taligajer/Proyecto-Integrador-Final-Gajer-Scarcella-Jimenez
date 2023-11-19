import {Text, View, TouchableOpacity, StyleSheet, FlatList, Image} from 'react-native'
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
                usuarios: arrDocs
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
                <View style={styles.perfilInfoContainer}>
                    <FlatList
                        data={this.state.usuarios}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <View>
                            <Text style={styles.perfilInfoText}>Usuario: {item.data.name}</Text>
                            <Text style={styles.perfilInfoTextMail}>Email: {item.data.owner}</Text>
                            {item.data.minibio ?
                                <Text style={styles.minibioText}>Minibio: {item.data.minibio}</Text>
                                :
                                ''
                            }
                            {item.data.fotoDePerfil == '' ?
                            ''
                            :
                            <Image source={{ uri: item.data.fotoDePerfil }} style={styles.imagen} />
                            }
                            
                        </View>
                       
                        }
                        
                    />

                </View>
               <View style={styles.misPosteosContainer}>
                <Text style={styles.perfilInfoText}>Posteos</Text>
                <Text style={styles.minibioText} >Cantidad: {this.state.posts.length}</Text>
                </View>
                <FlatList
                    data={this.state.posts}
                    keyExtractor={(item)=> item.id.toString()}
                    renderItem={({item})=> <Post navigation={this.props.navigation} data={item.data} id={item.id}/>}
                    contentContainerStyle={styles.flatlistContent}
                />
              
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerGral:{
        flex:1,
        alignItems: 'center',
        backgroundColor: '#ECECE3'
    },
    imagen: {
        height: 150,
        width: 150,
        borderRadius: 75,
        marginBottom: 20,
      },
      perfilInfoContainer: {
        width: '10',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 15,
        marginBottom: 20,
        alignItems: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 5,
      },
      perfilInfoText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 10,
        textAlign: 'center',
      },
      perfilInfoTextMail: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 10,
        textAlign: 'center',
      },
      minibioText: {
        fontSize: 16,
        color: '#666666',
        textAlign: 'center',
        marginBottom: 10,
      },
      flatlistContent: {
        paddingBottom: 100, 
        paddingTop: 20,
      },
      misPosteosContainer: {
        width: '100%',
        marginBottom: 20,
      },

})