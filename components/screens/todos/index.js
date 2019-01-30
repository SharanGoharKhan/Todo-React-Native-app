import React from 'react';
import { Keyboard } from 'react-native'
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
    constructor(props) {
        super(props)


        this.state = {
            input_name: "",
            input_desc: "",
            list_todos: [
                { name: "Go to uni", desc: "Sir Waseem 1visit karna hai" },
                { name: "Go to uni2", desc: "Sir Waseem v2isit karna hai" },
                { name: "Go to uni3", desc: "Sir Waseem v2isit karna hai" },



            ]
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

    render() {
        return (
            <Container style={styles.container}>
                <HeaderView
                    title='Todo'
                    navigationObj={this.props.navigation} />
                <Content >

                    <View>
                        <Tabs style={{ paddingTop: 0 }}>
                            <Tab heading="Create TODO">
                                <View style={styles.create_todo}>
                                    <Item regular style={{ width: "100%", marginLeft: 0 }}>
                                        <Input style={{ width: "100%", marginLeft: 0 }} value={this.state.input_name} placeholder='Name' onChangeText={this.HandleNameChg} />
                                    </Item>
                                    <Textarea value={this.state.input_desc} onChangeText={this.HandleDescChg} style={styles.input_desc} rowSpan={5} bordered placeholder="Description" />
                                    <Button onPress={this.AddTodos} style={{ width: "100%" }} primary><Text> Submit </Text></Button>

                                </View>
                            </Tab>
                            <Tab heading="List TODOs">
                                <View style={styles.todo_container}>
                                    {this.state.list_todos.map((todo) => (

                                        <Card style={{ width: "30%", height: 180, marginRight: 'auto' }}>
                                            <CardItem header>
                                                <Text>{todo.name}</Text>
                                            </CardItem>
                                            <CardItem>
                                                <Body>
                                                    <Text>
                                                        {
                                                            todo.desc.length > 15 ? todo.desc.substr(0, 15) + "..." : todo.desc
                                                        }
                                                    </Text>
                                                </Body>
                                            </CardItem>

                                        </Card>
                                    )
                                    )}

                                </View>
                            </Tab>

                        </Tabs>
                    </View>





                </Content>
            </Container>
        )
    }
}

export default Todos;