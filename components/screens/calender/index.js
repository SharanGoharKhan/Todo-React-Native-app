import React from 'react';
import { DrawerActions } from 'react-navigation-drawer';
import {
    Container,
    Header,
    Title,
    Content,
    Text,
    Button,
    Icon,
    Footer,
    FooterTab,
    Left,
    Right,
    Body
} from "native-base";
import styles from "./styles";

class Calendar extends React.Component {
    render() {
        return (
            <Container style={styles.container}>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.dispatch(DrawerActions.toggleDrawer())}
                        >
                            <Icon name="ios-menu" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Calendar</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder>
                    <Text>Hello from Calendar</Text>
                </Content>
                <Footer>
                    <FooterTab>
                        <Button active full>
                            <Text>Footer</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        )
    }
}

export default Calendar;