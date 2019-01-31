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
    Tabs, TabHeading
} from "native-base";
import TextInput from 'native-base'


import HeaderView from '../../../ui/header'
import styles from "./styles";

class Todos extends React.Component {
    constructor(props) {
        super(props)

      


        this.state = {
            input_name: "",
            input_desc: "",
            modalVisible: false,
            active_todo_id: 0,
            list_todos: [
                { name:"Start Kit", desc: "Start working on stater kit, brainstorming on starter kit. Define everything regarding it."},
                { name:"Design Kit", desc:"Material Design. Best user interface with latest design practises."},
                { name:"Deploy Kit", desc:"Material Design. Best user interface with latest design practises."},
                { name:"Test Kit", desc:"Material Design. Best user interface with latest design practises."},
            ],
              // EDIT MODAL
            edit_modal_name_input: "",
            edit_modal_desc_input: ""
        }
    }
    //  Properties

    // Methods
    AddTodos = () => {
        // call the backend
        //console.log(this.state.input_name)
        //console.log(this.state.input_desc)
        //console.log(this.state.list_todos)
        Keyboard.dismiss()

        if (this.state.input_name.length > 0 && this.state.input_desc.length > 0) {
            this.setState(
                {
                    list_todos: [...this.state.list_todos,
                    {
                        name: this.state.input_name,
                        desc: this.state.input_desc
                    }]
                });

            // clear the inputs
            this.setState({
                input_name: "",
                input_desc: "",
            })
        }


    }
    HandleNameChg = (val) => {
        this.setState({
            input_name: val
        })
    }
    HandleDescChg = (val) => {
        this.setState({
            input_desc: val
        })
    }
    HandleEditNameChg = (val) => {
        //console.log(val)
        this.setState({
            edit_modal_name_input: val
        })
    }
    HandleEditDescChg = (val) => {
        this.setState({
            edit_modal_desc_input: val
        })
    }

    
    DeepCopy = (data_list) => {
        let net_data = []
        data_list.forEach(element => {
            obj = {
              name: element.name,
              desc: element.desc
            }
            net_data.push(obj)

        });

        return net_data
    }

    UpdateTodo = () =>{
        //console.log('updating')
        //items = Object.assign(this.state.list_todos); // Pull the entire items object out. Using object.assign is a good idea for objects.
        items = this.DeepCopy(this.state.list_todos)
        items[this.state.active_todo_id].name = this.state.edit_modal_name_input; // update the items object as needed
        items[this.state.active_todo_id].desc = this.state.edit_modal_desc_input; // update the items object as needed

        this.setState({ list_todos: items }); 


        this.setModalVisible(false)
    }

    DeleteTodo = () => {
        //console.log("deleting item at index", this.state.active_todo_id)
        items = this.DeepCopy(this.state.list_todos) // Pull the entire items object out. Using object.assign is a good idea for objects.
        //items = Object.assign(this.state.list_todos);
        //console.log(items)
        
        items.splice(this.state.active_todo_id, 1)
        //console.log(this.state.list_todos)

        this.setState({ list_todos: items }); 
        this.setModalVisible(false)

    }

    setModalVisible=(visible,id) =>{
        if(id!==undefined){
            // OPEN THE EDIT MODAL
            //console.log( this.state.list_todos[id] )
            //console.log(id)
            this.setState({
                edit_modal_name_input: this.state.list_todos[id].name,
                edit_modal_desc_input: this.state.list_todos[id].desc
            })
            this.setState({modalVisible: visible, active_todo_id: id});
        }else
        {
            // CLOSE THE EDIT MODAL
            this.setState({
                edit_modal_name_input: "",
                edit_modal_desc_input: ""
            })
            this.setState({modalVisible: visible})
        }
      }
    

    render() {
        return (
            <Container style={styles.container}>
                <HeaderView
                    title='Todo'
                    navigationObj={this.props.navigation} />
                <Content >

                    <View>
                    <Tabs style={{paddingTop:0}}>

                        <Tab heading={<TabHeading style={{backgroundColor: '#6200EE'}}>
                 <Text style={{color: '#ffffff'}}>Create TODOs</Text>
               </TabHeading>}>
                            <View style={styles.create_todo}>
                            
                            <Item regular style={{width:"100%",marginLeft:0 ,marginTop:10 }}>
                                <Input style={{width:"100%",marginLeft:0}} value={this.state.input_name} placeholder='Name' onChangeText={this.HandleNameChg} />
                            </Item>
                            <Textarea value={this.state.input_desc} onChangeText={this.HandleDescChg}  style={ styles.input_desc} rowSpan={5} bordered placeholder="Description" />
                            <Button full onPress={this.AddTodos} primary style={{ height:30, borderRadius:20, backgroundColor:"#03dac6", flex:1, flexGrow:1,flexDirection:"row", textAlign: 'center', height: 30 }}   primary><Text> Submit </Text></Button>

                            </View>
                        </Tab>
                        <Tab heading={<TabHeading style={{backgroundColor: '#6200EE'}}>
                        <Text style={{color: '#ffffff'}}>List TODOs</Text>
                    </TabHeading>}>
                            <View style={styles.todo_container}>
                                {   this.state.list_todos.map( (todo, i)=>(
                                   
                                  <TouchableOpacity key={ i } activeOpacity={0.6} style={{width: "29%", height:180, marginRight:10, marginBottom:10}}  onPress={()=>{this.setModalVisible(true, i)}}>
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
                        contentStyle={{margin:0, marginTop:0, paddingTop:0, padding:0}}
                        style={{marginTop:0, paddingTop:0}}
                        onTouchOutside={ () => this.setModalVisible(false) }
                        visible={ this.state.modalVisible }
                    >
                        <Text full style={{paddingTop:5,fontSize: 18, backgroundColor:"#6200EE", 
                        fontWeight:'500', color:"#fff", height: 35, textAlign:"center"}}> Edit TODO </Text>
                        <View style={{padding:20, alignSelf:"center"}}>
                            <Item regular style={{width:"100%",marginLeft:0}}>
                                <Input 
                                    style={{width:"100%", height:30,marginLeft:0, fontSize:16}}
                                    value={this.state.edit_modal_name_input}
                                    placeholder='Name'
                                    onChangeText={this.HandleEditNameChg}
                                    />
                            </Item>
                            <Textarea 
                                value={this.state.edit_modal_desc_input}
                                rowSpan={4} 
                                bordered 
                                onChangeText={this.HandleEditDescChg}
                                placeholder="Description" 
                                style={{marginBottom:20}}
                                blurOnSubmit={true}
                                onSubmitEditing={()=>{Keyboard.dismiss()}} />
                            <View style={{ flexDirection:"row",justifyContent:"space-around",alignItems :"space-between"}}>
                                <Button   onPress={this.DeleteTodo} style={{  borderRadius:20, backgroundColor:"#ff1744", height: 30 }} primary><Text> Delete  </Text></Button>                            
                                <Button   onPress={this.UpdateTodo} style={{  borderRadius:20, backgroundColor:"#03dac6", height: 30 }} primary><Text> Update  </Text></Button>
                            </View>
                            
                        </View>
                       
                 
              
               
                </Dialog>

                      

                      
                    </View>
                </View>





                </Content>
            </Container>
        )
    }
}

export default Todos;