import {Text, View, TouchableOpacity, StyleSheet, FlatList, Alert, Modal, Image} from 'react-native'
import React, {Component} from 'react'
import {auth, db} from '../firebase/config'
import Post from '../components/Post'

export default class MyProfile extends Component {
    constructor(props){
        super(props)
        this.state = {
            usuario: [],
            posts: [],
            modalVisible: false,
            postToDelete: null,

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

    borrarPost(item) {
        db.collection('posts').doc(item.id).delete()
        .then(() => alert('El post se ha eliminado'));
      }

      confirmarBorrarPost(item) {
        this.setState({ modalVisible: true, postToDelete: item });
      }
      
      finalBorrarPost() {
        this.borrarPost(this.state.postToDelete);
        this.setState({ modalVisible: false, postToDelete: null });
      }
      
      noBorrarPost() {
        this.setState({ modalVisible: false, postToDelete: null });
      }

    render(){
        return(
            <View style={styles.containerGral}>
                {this.state.usuario.length > 0?
                 <View style={styles.perfilInfoContainer}>
                <View>
                    <View>
                        <Text style={styles.perfilInfoTextMail}> {this.state.usuario[0].data.owner}</Text>
                    </View>
                    <View>
                        <Text style={styles.perfilInfoText}> {this.state.usuario[0].data.name}</Text>
                    </View>
                    <View>
                        <Text style={styles.minibioText}> minibio: {this.state.usuario[0].data.minibio}</Text>
                    </View>
                {this.state.usuario[0].data.fotoDePerfil == ''?
                ''
                :
                <Image source={{ uri: this.state.usuario[0].data.fotoDePerfil }} style={styles.imagen}/>
                } 
                </View>
                </View>
                
                :false}
                <View style={styles.misPosteosContainer}>
                    <Text style={styles.perfilInfoText}> Mis posteos </Text>
                    <Text style={styles.minibioText}>Cantidad de posteos: {this.state.posts.length}</Text>
                    </View>
                 
                <FlatList
                    style={styles.misPosteosContainer2}
                    data={this.state.posts}
                    keyExtractor={(item)=> item.id.toString()}
                    renderItem={({item})=> ( <> 
                    <Post navigation={this.props.navigation} data={item.data} id={item.id}/>
                    <TouchableOpacity onPress={() => this.confirmarBorrarPost(item)}>
                    <Text style={styles.borrarPost}>Borrar Post</Text>
                    </TouchableOpacity>
                    </>
                    )}
                    contentContainerStyle={styles.flatlistContent}
                    />
                    <Modal 
                animationType="slide" 
                transparent={true}  
                visible={this.state.modalVisible}>
                <View style={styles.view}>
                <View >
             <Text> ¿Estás seguro de que quieres eliminar este posteo?</Text>
            
            <TouchableOpacity
            onPress={() => this.finalBorrarPost()}
            >
            <Text style={styles.btn}>Aceptar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.noBorrarPost()}
            >
              <Text style={styles.btn}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
                <View>
                    <TouchableOpacity
                    style={styles.cerrar}
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
        backgroundColor: '#ECECE3',
        paddingTop: 20,
    },
    flatlistContent: {
        paddingBottom: 100, 
        paddingTop: 20,
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
    cerrar: {
        backgroundColor: 'grey',
        padding: 10, 
        borderRadius: 8, 
        marginTop: 20, 
    },
    borrarPost: {
        backgroundColor: "#002454",
        padding: 16,
        borderRadius: 8,
        marginBottom: 10,
        color: '#ECECE3',
        textAlign: 'center',
      },
      view:{
        width: 500,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingTop: 20,
      },
    btn:{
        maxWidth: 200,
        backgroundColor: "#002454",
        padding: 16,
        margin: 10
    },
    imagen: {
        height: 150,
        width: 150,
        borderRadius: 75,
        marginBottom: 20,
      },
      misPosteosContainer: {
        width: '100%',
        marginBottom: 20,
      },
      misPosteosContainer2: {
        width: '60%',
        marginBottom: 20,
      },
})