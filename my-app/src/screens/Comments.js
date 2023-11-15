import {FlatList, Text, View} from 'react-native'
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
            <View>
            <Text>Comments</Text>
            {
            this.state.dataPost !== null ?
                this.state.dataPost.comentarios.length > 0 ?
                    <FlatList
                        data={this.state.dataPost.comentarios}
                        keyExtractor = {(item)=> item.createdAt.toString()}
                        renderItem={({item})=> <View>
                            <Text>{item.owner}</Text>
                            <Text>{item.comentario}</Text>
                        </View> }
                    />
                     :
                     <Text> Aun no hay comentarios </Text>
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