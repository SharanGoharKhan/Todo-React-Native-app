import React from 'react';
import {
    Container,
    Content,
    Text,
    Button,
    Input
} from "native-base";
import {
    SafeAreaView,
    KeyboardAvoidingView,
    ScrollView,
    View
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
                'this is a very long message just to see if it is working or not but i am not sure if it will be able to work this is a very long message just to see if it is working or not but i am not sure if it will be able to work this is a very long message just to see if it is working or not but i am not sure if it will be able to work'
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
        return (
            <Container>
                <SafeAreaView style={styles.container}>
                    <HeaderView title='Chat'
                        navigationObj={this.props.navigation} />
                    <KeyboardAvoidingView style={styles.keyboardAvoidContainer} behavior="padding">
                        <ScrollView
                            ref="scrollView"
                            onContentSizeChange={(width, height) => this.refs.scrollView.scrollTo({ y: height })}
                            style={styles.srcollViewContainer}>
                            {this.state.messagesSent.map((message, key) => (
                                <View style={styles.messageSendContainer} key={key}>
                                    <View style={styles.messageSendView}>
                                        <Text style={styles.messageText}>{message}</Text>
                                    </View>
                                </View>
                            ))}
                        </ScrollView>
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