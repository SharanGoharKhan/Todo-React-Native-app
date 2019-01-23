import React from 'react';
import {
    Container,
    Content,
    Text,
} from "native-base";
import PureChart from 'react-native-pure-chart'
import HeaderView from '../../../ui/header'
import styles from "./styles";
class Charts extends React.Component {
    render() {

        let sampleData1 = [
            { x: '2018-01-01', y: 30 },
            { x: '2018-01-02', y: 200 },
            { x: '2018-01-03', y: 170 },
            { x: '2018-01-04', y: 250 },
            { x: '2018-01-05', y: 10 }
        ]
        let sampleData2 = [
            {
                seriesName: 'series1',
                data: [
                    { x: '2018-02-01', y: 30 },
                    { x: '2018-02-02', y: 200 },
                    { x: '2018-02-03', y: 170 },
                    { x: '2018-02-04', y: 250 },
                    { x: '2018-02-05', y: 10 }
                ],
                color: '#297AB1'
            },
            {
                seriesName: 'series2',
                data: [
                    { x: '2018-02-01', y: 20 },
                    { x: '2018-02-02', y: 100 },
                    { x: '2018-02-03', y: 140 },
                    { x: '2018-02-04', y: 550 },
                    { x: '2018-02-05', y: 40 }
                ],
                color: 'yellow'
            }
        ]
        let sampleData3 = [
            {
                value: 50,
                label: 'Marketing',
                color: 'red',
            }, {
                value: 40,
                label: 'Sales',
                color: 'blue'
            }, {
                value: 25,
                label: 'Support',
                color: 'green'
            }

        ]
        return (
            <Container style={styles.container}>
                <HeaderView title='Charts'
                    navigationObj={this.props.navigation} />
                <Content padder>
                    <Text>Hello from Charts</Text>
                    <PureChart data={sampleData1} type='line' />
                    <PureChart data={sampleData2} type='line' />
                    <PureChart data={sampleData3} type='pie' />
                    <PureChart type={'bar'}
                        data={sampleData2}
                         />
                </Content>
            </Container>
        )
    }
}

export default Charts;