import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FormSearch from '../components/FormSearch';
import { db, auth } from '../firebase/config';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuarios: [],
      backup: [],
      valor: ''
    };
  }

  componentDidMount() {
    db.collection('users').onSnapshot((docs) => {
      let usuarios = [];

      docs.forEach((doc) => {
        usuarios.push({ 
            id: doc.id, 
            data: doc.data() })
      });

      this.setState({ 
        usuarios, 
        backup: usuarios })
    });
    }

    filtrarUsuarios(name) {

        let usuariosFiltrados = this.state.backup.filter(
          (elm) => 
          elm.data.name.toLowerCase().includes(name.toLowerCase())
          || 
          elm.data.owner.toLowerCase().includes(name.toLowerCase()) 

        );

        this.setState({
          usuarios: usuariosFiltrados
        });
      }

      actualizarInput(valor) {
        this.setState({
          valor: valor
        });
      }
    
      irAlPerfil(owner) {
        owner == auth.currentUser.email ?

          this.props.navigation.navigate('MyProfile')
          :
          this.props.navigation.navigate('UserProfile', { user: owner })
      }

      render() {
        return (
          <View style={styles.container}>
            <Text style= {styles.titulo}>Buscador de Usuarios</Text>
            <FormSearch filtrarUsuarios={(nombre) => this.filtrarUsuarios(nombre)} actualizarInput={(valor) => this.actualizarInput(valor)} />

            {this.state.valor != '' ? (

              this.state.usuarios.length != 0 ?

                <FlatList
                  style={styles.resultadosContainer}
                  data={this.state.usuarios}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) =>
                  <View>
                  <TouchableOpacity 
                    style={styles.usuarioItem}
                    onPress={() => this.irAlPerfil(item.data.owner)}>
                    <Text style={styles.nombreUsuario}>{item.data.name}</Text>
                    <Text style={styles.emailUsuario}>Email: {item.data.owner}</Text>
                    </TouchableOpacity>
                  

                    </View>
                }

                  
                />
                :
                <Text style={styles.noResultadosText}>No se han encontrado resultados</Text>
            ) : (
              <Text style={styles.buscaUsuarioText}>Busca un usuario</Text>
            )}
          </View>
        );
      }
    }    

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ECECE3',
        padding: 20,
      },
      titulo:{
        marginBottom:10,
        textAlign:'center',
        fontSize: 24,
        fontWeight: 'bold',
    },

    resultadosContainer: {
      width: '100%',
    },
    usuarioItem: {
      marginBottom: 20,
      padding: 10,
      backgroundColor: 'white',
      borderRadius: 8,
      width: '100%',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    nombreUsuario: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    emailUsuario: {
      color: 'gray',
    },
    noResultadosText: {
      color: 'red', 
      textAlign: 'center',
      fontSize: 16,
    },
    buscaUsuarioText: {
      textAlign: 'center',
      fontSize: 16,
    },
  })