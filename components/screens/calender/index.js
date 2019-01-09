import React from 'react';
import {
    Container,
    Content,
    Text,
} from "native-base";
import styles from "./styles";
import { View } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { connect } from 'react-redux'
import { setSelectedDate } from '../../../store/actions/calendar/calendar'
import HeaderView from '../../../ui/header'

class CalendarScreen extends React.Component {

    constructor(props) {
        super(props)
        const date = this.props.selectedDate
        this.state = {
            calenderResult: '',
            markedDate: {
                [date]: {
                    selected: true, selectedColor: 'red'
                }
            }
        }

        this.onDayPress = this.onDayPress.bind(this)
    }

    onDayPress(day) {
        console.log('onDayPress', day.dateString)
        this.props.setSelectedDate(day.dateString)
    }

    render() {
        return (
            <Container style={styles.container}>
                <HeaderView 
                title='Calendar'
                navigationObj={this.props.navigation} />
                <Content padder>
                    <View style={{ marginTop: 50 }}>
                        <Text>{this.state.calenderResult}</Text>
                        <Calendar
                            markedDates={{
                                [this.props.selectedDate]: {
                                    selected: true, selectedColor: 'red'
                                }
                            }}
                            onDayPress={this.onDayPress}
                        />
                    </View>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    selectedDate: state.calendarReducer.selectedDate
})

const mapDispatchToProps = (dispatch) => ({
    setSelectedDate: (date) => dispatch(setSelectedDate(date))
})

export default connect(mapStateToProps, mapDispatchToProps)(CalendarScreen)