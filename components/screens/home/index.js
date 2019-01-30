import React from 'react';
import {
    Container,
    Content,
    Text,
} from "native-base";
import {
    View,
    Dimensions
} from 'react-native'
import HeaderView from '../../../ui/header'
import styles from "./styles";

class Home extends React.Component {
    render() {
        const deviceWidth = Dimensions.get('window').width
        const deviceHeight = Dimensions.get('window').height
        return (
            <Container style={styles.container}>
                <HeaderView 
                title='Home'
                navigationObj={this.props.navigation}/>
                <Content padder>
                    <View style={{alignItems:'center'}}>
                        <Text style={{fontSize:20,color: '#03dac6',fontWeight:'700'}}>Welcome to Todo Starter kit</Text>
                    </View>
                </Content>
            </Container>
        )
    }
}

export default Home;