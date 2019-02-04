import React from 'react';
import { connect } from 'react-redux'
import {
    Icon,
    Container,
    Content,
    Text,
    View,
    Button,
    Item, Input
} from "native-base";
import { ImagePicker } from 'expo'
import { Dimensions, TextInput, Image, AsyncStorage } from 'react-native'
import HeaderView from '../../../ui/header'
import { ValidateInput, constraints } from '../../utility/constraints'
import { updateProfile } from '../../../store/actions/auth/login'
import styles from "./styles";
import { validate } from 'validate.js'

import KeyboardShift from '../../utility/KeyboardShift'


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
        console.log(this.props.user)
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
            <KeyboardShift>
            <Container style={styles.container}>
                <HeaderView
                    title='Profile'
                    navigationObj={this.props.navigation} />
                <Content padder>
         
                    <View style={{flex: 1, alignItems:"center"}}>
                        <View >
                            <View>
                                {photoUrl && <Image style={styles.profileImage} source={{ uri: photoUrl }}  />}
                                <View 
                                    style={{
                                    
                                        width: 28, 
                                        height: 28, 
                                        paddingLeft: 0,
                                        borderRadius: 100, position: "absolute", top: 100, right:3,
                                        paddingLeft: 0, marginLeft:0,
                                        backgroundColor:"#03dac6"
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

                    <View style={{width:"80%", marginTop:30}}>
                        {/* <Image
                            style={[styles.profileImage]}
                            source={{ uri: "https://pbs.twimg.com/profile_images/947132199962374144/w5yTnxS1_400x400.jpg" }} /> */}
                    <View >
                            <Text style={{ fontSize: 13, color:"#03dac6"}}>Name</Text>
                            <TextInput
                                style={{borderColor: 'rgb(220,220,220)', borderWidth: 1, borderRadius: 20, overflow:"hidden", paddingLeft: 8}}
                                returnKeyType='next'
                                placeholder="Name"
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
                            <Text style={{paddingTop:10, fontSize: 13, color:"#03dac6"}}>Email</Text>
                            <TextInput
                                style={{borderColor: 'rgb(220,220,220)', borderWidth: 1, borderRadius: 20, overflow:"hidden", paddingLeft: 8}}
                                autoCapitalize='none'
                                returnKeyType='next'
                                placeholder="Email"
                                onBlur={() => {
                                    this.setState({ emailError: ValidateInput('email', this.state.email) })
                                }}
                                onChangeText={(value) => { this.setState({ email: value.toLowerCase() }) }}
                                value={this.state.email}
                            />
                   

                            {this.state.emailError ? <Text style={styles.error_label}>{this.state.emailError}</Text> : null}
                        </View>
                        <View  style={{  paddingTop:20}}>

                            <Button
                                full
                                style={{  flex:1, flexGrow:1,flexDirection:"row", textAlign: 'center', height: 30 , borderRadius: 20 , backgroundColor:"#03dac6"}}
                                onPress={() => {
                                    this.updateProfile()
                                    console.log('save')
                                }} >
                                <Text>Save</Text>
                            </Button>
                        </View>

                    </View>
                </View>
                 
                </Content>
            </Container >
            </KeyboardShift>
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