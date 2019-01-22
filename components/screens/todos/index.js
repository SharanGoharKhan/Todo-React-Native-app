import React from 'react';
import {
    Container,
    Content,
    Text,
} from "native-base";
import HeaderView from '../../../ui/header'
import styles from "./styles";

class Todos extends React.Component {
    render() {
        return (
            <Container style={styles.container}>
                <HeaderView title='Todo'
                navigationObj={this.props.navigation} />
                <Content padder>
                    <Text>Hello from Todo</Text>
                </Content>
            </Container>
        )
    }
}

export default Todos;