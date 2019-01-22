import React from 'react';
import {
    Container,
    Content,
    Text,
} from "native-base";
import HeaderView from '../../../ui/header'
import styles from "./styles";

class Chat extends React.Component {
    render() {
        return (
            <Container style={styles.container}>
                <HeaderView title='Chat'
                navigationObj={this.props.navigation} />
                <Content padder>
                    <Text>Hello from Chat</Text>
                </Content>
            </Container>
        )
    }
}

export default Chat;