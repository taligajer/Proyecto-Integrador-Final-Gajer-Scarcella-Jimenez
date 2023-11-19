import {FlatList, Text, View, StyleSheet} from 'react-native'
import React, {Component} from 'react'
import {auth, db} from '../firebase/config'
import FormComentarios from '../components/FormComentarios'

export default class Comments extends Component {
    constructor(props){
        super(props)
        this.state = {
            dataPost: null,
            haycoments: false
        }
    }
     componentDidMount(){
        db
        .collection("posts")
        .doc(this.props.route.params.id)
        .onSnapshot((doc)=> {
            this.setState({dataPost: doc.data()},
            () => {
                if (this.state.dataPost.comentarios.length > 0) {
                    this.setState({
                        haycoments: true,
                        comentarios: this.state.dataPost.comentarios.reverse(),
                    })
                }
            }
            )

        })
     }
    render(){
        return(
            <View style={styles.container}>
            <Text style={styles.commentsTitle}>Comentarios</Text>
            {
            this.state.dataPost !== null ?
                this.state.dataPost.comentarios.length > 0 ?
                    <FlatList
                        data={this.state.dataPost.comentarios}
                        keyExtractor = {(item)=> item.createdAt.toString()}
                        renderItem={({item})=> 
                        <View style={styles.commentContainer}>
                            <Text style={styles.commenterName}>{item.owner}</Text>
                            <Text style={styles.commentText}>{item.comentario}</Text>
                        </View> }
                    />
                     :
                     <Text style={styles.noCommentsText}> Aun no hay comentarios </Text>
            :
            ''
        }
           
            < FormComentarios 
            postId = {this.props.route.params.id}
            />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    commentsTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    commentContainer: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
    },
    commenterName: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    commentText: {
      fontSize: 14,
    },
    noCommentsText: {
      fontSize: 16,
      fontStyle: 'italic',
      color: '#888',
      marginTop: 12,
    },
  });