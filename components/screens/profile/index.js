import React from 'react';
import {
    Container,
    Content,
    Text,
} from "native-base";
import HeaderView from '../../../ui/header'
import styles from "./styles";

class Profile extends React.Component {
    render() {
        return (
            <Container style={styles.container}>
                <HeaderView 
                title='Profile'
                navigationObj={this.props.navigation} />
                <Content padder>
                    <Text>Hello from Profile</Text>
                </Content>
            </Container>
        )
    }
}

export default Profile;