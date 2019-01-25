import React from 'react';
import { connect } from 'react-redux'
import {
    Icon,
    Container,
    Content,
    Text,
    View,
    Button,
} from "native-base";
import { ImagePicker } from 'expo'
import { Dimensions, TextInput, Image, AsyncStorage } from 'react-native'
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
        let width = Dimensions.get('window').width
        let height =  Dimensions.get('window').height
        return (
            <Container style={styles.container}>
                <HeaderView
                    title='Profile'
                    navigationObj={this.props.navigation} />
                <Content padder>
         
                    <View >
                        <View style={{flex: 1, alignItems:"center"}}>
                            <View>
                                {photoUrl && <Image style={styles.profileImage} source={{ uri: photoUrl }}  />}
                                <View 
                                    style={{
                                    
                                        width: 28, 
                                        height: 28, 
                                        paddingLeft: 0,
                                        borderRadius: 100, position: "absolute", top: 150, right:10,
                                        paddingLeft: 0, marginLeft:0,
                                        backgroundColor:"rgb(63, 188, 231)"
                                    }}>
                                    <Icon
                                        name="camera"
                                        type="EvilIcons"
                                        style={{color:"#fff", position:"absolute", top: 2, right: 0}}
                                        onPress={this._pickImage}
                                        />
                                </View>
                            </View>
                       
                            
                        </View>
                    </View>

                    <View style={{paddingLeft:50}}>
                        {/* <Image
                            style={[styles.profileImage]}
                            source={{ uri: "https://pbs.twimg.com/profile_images/947132199962374144/w5yTnxS1_400x400.jpg" }} /> */}
                    <View >
                            <Text style={{ fontSize: 13, color:"rgb(63, 188, 231)"}}>Name</Text>
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
                            {this.state.nameError ? <Text style={styles.error_label}>{this.state.nameError}</Text> : null}
                        </View>
                        <View>
                            <Text style={{ fontSize: 13, color:"rgb(63, 188, 231)"}}>Email</Text>
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
                            {this.state.emailError ? <Text style={styles.error_label}>{this.state.emailError}</Text> : null}
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