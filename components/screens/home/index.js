import React from 'react';
import {
    Container,
    Content,
    Text,
} from "native-base";
import HeaderView from '../../../ui/header'
import styles from "./styles";

class Home extends React.Component {
    render() {
        return (
            <Container style={styles.container}>
                <HeaderView 
                title='Home'
                navigationObj={this.props.navigation}/>
                <Content padder>
                    <Text>Hello from Home</Text>
                </Content>
            </Container>
        )
    }
}

export default Home;