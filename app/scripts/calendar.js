import React, { Component } from 'react';
import { NativeModules, View, Text } from 'react-native';

var CalendarManager = NativeModules.CalendarManager;

CalendarManager.addEvent('Birthday Party', '4 Privet Drive, Surrey', new Date().getTime());

export default class extends Component {
  render() {
    return (
      <View style={{marginTop: 100}}>
        <Text>IOS UI Calendar</Text>
      </View>
    );
  }
}