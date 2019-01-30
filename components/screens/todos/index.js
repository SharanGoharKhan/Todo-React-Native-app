import React from 'react';
import {Keyboard, TouchableOpacity, Modal} from 'react-native'
import { Dialog } from "react-native-simple-dialogs";

import {
    View,
    Container,
    Content,
    Text,
    Item,
    Input,
    Textarea,
    Button, 
    Card,
    CardItem,
    Body,
    Tab,
    Tabs 
} from "native-base";
import TextInput from 'native-base'


import HeaderView from '../../../ui/header'
import styles from "./styles";

class Todos extends React.Component {
    constructor(props){
        super(props)


        this.state = {
            input_name: "",
            input_desc: "",
            modalVisible: false,
            active_todo_id: 0,
            list_todos: [
                { name:"Go to uni", desc:"Sir Waseem 1visit karna hai"},
                { name:"Go to uni2", desc:"Sir Waseem v2isit karna hai"},
                { name:"Go to uni3", desc:"Sir Waseem v2isit karna hai"},
            ]
        }
    }
    //  Properties

    // Methods
    AddTodos=()=>{
        // call the backend
        //console.log(this.state.input_name)
        //console.log(this.state.input_desc)
        //console.log(this.state.list_todos)
        Keyboard.dismiss()

        if( this.state.input_name.length > 0 && this.state.input_desc.length > 0){
            this.setState(
                {
                    list_todos:[...this.state.list_todos,
                        {name: this.state.input_name, 
                        desc: this.state.input_desc
                        }]
                });
            
            // clear the inputs
            this.setState({
                input_name:"",
                input_desc:"",
            })
        }


    }
    HandleNameChg=(val)=>{
        this.setState({
            input_name: val
        })
    }
    HandleDescChg=(val)=>{
        this.setState({
            input_desc: val
        })
    }

    setModalVisible=(visible,id) =>{
        if(id!==undefined){
            console.log( this.state.list_todos[id] )
            console.log(id)
            this.setState({modalVisible: visible, active_todo_id: id});
        }else
        this.setState({modalVisible: visible})
        
      }
    

    render() {
        return (
            <Container style={styles.container}>
                <HeaderView title='Todo'
                navigationObj={this.props.navigation} />
                <Content >

                    <View>
                    <Tabs style={{paddingTop:0}}>

                        <Tab heading="Create TODO">
                            <View style={styles.create_todo}>
                            
                            <Item regular style={{width:"100%",marginLeft:0}}>
                                <Input style={{width:"100%",marginLeft:0}} value={this.state.input_name} placeholder='Name' onChangeText={this.HandleNameChg} />
                            </Item>
                            <Textarea value={this.state.input_desc} onChangeText={this.HandleDescChg}  style={ styles.input_desc} rowSpan={5} bordered placeholder="Description" />
                            <Button full onPress={this.AddTodos} style={{  flex:1, flexGrow:1,flexDirection:"row", textAlign: 'center', height: 30 }}   primary><Text> Submit </Text></Button>

                            </View>
                        </Tab>
                        <Tab heading="List TODOs">
                            <View style={styles.todo_container}>
                                {   this.state.list_todos.map( (todo, i)=>(
                                   
                                  <TouchableOpacity key={ i } activeOpacity={0.6} style={{width: "30%", height:180,marginRight: 'auto', marginBottom:10}}  onPress={()=>{this.setModalVisible(true, i)}}>
                                    <Card key={ i } style={{width:"100%", height:"100%", padding:0, margin:0}}>
                                        <CardItem header>
                                        <Text>{todo.name}</Text>
                                        </CardItem>
                                        <CardItem>
                                        <Body>
                                            <Text>
                                                {
                                                    todo.desc.length > 15? todo.desc.substr(0,15)+"...": todo.desc
                                                }
                                            </Text>
                                        </Body>
                                        </CardItem>
                                    </Card>
                                  </TouchableOpacity>

                                    )
                                )}
        
                        </View>
                        </Tab>
                     
                    </Tabs>
                    
                    <View style={{fontSize: 16}} >

                    <Dialog
                        animationType="fade"
                        contentStyle={{margin:0, padding:0}}
                        style={{marginTop:0, paddingTop:0}}
                        onTouchOutside={ () => this.setModalVisible(false) }
                        visible={ this.state.modalVisible }
                    >
                        <Text full style={{margin:0, padding:0,fontSize: 18, paddingLeft:0, backgroundColor:"#388e3c", 
                        fontWeight:"bold", color:"#fff"}}> Edit TODO </Text>
                        <Text>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </Text>
                        <Text >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </Text>
                 
              
                    <Button
                        onPress={ () => this.setModalVisible(false) }
                        style={ { marginTop: 10 } }
                        title="CLOSE"
                    />
                </Dialog>

                      

                      
                    </View>
                </View>


            
                    
                   
                </Content>
            </Container>
        )
    }
}

export default Todos;