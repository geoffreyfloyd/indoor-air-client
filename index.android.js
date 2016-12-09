/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
   AppRegistry,
   Dimensions,
   ListView,
   ProgressBarAndroid,
   StyleSheet,
   Text,
   View
} from 'react-native';
import firebase from 'firebase';

// Initialize Firebase
const config = {
   apiKey: "AIzaSyDpARKylspEmH6yi8vJePuiwRVre0nKOb4",
   authDomain: "doozy-31df5.firebaseapp.com",
   databaseURL: "https://doozy-31df5.firebaseio.com",
   storageBucket: "doozy-31df5.appspot.com",
   messagingSenderId: "694975571209"
};
firebase.initializeApp(config);

export default class IndoorAirClient extends Component {
   constructor (props) {
      super(props);
      // Get initial device dimensions (orientation changes handled by View.onLayout)
      var dimensions = Dimensions.get('window');

      // Get data
      this.dataRef = firebase.database().ref('data/users/geoffreyfloyd/logs/indoor-air');

      this.state = {
         data: [],
         dimensions,
         dataSource: this.getDataSource([])
      };
   }

   componentDidMount () {
      this.listenForObjectMapData('data', this.dataRef);
   }

   listenForObjectMapData (key, ref) {
      ref.orderByKey().on('child_added', (snap) => {
         // Get value as an object
         var obj = snap.val();

         // Update state
         var newData = this.state.data.slice();
         newData.push({ ts: snap.key, ...obj });
         var newState = {
            current: obj,
            data: newData,
            dataSource: this.getDataSource(newData, this.state.dataSource)
         };
         this.setState(newState);
      });
   }

   getDataSource (data, dataSource) {
      var ds = dataSource || new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
      return ds.cloneWithRows(data);
   }

   render () {
      var { current, data, dataSource } = this.state;
      if (!data.length) {
         return this.renderLoadingIndicator();
      }

      return (
         <View style={styles.container}>
            <Text style={styles.text}>{'Currently'}</Text>
            <Text style={styles.text}>{'Humidity ' + current.h}</Text>
            <Text style={styles.text}>{'Temperature ' + current.t}</Text>
            <ListView
               style={styles.list}
               dataSource={dataSource}
               renderRow={(row) =>
                  <View key={row.ts}>
                     <Text style={styles.data}>{row.ts + ' H' + row.h + ' T:' + row.t}</Text>
                  </View>
               }
               renderSeparator={this.renderSeparator.bind(this)}
            />
         </View>
      );
   }
            // {data.map(key => {
            //    var row = data[key];
            //    return (
            //       <View key={key}>
            //          <Text style={styles.data}>{key + ' H' + row.h + ' T:' + row.t}</Text>
            //       </View>
            //    );
            // })}
   renderLoadingIndicator () {
      return (
         <View style={styles.loadingContainer}>
            <ProgressBarAndroid styleAttr="Large" />
         </View>
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

function separatorStyle (adjacentRowHighlighted) {
   return {
      height: adjacentRowHighlighted ? 4 : 1,
      backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#111',
   };
}

const foreColor = '#F5FCFF';
const backColor = '#444444';
const styles = StyleSheet.create({
   container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: backColor,
   },
   text: {
      fontSize: 20,
      margin: 10,
      textAlign: 'center',
      color: foreColor
   },
   data: {
      fontSize: 16,
      color: foreColor
   },   
});

AppRegistry.registerComponent('IndoorAirClient', () => IndoorAirClient);
