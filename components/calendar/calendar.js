import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { connect } from 'react-redux'
import { setSelectedDate } from '../../store/actions/calendar/calendar'

class CalendarScreen extends Component {
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
            <View style={{ marginTop: 50 }}>
                <Text>Calendar screen</Text>
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