import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import {
  ActivityIndicator
} from 'react-native';

class Spinner extends Component {
  render() {
    return (
    <View style = {{flex:1}}>
        <ActivityIndicator size="large" color="#0000ff" />
        <ActivityIndicator size="small" color="#00ff00" />
        <ActivityIndicator size="large" color="#0000ff" />
        <ActivityIndicator size="small" color="#00ff00" />
     </View>
    );
  }
}

export default Spinner;