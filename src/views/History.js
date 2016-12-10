import React, { Component } from 'react';
import {
   Dimensions,
   ScrollView,
   StyleSheet,
   View,
} from 'react-native';
// import { SmoothLine } from 'react-native-pathjs-charts';
import { List, ListItem } from 'react-native-elements';

export default class History extends Component {
   constructor (props) {
      super(props);
      // Get initial device dimensions (orientation changes handled by View.onLayout)
      var { height, width } = Dimensions.get('window');

      this.state = {
         // data: this.calcData(props),
         // options: generateOptions(props.colors, props.data.length, height, width),
         styles: generateStyles(props.colors, height),
      };
   }

   // componentWillReceiveProps (nextProps) {
   //    if (nextProps.data !== this.props.data) {
   //       this.setState({
   //          data: this.calcData(nextProps)
   //       });
   //    }
   // }

   // calcData (props) {
   //    return [
   //       props.data.map((a, i) => {
   //          return {
   //             x: i, // Date.parse(a.ts.slice(0,-1) / 10000),
   //             y: a.h
   //          };
   //       }),
   //       props.data.map((a, i) => {
   //          return {
   //             x: i, // Date.parse(a.ts.slice(0,-1) / 10000),
   //             y: a.t
   //          };
   //       }),
   //    ];
   // }
   
   render () {
      var { data } = this.props;
      var { styles } = this.state;
      
      return (
         <View style={styles._root}>
            <List style={styles.chartScroll}>
               {data.map(p => <ListItem key={p.ts} title={p.h + ' ' + p.t} />)}
            </List>
         </View>
      );
   }
}

// <ScrollView horizontal style={styles.chartScroll} contentContainer={styles.scrollView}>
//    <SmoothLine data={data} options={options} xKey="x" yKey="y"/>
// </ScrollView>

// const generateOptions = function (colors, points, height) {
//    return {
//       height: height / 2,
//       width: 10 * points,
//       color: colors.humidityAccentColor,
//       pallete: [
//          { r: 25, g: 99, b: 201},
//          { r: 205, g: 99, b: 8},
//          { r: 25, g: 205, b: 8},
//          { r: 123, g: 90, b: 9},
//       ],
//       margin: {
//          top: 40,
//          left: 60,
//          bottom: 50,
//          right: 20
//       },
//       animate: {
//          type: 'delayed',
//          duration: 200,
//       },
//       axisX: {
//          showAxis: false,
//          showLines: false,
//          showLabels: false,
//          showTicks: true,
//          zeroAxis: true,
//          orient: 'bottom',
//          label: {
//             fontFamily: 'Arial',
//             fontSize: 14,
//             fontWeight: true,
//             fill: '#34495E'
//          }
//       },
//       axisY: {
//          showAxis: true,
//          showLines: false,
//          showLabels: true,
//          showTicks: true,
//          zeroAxis: true,
//          orient: 'left',
//          label: {
//             fontFamily: 'Arial',
//             fontSize: 14,
//             fontWeight: true,
//             fill: '#34495E'
//          }
//       }
//    };
// }

const generateStyles = function (colors, height) {
   return StyleSheet.create({
      _root: {
         flex: 1,
         flexDirection: 'column',
         alignItems: 'center',
      },
      chartScroll: {
         flex: 1

      },
      scrollView: {
         height: height / 2,      
      }
   });
};
