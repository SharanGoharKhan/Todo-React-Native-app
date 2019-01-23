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
import { TextInput, Image, AsyncStorage } from 'react-native'
import HeaderView from '../../../ui/header'
import { ValidateInput, constraints } from '../../utility/constraints'
import { updateProfile } from '../../../store/actions/auth/login'
import styles from "./styles";
import { validate } from 'validate.js'

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            photoUrl: 'https://pbs.twimg.com/profile_images/947132199962374144/w5yTnxS1_400x400.jpg',
            nameError: '',
            emailError: ''
        }

    }
    componentDidMount() {
        this._getUserProfile()
    }
    async _getUserProfile() {
        const result = await AsyncStorage.getItem('userToken')
        this.setState({ ...JSON.parse(result) })
        console.log(JSON.parse(result))
    }
    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({ photoUrl: result.uri });
        }
    }
    async updateProfile() {

        let result = validate({ email: this.state.email, name: this.state.name },
            { email: constraints.email, name: constraints.name })
        if (result) {
            console.log(result)
            let errors = {
                emailError: result.email,
                nameError: result.name
            }
            this.setState({ ...errors })
            return
        }

        const resp = await AsyncStorage.setItem('userToken', JSON.stringify({ ...this.state, name: this.state.name, email: this.state.email, photoUrl: this.state.photoUrl }));
        this.props.updateProfile(this.state.name, this.state.email, this.state.photoUrl)
    }
    render() {
        let { photoUrl } = this.state;
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
                            title="Pick an photoUrl from camera roll"
                            onPress={this._pickImage}>
                            <Text>Pick an photoUrl from camera roll</Text></Button>
                        {photoUrl &&
                            <Image source={{ uri: photoUrl }} style={{ width: 200, height: 200 }} />}
                    </View>
                    <View>
                        <TextInput
                            returnKeyType='next'
                            placeholder="name"
                            onBlur={() => {
                                this.setState({ nameError: ValidateInput('name', this.state.name) })
                            }}
                            onChangeText={(value) => {
                                this.setState({ name: value })
                            }}
                            value={this.state.name} />
                        {this.state.nameError ? <Text>{this.state.nameError}</Text> : null}
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
    updateProfile: (name, email, photoUrl) => dispatch(updateProfile(name, email, photoUrl))
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);