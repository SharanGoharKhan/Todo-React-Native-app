import React from 'react';
import {
    Container, 
    Text,
    Button,
    Input
} from "native-base";
import {
    SafeAreaView,
    KeyboardAvoidingView,
    ScrollView,
    View,
    Image,
    Dimensions
} from 'react-native';
import HeaderView from '../../../ui/header'
import styles from "./styles";

class Chat extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            message: '',
            messagesSent: [
                'hello',
                'is',
                'it',
                'me',
                'ok got it!'
            ],
            messagesReceived: [
                'hey',
                'you there?',
                'this message is recieved'
            ]
        }

    }
    onSendMessage = () => {
        if (this.state.message)
            this.setState(prevState => ({
                messagesSent: [...prevState.messagesSent, this.state.message],
                message: ''
            }))
    }
    render() {
        let width = Dimensions.get('window').width
        let height = Dimensions.get('window').height
        return (
            <Container>
                <SafeAreaView style={styles.container}>
                    <HeaderView title='Chat'
                        navigationObj={this.props.navigation} />
                    <KeyboardAvoidingView style={styles.keyboardAvoidContainer} behavior="padding">
                        <View style={{flex:1, backgroundColor: 'transparent'}}>
                            <View>
                                <Image style={{ height: height, width: width, position: 'absolute', top:0, left:0 }} source={{ uri: 'https://i.pinimg.com/originals/0f/05/27/0f05274b1bdc8feed70822513cd7a903.jpg' }} />
                            </View>
                            <ScrollView
                                ref="scrollView"
                                onContentSizeChange={(width, height) => this.refs.scrollView.scrollTo({ y: height })}
                                style={styles.srcollViewContainer}>
                                {this.state.messagesReceived.map((message,key) => (
                                    <View style={styles.messageRecieveContainer} key={key}>
                                        <View style={{flexDirection:'row'}}>
                                            <View style={{width:30,height:30,marginLeft:5}}>
                                                <Image style={{width:'100%',height:'100%',borderRadius:50}} source={require('../../../assets/pic_profile_1.jpg')} />
                                            </View>
                                            <View style={styles.messageRecieveView}>
                                                <Text style={styles.messageText}>{message}</Text>
                                            </View>
                                        </View>
                                    </View>    
                                ))}
                                {this.state.messagesSent.map((message, key) => (
                                    <View style={styles.messageSendContainer} key={key}>
                                        <View style={{flexDirection: 'row'}}>
                                            <View style={styles.messageSendView}>
                                                <Text style={styles.messageText}>{message}</Text>
                                            </View>
                                            <View style={{width:30,height:30,marginRight:5}}>
                                                <Image style={{width:'100%',height:'100%',borderRadius:50}} source={require('../../../assets/pic_profile_2.jpg')} />
                                            </View>
                                        </View>
                                    </View>
                                ))}
                            </ScrollView>
                        </View>
                        <View style={styles.chatInputContainer}>
                            <Input
                                style={styles.chatInput}
                                placeholder={'Enter message here'}
                                autoCorrect={false}
                                autoCapitalize='none'
                                returnKeyType="send"
                                value={this.state.message}
                                onFocus={() => this.refs.scrollView.scrollToEnd({ animated: true })}
                                onChangeText={(data) => {
                                    this.setState({ message: data })
                                }}
                            />
                            <Button
                                style={styles.chatSendButton}
                                success
                                onPress={() => { this.onSendMessage() }}>
                                <Text style={{ color: 'white' }}>Send</Text>
                            </Button>
                        </View>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </Container>
        )
    }
}

export default Chat;