import React,{Component} from 'react';
import {Keyboard, TouchableOpacity} from 'react-native'
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
import Modal from 'react-native-modal'
import TextInput from 'native-base'

import HeaderView from '../../../ui/header'
import styles from "./styles";

class Edit_Todo extends Component{
    constructor(props){
        super(props)
    }
    setModalVisible=(visible)=> {
        this.setState({modalVisible: visible});
      }
    render(){
        return (
            <View style={{marginTop: 22}}>
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                        }}>
                    <View style={{marginTop: 22}}>
                        <View>
                        <Text>Hello World!</Text>

                        <TouchableOpacity
                            onPress={() => {
                            this.setModalVisible(!this.state.modalVisible);
                            }}>
                            <Text>Hide Modal</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                    </Modal>

                    <TouchableOpacity
                    onPress={() => {
                        this.setModalVisible(true);
                    }}>
                    <Text>Show Modal</Text>
                    </TouchableOpacity>
                </View>
      )}

}

export default Edit_Todo