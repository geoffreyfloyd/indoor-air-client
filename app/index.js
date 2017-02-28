// PACKAGES
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ViewPagerAndroid,
} from 'react-native';
//import { Icon } from 'react-native-elements';
import firebase from 'firebase';
// COMPONENTS
import Loading from './components/Loading';
// VIEWS
import Dash from './views/Dash';
import History from './views/History';
// CONFIGS
import config from '../firebase.config';

export default class App extends Component {
    constructor (props) {
        super(props);

        // Get data
        this.dataRef = firebase.database().ref('data/users/geoffreyfloyd/logs/indoor-air');

        // Initialize Firebase db
        firebase.initializeApp(config);

        this.state = {
            data: [],
        };
    }

    componentDidMount () {
        this.listenForObjectMapData('data', this.dataRef);
    }

    listenForObjectMapData (key, ref) {
        ref.orderByKey().limitToLast(60).on('child_added', (snap) => {
            // Get value as an object
            var obj = snap.val();

            // Update state
            var newData = this.state.data.slice();
            newData.push({ ts: snap.key, ...obj });
            var newState = {
                current: obj,
                data: newData,
            };
            this.setState(newState);
        });
    }

    render () {
        var { current, data } = this.state;

        if (!current) {
            return (
                <View style={styles.root}>
                    <Loading/>
                </View>
            );
        }

        return (
            <ViewPagerAndroid
                style={styles.root}
                initialPage={0}
            >
                <View style={styles.page}>
                    <Dash
                        colors={colors}
                        humidity={current.h}
                        temperature={current.t}
                    />
                </View>
                <View style={styles.page}>
                    <History
                        colors={colors}
                        data={data}
                    />
                </View>
            </ViewPagerAndroid>
        );
    }
}

const colors = {
    bgColor: '#222222',
    foreColor: '#F5FCFF',
    lowContrastColor: '#CCCCCC',
    humidityAccentColor: '#2cb7d4',
    temperatureAccentColor: '#e43f48',
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.bgColor,
    },
    page: {
        flex: 1,
        justifyContent: 'center',
    },
});
