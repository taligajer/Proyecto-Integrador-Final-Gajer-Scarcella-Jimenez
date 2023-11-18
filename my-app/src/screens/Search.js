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
          || //wtf
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
          <View>

            <FormSearch filtrarUsuarios={(nombre) => this.filtrarUsuarios(nombre)} actualizarInput={(valor) => this.actualizarInput(valor)} />

            {this.state.valor != '' ? (

              this.state.usuarios.length != 0 ?

                <FlatList
                  data={this.state.usuarios}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) =>
                  <View>
                  <TouchableOpacity onPress={() => this.irAlPerfil(item.data.owner)}>
                    <Text >{item.data.name}</Text>
                    <Text>Email: {item.data.owner}</Text>
                    </TouchableOpacity>
                  

                    </View>
                }

                  
                />
                :
                <Text>No se han encontrado resultados</Text>
            ) : (
              <Text>Busca un usuario</Text>
            )}
          </View>
        );
      }
    }    