'use strict';

import React, { Component } from 'react';
import {
  TabBarIOS,
  StyleSheet,
  View,
  Text,
  TouchableHightlight,
  Animated,
  Easing,
  ScrollView,
  RefreshControl,
  Image
} from 'react-native';

import Util from '../utils';
import Icon from 'react-native-vector-icons/Ionicons';
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

class Entrance extends Component{
  static propTypes = {
    hideThis: React.PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
       transformAnim: new Animated.Value(1), 
       opacityAnim: new Animated.Value(1), 
     };
  }

  componentDidMount() {
    Animated.timing(         
       this.state.transformAnim,    
       {toValue: 50,
        duration: 1200,
        delay:2000,
        easing: Easing.elastic(2),
      },          
    ).start();
    Animated.timing(         
       this.state.opacityAnim,    
       {toValue: 0,
        duration: 800,
        easing: Easing.elastic(1),
        delay:2200,
      },          
     ).start();
    setTimeout(() => {
      this.props.hideThis();
    }, 3300);              
  }

  render () {
    return(
      <Animated.View
        style={[styles.entrance,{opacity:this.state.opacityAnim}]}>
        <AnimatedIcon 
          size={60} 
          style={[styles.twitter,{transform:[{scale:this.state.transformAnim}]}]} 
          name="logo-twitter">
        </AnimatedIcon>
      </Animated.View>
    )
  }
}

class TwitterPost extends Component {
  constructor() {
    super();
    this.state = {
      isRefreshing: false
    }
  }

  _onRefresh() {
    this.setState({
      isRefreshing: true
    });

    setTimeout(() => {
      this.setState({
        isRefreshing: false
      })
    }, 2000);
  }

  render() {
    return (
      <ScrollView
        style={styles.twitterPostContainer}
        refreshControl = {
          <RefreshControl 
            refreshing={this.state.isRefreshing}
            onRefresh={()=>this._onRefresh()}
            tintColor="#ddd" />} >
        <Image source={{uri: 'day3'}} style={{
              width: Util.size.width,
              height: Util.size.height - 110
            }} />
      </ScrollView>
    )
  }
}

class TwitterFlow extends Component{
  render() {
    return(
      <View>
        <View style={styles.nav}>
          <View style={styles.navLeft}>
            <Icon name="ios-person-add" size={23} style={{color:"#1b95e0", paddingLeft:10}}></Icon>
          </View>
          <View style={styles.navMid}>
            <Icon name="logo-twitter" size={27} style={{color:"#1b95e0"}}></Icon>
          </View>
          <View style={styles.navRight}>
            <Icon name="ios-search" size={23} style={{color:"#1b95e0", width:30}}></Icon>
            <Icon name="ios-compass" size={23} style={{color:"#1b95e0", width:30, paddingRight:10}}></Icon>
          </View>
        </View>
        <TwitterPost></TwitterPost>
      </View>
    )
  }
}

class TwitterTab extends Component {
  constructor() {
    super();
    this.state = {
      selectedTab: 'Home'
    }
  }

  _changeTab(tabName) {
    this.setState({
      selectedTab: tabName
    })
  }

  render() {
    return(
      <TabBarIOS 
        barTintColor='#fff' 
        tintColor='#1b95e0' >
        <Icon.TabBarItem 
          title='Home'
          iconName='ios-home-outline'
          selectedIconName='ios-home'
          onPress={() => this._changeTab('Home')}
          selected={this.state.selectedTab === 'Home'} >
          <TwitterFlow />
        </Icon.TabBarItem>
        <Icon.TabBarItem 
          title='Bell'
          iconName='ios-alert-outline'
          selectedIconName='ios-alert'
          onPress={() => this._changeTab('Bell')}
          selected={this.state.selectedTab === 'Bell'} >
          <Text>Bell</Text>
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title="私信"
          iconName="ios-mail-outline"
          selectedIconName="ios-mail"
          onPress={ () => this._changeTab('私信') }
          selected={ this.state.selectedTab === '私信'}>
            <Text>私信</Text>
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title="我"
          iconName="ios-person-outline"
          selectedIconName="ios-person"
          onPress={ () => this._changeTab('我') }
          selected={ this.state.selectedTab === '我'}>
            <Text>我</Text>
        </Icon.TabBarItem>
      </TabBarIOS>
    );
  }
}

export default class extends Component {
  constructor() {
    super();
    this.state = {
      show: true
    };
  }

  _hideEntrance() {
    this.setState({
      show:false
    })
  }

  render() {
    let entrance = this.state.show? <Entrance hideThis={()=> this._hideEntrance()}/>:<View></View>
    return (
      <View style={styles.twitterContainer}>
        <TwitterTab />
        {entrance}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  twitterContainer: {
    width: Util.size.width,
    height: Util.size.height
  },
  entrance:{
    position: "absolute",
    top:0, left:0,
    height: Util.size.height,
    width: Util.size.width,
    backgroundColor:"#1b95e0",
    alignItems:"center",
    justifyContent:"center"
  },
  twitter:{
    color:"#fff",
    position:"relative",
    top: -20,
    textAlign: "center"
  },
  twitterPostContainer: {
    width: Util.size.width,
    height:Util.size.height - 90,
    position:"relative",
    top:-20
  },
  nav:{
    flexDirection: "row",
    paddingTop: 30,
    borderBottomWidth: Util.pixel,
    borderBottomColor: "#ddd",
    paddingBottom:5,
    height: 90,
    backgroundColor:"#fff"
  },
  navLeft:{
    flex:1,
    alignItems:"flex-start",
    justifyContent:"center",
  },
  navMid:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
  },
  navRight:{
    flex:1,
    justifyContent:"flex-end",
    alignItems:"center",
    flexDirection:"row"
  },
})