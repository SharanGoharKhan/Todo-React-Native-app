import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Constants, MapView, Location, Permissions } from 'expo'

import { connect } from 'react-redux'
import { setLocation } from '../../store/actions/maps/maps'

class Maps extends Component {
    constructor(props) {
        super(props)
        this.state = {
            locationResult: null,
            location: this.props.location
        }
        console.log('current locaiton',this.state.location)
    }

    componentWillMount() {
        this._getLocationAsync();
    }


    _handleMapRegionChange = mapRegion => {
        
    };

    _getLocationAsync = async () => {
        Permissions.askAsync(Permissions.LOCATION).then(({ status }) => {
            if (status !== 'granted') {
                this.setState({
                    locationResult: 'Permission to access location was denied'
                });

            }
            else {
                Location.getCurrentPositionAsync().then(location => {
                    this.setState({
                        locationResult: JSON.stringify(location),
                        location
                    })
                })
                    .catch(err => {
                        this.setState({
                            locationResult: err.toString()
                        })
                    })
            }
        })
            .catch(err => {

                this.setState({
                    locationResult: err.toString(),
                });
            })






    };

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    loadingEnabled
                    style={{ alignSelf: 'stretch', height: 500 }}
                    onRegionChange={this._handleMapRegionChange}
                    showsUserLocation
                    followsUserLocation
                >
                    <MapView.Marker
                        draggable
                        coordinate={this.state.location.coords}
                        title="Current location"
                        description=""

                        onDragEnd={(e) => {
                            this.setState({
                                location: { coords: e.nativeEvent.coordinate },
                                locationResult: JSON.stringify(e.nativeEvent.coordinate)
                            })
                        }}
                    />
                </MapView>

                <Text>
                    Location: {this.state.locationResult}
                    State location: {JSON.stringify(this.props.location)}
                </Text>
                <Button
                    title='Get Current location'
                    onPress={() => {
                        this._getLocationAsync()
                    }} />
                <Button
                    title="save my location"
                    onPress={() => {
                        this.props.setLocation(this.state.location)
                    }} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#34495e',
    },
});



const mapStateToProps = (state) => ({
    location: state.mapReducer.location
})

const mapDispatchToProps = (dispatch) => ({
    setLocation: (location) => {
        dispatch(setLocation(location))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Maps)