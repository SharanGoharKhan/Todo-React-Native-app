import React from 'react';
import { connect } from 'react-redux'
import {
    Container,
    Content,
    Text,
    View,
    Button,
} from "native-base";
import { ImagePicker } from 'expo'
import { TextInput, Image } from 'react-native'
import HeaderView from '../../../ui/header'
import { ValidateInput, constraints } from '../../utility/constraints'
import { updateProfile } from '../../../store/actions/auth/login'
import styles from "./styles";
import { validate } from 'validate.js'

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            usernameError: '',
            email: '',
            emailError: '',
            image: 'https://pbs.twimg.com/profile_images/947132199962374144/w5yTnxS1_400x400.jpg',
        }
    }
    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    }
    updateProfile() {

        let result = validate({ email: this.state.email, name: this.state.username },
            { email: constraints.email, name: constraints.name })
        if (result) {
            console.log(result)
            let errors = {
                emailError: result.email,
                usernameError: result.name
            }
            this.setState({ ...errors })
            return
        }
        this.props.updateProfile(this.state.username, this.state.email, this.state.image)
    }
    render() {
        let { image } = this.state;
        return (
            <Container style={styles.container}>
                <HeaderView
                    title='Profile'
                    navigationObj={this.props.navigation} />
                <Content padder>
                    <Text>{JSON.stringify(this.props.user)}</Text>
                    <View>
                        {/* <Image
                            style={[styles.profileImage]}
                            source={{ uri: "https://pbs.twimg.com/profile_images/947132199962374144/w5yTnxS1_400x400.jpg" }} /> */}
                        <Button
                            title="Pick an image from camera roll"
                            onPress={this._pickImage}>
                            <Text>Pick an image from camera roll</Text></Button>
                        {image &&
                            <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                    </View>
                    <View>
                        <TextInput
                            returnKeyType='next'
                            placeholder="username"
                            onBlur={() => {
                                this.setState({ usernameError: ValidateInput('name', this.state.username) })
                            }}
                            onChangeText={(value) => {
                                this.setState({ username: value })
                            }}
                            value={this.state.username} />
                        {this.state.usernameError ? <Text>{this.state.usernameError}</Text> : null}
                    </View>
                    <View>
                        <TextInput
                            autoCapitalize='none'
                            returnKeyType='next'
                            placeholder="email"
                            onBlur={() => {
                                this.setState({ emailError: ValidateInput('email', this.state.email) })
                            }}
                            onChangeText={(value) => { this.setState({ email: value.toLowerCase() }) }}
                            value={this.state.email}
                        />
                        {this.state.emailError ? <Text>{this.state.emailError}</Text> : null}
                    </View>
                    <View>

                        <Button
                            onPress={() => {
                                this.updateProfile()
                                console.log('save')
                            }} >
                            <Text>Save</Text>
                        </Button>
                    </View>
                </Content>
            </Container >
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.loginReducer.user
})
const mapDispatchToProps = (dispatch) => ({
    updateProfile: (username, email, image) => dispatch(updateProfile(username, email, image))
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);