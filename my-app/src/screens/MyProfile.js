import {Text, View, TouchableOpacity, StyleSheet, FlatList, Alert, Modal} from 'react-native'
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
                <View>
                    <View>
                        <Text style={styles.letra}> {this.state.usuario[0].data.owner}</Text>
                    </View>
                    <View>
                        <Text style={styles.letra}> @{this.state.usuario[0].data.name}</Text>
                    </View>
                    <View>
                        <Text style={styles.letra}> minibio: {this.state.usuario[0].data.minibio}</Text>
                    </View>
                    
                </View>
                
                :false}
                <View> 
                    <Text> Mis posteos </Text>
                    <Text>Cantidad: {this.state.posts.length}</Text>
                    </View>
                 
                <FlatList
                    data={this.state.posts}
                    keyExtractor={(item)=> item.id.toString()}
                    renderItem={({item})=> ( <> 
                    <Post navigation={this.props.navigation} data={item.data} id={item.id}/>
                    <TouchableOpacity onPress={() => this.confirmarBorrarPost(item)}>
                    <Text>Borrar Post</Text>
                    </TouchableOpacity>
                    </>
                    )}
                    />
                    <Modal 
                animationType="slide" 
                transparent={true}  
                visible={this.state.modalVisible}>
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
             <Text> ¿Estás seguro de que quieres eliminar este posteo?</Text>
            
            <TouchableOpacity
            onPress={() => this.finalBorrarPost()}
            >
            <Text>Aceptar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.noBorrarPost()}
            >
              <Text>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    letra:{
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    signOutBtn: {
        backgroundColor: 'red',
        padding: 16
    },
    deleteBtn: {
        backgroundColor: 'purple',
        padding: 20,
        borderRadius: 10,
        marginBottom: 10,
      }
})