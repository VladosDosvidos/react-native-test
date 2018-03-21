'use strict';



import React, { Component } from 'react';
import OfflineComponent from './offlineComponent'
import searchPage from './searchPage'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  TouchableHighlight
} from 'react-native';




class lockScreen extends Component{

  _goToAuth (){
  this.props.navigator.push({
      title: 'Search',
      component: searchPage
  })
  }

  render() {
    return (
      <View style={styles.container}>
      <OfflineComponent/>
        <Text style={styles.description}>
          Welcome!
        </Text>

        <View style={styles.buttonWrap}>
        <TouchableHighlight style={styles.button}
        onPress={this._goToAuth.bind(this)}>
          <Text style={styles.buttonText}>Auth</Text>
        </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    alignItems: 'center'
  },
  description: {
    marginBottom: 20,
    fontSize: 18,
    marginTop: 65,
    textAlign: 'center',
    color: '#656565'
  },
  buttonText: {
    fontSize: 16,
    color: '#fff', 
    alignSelf: 'center'
  },
  button : {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonWrap:{
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  }
});


module.exports = lockScreen;