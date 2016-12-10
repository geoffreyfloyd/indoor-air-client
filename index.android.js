/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
   AppRegistry,
   ProgressBarAndroid,
   StyleSheet,
   View,
   ViewPagerAndroid,
} from 'react-native';
// import { Icon } from 'react-native-elements';
import firebase from 'firebase';
import Dash from './src/views/Dash';
import History from './src/views/History';
// Initialize Firebase
const config = {
   apiKey: "AIzaSyDpARKylspEmH6yi8vJePuiwRVre0nKOb4",
   authDomain: "doozy-31df5.firebaseapp.com",
   databaseURL: "https://doozy-31df5.firebaseio.com",
   storageBucket: "doozy-31df5.appspot.com",
   messagingSenderId: "694975571209"
};
firebase.initializeApp(config);

export default class Air extends Component {
   constructor (props) {
      super(props);

      // Get data
      this.dataRef = firebase.database().ref('data/users/geoffreyfloyd/logs/indoor-air');

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

      if (!current || data.length < 61) {
         return this.renderLoadingIndicator();
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
            {/* Not ready for prime time
            <View style={styles.page}>
               <History
                  colors={colors}
                  data={data}
               />
            </View>
            */}
         </ViewPagerAndroid>
      );
   }

   renderLoadingIndicator () {
      return (
         <View style={styles.root}>
            <ProgressBarAndroid styleAttr="Large" />
         </View>
      );
   }
}

const colors = {
   bgColor: '#222222',
   foreColor: '#F5FCFF',
   lowContrastColor: '#CCCCCC',
   humidityAccentColor: '#2cb7d4',
   temperatureAccentColor: '#e43f48', 
}

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

AppRegistry.registerComponent('Air', () => Air);
