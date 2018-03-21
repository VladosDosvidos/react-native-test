'use strict';


import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  NetInfo
} from 'react-native';


const { width, height } = Dimensions.get('window');


function RenderOfflineText() {
  return (
    <View style={styles.container}>
      <View style={styles.textWrap}>
        <Text style={styles.text}>Offline</Text>
      </View>
    </View>
  );
}

class OfflineComponent extends Component{

  constructor(props){
    super(props);
    this.state = {
      isConnected: true
    };
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
 }

   handleConnectivityChange = (isConnected) => {
    if (isConnected) {
      this.setState({ isConnected });
    } else {
      this.setState({ isConnected });
    }
  };
  
  render() {
    if (!this.state.isConnected) {
      return <RenderOfflineText/>;
    }
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    position: 'absolute',
    top: 0,
    height,
    bottom: 0,
    zIndex: 1

  },
  text: { 
    color: '#fff'

  },
  textWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    width,
    height: 30,
    backgroundColor: '#ccc'
  }
  
});


export default  OfflineComponent;