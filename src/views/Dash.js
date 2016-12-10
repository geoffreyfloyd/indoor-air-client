import React, { Component } from 'react';
import {
   Dimensions,
   StyleSheet,
   Text,
   View,
} from 'react-native';

export default class Dash extends Component {
   constructor (props) {
      super(props);
      // Get initial device dimensions (orientation changes handled by View.onLayout)
      var { height } = Dimensions.get('window');

      this.state = {
         styles: generateStyles(props.colors, height),
      };
   }
   
   render () {
      var { humidity, temperature } = this.props;
      var { styles } = this.state;
      
      return (
         <View style={styles._root}>
            <Text style={styles.label}>{'humidity'}</Text>
            <View style={styles.circleTop}>
               <Text style={styles.text}>{Math.floor(humidity)}</Text>
            </View>
            <View style={styles.circleBottom}>
               <Text style={styles.text}>{Math.floor(temperature)}</Text>
            </View>
            <Text style={styles.label}>{'temperature'}</Text>
         </View>
      );
   }
}

const generateStyles = function (colors, height) {
   var half = height / 2;
   var fraction = half / 7;
   var circle = fraction * 4.5;
   return StyleSheet.create({
      _root: {
         flex: 1,
         flexDirection: 'column',
         backgroundColor: colors.bgColor,
         alignItems: 'center',
      },
      circleTop: {
         height: circle,
         width: circle,
         borderRadius: circle / 2,
         borderWidth: 8,
         borderColor: colors.humidityAccentColor,
         justifyContent: 'center',
         marginBottom: fraction * 0.6,
      },
      circleBottom: {
         height: circle,
         width: circle,
         borderRadius: circle / 2,
         borderWidth: 8,
         borderColor: colors.temperatureAccentColor,
         justifyContent: 'center',
      },
      label: {
         fontSize: fraction * 0.75,
         margin: fraction / 3,
         textAlign: 'center',
         color: colors.lowContrastColor
      },
      text: {
         fontSize: circle / 2,
         textAlign: 'center',
         color: colors.foreColor
      },
      data: {
         fontSize: 16,
         color: colors.foreColor
      },
   });
};
