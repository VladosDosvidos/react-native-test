/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import lockScreen  from './lockScreen';
import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View,
  NavigatorIOS
} from 'react-native';


export default class App extends Component{
  render() {
    return (
      <NavigatorIOS
       style={styles.container}
       initialRoute={{
        navigationBarHidden: true,
         title: 'Home',
         component: lockScreen,
       }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,

  },
  text: {
    color: 'black',
    backgroundColor:'#fff',
    fontSize: 30,
  }
});

