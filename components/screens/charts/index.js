import React from 'react';
import {
    Container,
    Content,
    Text,
} from "native-base";
import HeaderView from '../../../ui/header'
import styles from "./styles";
class Charts extends React.Component {
    render() {
        return (
            <Container style={styles.container}>
                <HeaderView title='Charts'
                navigationObj={this.props.navigation} />
                <Content padder>
                    <Text>Hello from Charts</Text>
                </Content>
            </Container>
        )
    }
}

export default Charts;