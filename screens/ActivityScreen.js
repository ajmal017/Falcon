import React from 'react'
import { FlatList, Text, View } from 'react-native'
import alpacaAPI from '../services/alpaca'
import { dashboardStyle } from '../styles/style'

class ActivityScreen extends React.Component {
    
    static navigationOptions = {
        title: 'Account Activity',
    };
    constructor(props) {
        super(props)
        
        this.state = {
            activities: []
        }
    }

    componentDidMount() {
        // Alpaca API
        const alpaca = alpacaAPI()
        
        // Activities request
        alpaca.getActivities().then((response) => {
            if (response.ok) {
                console.log(response)
                this.setState({
                    activities: response.data
                })
            }
        })
    }

    renderRow = ({item}) => {
        return (
            <View key = {item.asset_id}>
                <Text> {item.symbol} </Text>
                <Text> {item.side} {item.qty} @ {item.price}</Text>
                <Text> {item.transaction_time.substring(0,10)} </Text>
            </View> 
        )
    }

    render() {
        return <View>
            <FlatList 
                data = {this.state.activities}
                renderItem = {this.renderRow}
                keyExtractor = {item => item.asset_id}
            />
        </View>
    }
}

export default ActivityScreen