import React, { Component } from 'react';
import {
    ListView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default class History extends Component {
    constructor (props) {
        super(props);

        this.state = {
            styles: generateStyles(props.colors),
            dataSource: this.getDataSource(props.data)
        };
    }

    getDataSource (data, dataSource) {
        var ds = dataSource || new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return ds.cloneWithRows(data.slice().reverse());
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.data !== this.props.data) {
            this.setState({
                dataSource: this.getDataSource(nextProps.data, this.state.dataSource)
            });
        }
    }

    render () {
        var { dataSource, styles } = this.state;

        return (
            <ListView
                style={styles.list}
                dataSource={dataSource}
                renderRow={(row) =>
                    <View key={row.ts} style={styles.listItem}>
                        <Text style={styles.humidity}>{zeroPad(row.h)}</Text>
                        <Text style={styles.temperature}>{zeroPad(row.t)}</Text>
                        <Text style={styles.time}>{new Date(Date.parse(row.ts)).toLocaleString()}</Text>
                    </View>
                }
            />
        );
    }

    renderSeparator (sectionId: number, rowId: number, adjacentRowHighlighted: bool) {
        return (
            <View
                key={`${sectionId}-${rowId}`}
                style={separatorStyle(adjacentRowHighlighted)}
            />
        );
    }
}

function zeroPad (number) {
    var str = String(number);
    if (str.indexOf('.') === -1) {
        return str + '.00';
    }
    return str + '00'.slice(0, 2 - str.split('.')[1].length);
}

function separatorStyle (adjacentRowHighlighted) {
    return {
        height: adjacentRowHighlighted ? 4 : 1,
        backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#111',
    };
}

const generateStyles = function (colors) {
    return StyleSheet.create({
        _root: {
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
        },
        humidity: {
            textAlign: 'right',
            flex: 1,
            color: colors.humidityAccentColor
        },
        temperature: {
            textAlign: 'right',
            flex: 1,
            color: colors.temperatureAccentColor
        },
        list: {
            flex: 1
        },
        listItem: {
            flex: 1,
            flexDirection: 'row',
        },
        time: {
            textAlign: 'right',
            flex: 3,
            color: colors.lowContrastColor,
        }
    });
};
