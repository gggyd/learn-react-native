'use strict';

import React, { Component, PropTypes } from 'react';
import {
  Image,
  MapView, 
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Util from '../utils';
import Icon from 'react-native-vector-icons/Ionicons';

export class Map extends Component {
  static defaultProps = {
    mapType: 'standard',
    showUserLocation: false,
    followUserLocation: false,
  };

  static propTypes = {
    mapType: PropTypes.oneOf(['standard', 'satellite', 'hybrid']),
    showUserLocation: PropTypes.bool.isRequired,
    followUserLocation: PropTypes.bool.isRequired
  };

  constructor() {
    super();
    this.state = {
      isFirstLoad: true,
      mapRegion: undefined,
      annotations: []
    };
  }

  _getAnnotations(region) {
    return [{
      longitude: region.longitude,
      latitude: region.latitude,
      title: 'Yor are here'
    }];
  }

  _onRegionChangeComplete(region) {
    if (this.state.isFirstLoad) {
      this.setState({
        annotations: this._getAnnotations(region),
        isFirstLoad: false
      });
    }
  }

  render() {
    return (
      <View>
        <MapView
          style={this.props.mapStyle}
          mapType = {this.props.mapType}
          showsUserLocation={this.props.showsUserLocation}
          followUserLocation={this.props.followUserLocation}
          onRegionChangeComplete={(region) => this._onRegionChangeComplete(region)}
          region={this.state.mapRegion}
          annotations={this.state.annotations} />
      </View>
    );
  }
}

export default class extends Component{
  constructor() {
    super();
    this.state = {
      showGeo:false
    };
  }

  _getLocation() {
    this.setState({
      showGeo: true
    })
  }

	render() {
		return(
			<View style={styles.container}>
        <Map mapType="standard" mapStyle={styles.map} showsUserLocation={this.state.showGeo} followUserLocation={this.state.showGeo}></Map>
        <TouchableHighlight underlayColor="#00bd03" style={styles.btn} onPress={() => this._getLocation()}>
          <Text style={styles.btnText}><Icon size={18} name="ios-navigate"> </Icon> Find my location</Text>
        </TouchableHighlight>
      </View>
		)
	}
}

const styles = StyleSheet.create({
  container:{
    alignItems: "center",
    paddingTop: 60
  },
  map:{
    width: Util.size.width,
    height: Util.size.height-120
  },
  btn:{
    backgroundColor:"#00a803",
    width: Util.size.width-80,
    height: 40,
    borderWidth:Util.pixel,
    borderColor: "#009302",
    borderRadius: 4,
    justifyContent:"center",
    marginTop:10
  },
  btnText:{
    textAlign:"center",
    fontSize:18,
    color:"#fff"
  },
});