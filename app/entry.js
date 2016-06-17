import React, { Component } from 'react';
import {
  Image,
  NavigatorIOS,
  ScrollView,
  StatusBarIOS,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import Util from './utils';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFa from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';

import Day1 from './scripts/watch';
import Day2 from './scripts/weather';
import Day3 from './scripts/calendar';

class MainView extends Component {
  constructor() {
    super();
    this.state = {
      days: [ 
        {
          key: 0,
          title: 'A stopwatch',
          component: Day1,
          isFA: false,
          icon: 'ios-stopwatch',
          size: 50,
          color: '#ff856c',
          hideNav: false
        },
        {
          key: 1,
          title: 'A weather app',
          component: Day2,
          isFA: false,
          icon: 'ios-partly-sunny',
          size: 50,
          color: '#90bdc2',
          hideNav: true
        },
        {
          key: 3,
          title: 'A Calendar',
          component: Day3,
          isFA: false,
          icon: 'ios-stopwatch',
          size: 50,
          color: '#ff856c',
          hideNav: false
        }
      ]
    }
  }

  componentWillMount() {

  }

  _jumpToDay(index) {
    let curDay = this.state.days[index];
    this.props.navigator.push({
      title: curDay.title,
      component: curDay.component,
      navigationBarHidden: curDay.hideNav
    });
  }

  render() {
    const boxs = this.state.days.length === 0 ? null : this.state.days.map((elem, index) => {
      return (
        <TouchableHighlight
          key={elem.key}
          style={[
            styles.touchBox,
            index % 3 == 2 ? styles.touchBox2 : styles.touchBox1 
            ]} 
          underlayColor='#eee'
          onPress={() => this._jumpToDay(index)} >
          <View style={styles.boxContainer} >
            <Text style={styles.boxText} >
              Day{index + 1}
              {
                elem.isFA ? 
                <IconFA /> : 
                <Icon size={elem.size} name={elem.icon} style={[styles.boxIcon, {color: elem.color}]} />
              }
            </Text>
          </View>
        </TouchableHighlight>
      );
    })

    return (
      <ScrollView>
        <Swiper 
          height={150} 
          showsButtons={true}
          autoplay={true}
          activeDot={
            <View
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                width: 8,
                height: 8,
                borderRadius: 4,
                margin: 3
              }} />
          } >
          <TouchableHighlight onPress={() => this._jumpToDay(1)} >
            <View style={styles.slide}>
              <Image style={styles.image} source={{uri: 'day1'}} />
              <Text style={styles.slideText} >Day1: stopwatch</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this._jumpToDay(1)} >
            <View style={styles.slide}>
              <Image style={styles.image} source={{uri: 'day2'}} />
              <Text style={styles.slideText} >Day2: weather</Text>
            </View>
          </TouchableHighlight>
        </Swiper>
        <View style={styles.touchBoxContainer} >
          {boxs}
        </View>
      </ScrollView>
    )
  }
}

export default class extends Component {
  componentDidMount() {
    StatusBar.setBarStyle(0);
  }

  render() {
    return (
      <NavigatorIOS 
        ref='nav'
        style={styles.container}
        initialRoute={{
          title: '30 Days of RN',
          component: MainView,
          backButtonTitle: 'back',
          shadowHidden: true
        }}
        itemWrapperStyle={styles.itemWrapper}
        tintColor='#777' />
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  itemWrapper:{
    backgroundColor: '#f3f3f3'
  },
  touchBox:{
    width: Util.size.width/3 - 0.3,
    height: Util.size.width/3,
    backgroundColor:"#fff",
  },
  touchBoxContainer:{
    flexDirection: "row", 
    flexWrap:"wrap",
    width: Util.size.width,
    borderTopWidth: Util.pixel,
    borderTopColor:"#ccc",
    borderLeftWidth: Util.pixel,
    borderLeftColor:"#ccc",
    borderRightWidth: Util.pixel,
    borderRightColor:"#ccc",
  },
  touchBox1:{
    borderBottomWidth: Util.pixel,
    borderBottomColor:"#ccc",
    borderRightWidth: Util.pixel,
    borderRightColor:"#ccc",
  },
  touchBox2:{
    borderBottomWidth: Util.pixel,
    borderBottomColor:"#ccc",
    width: Util.size.width / 3 - 1
  },
  boxContainer:{
    alignItems:"center",
    justifyContent:"center",
    width: Util.size.width/3,
    height:Util.size.width/3,
  },
  boxIcon:{
    position:"relative",
    top:-10
  },
  boxText:{
    position:"absolute",
    bottom:15,
    width:Util.size.width/3,
    textAlign:"center",
    left: 0,
    backgroundColor:"transparent"
  },
  slide: {
    flex: 1,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideText:{
    position:"absolute",
    bottom: 0,
    paddingTop:5,
    paddingBottom:5,
    backgroundColor:"rgba(255,255,255,0.5)",
    width: Util.size.width,
    textAlign:"center",
    fontSize: 12
  },
  image:{
    width: Util.size.width,
    flex: 1,
    alignSelf: 'stretch',
  }
});