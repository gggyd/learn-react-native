import React, { Component } from 'react';
import { NativeModules, View, Text } from 'react-native';

var CalendarManager = NativeModules.CalendarManager;

CalendarManager.addEvent('Birthday Party', {
  location: '4 Privet Drive, Surrey',
  time: new Date().getTime()
});

CalendarManager.findEvents((error, events) => {
  if (error) {
    console.error(error);
  } else {
    this.setState({events: events});
  }
})

export default class extends Component {
  render() {
    return (
      <View style={{marginTop: 100}}>
        <Text>IOS UI Calendar</Text>
      </View>
    );
  }
}