import React, { Component, PureComponent } from 'react';
import { List, ListItem, SearchBar, Button, Header, Icon, Avatar, Card } from 'react-native-elements';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  Alert,
  Modal,
  TouchableOpacity,
  AsyncStorage,
  SafeAreaView,
  TouchableHighlight,
  BackHandler
} from 'react-native';
import {
  DotIndicator
} from 'react-native-indicators';
import BottomNav from './BottomNav';
import { LinearGradient } from 'expo';
import { Ionicons } from '@expo/vector-icons';

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userId');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'HomeScreen' : 'LoginScreen');
    this.forceUpdate()
  };

  // Render any loading content that you like here
  render() {
    return (
<View style={styles.container}>
          <View style={styles.header}>
            <Image
              style={styles.logo}
              source={require('../resources/img/logo.png')}
              resizeMode="contain"
            />
            <Text style={styles.loading}>Loading</Text>
          </View>
          <View style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, justifyContent: 'center', alignItems: 'center' }}>
            <DotIndicator color="rgba(1, 77, 135, 1)" />
            <LinearGradient style={{ position: 'absolute', flex: 1, height: '100%', width: '100%' }}
              colors={['rgba(1, 77, 135, 0)', 'rgba(1, 77, 135, .0)', 'rgba(1, 77, 135, .0)', 'rgba(1, 77, 135, .0)', 'rgba(1, 77, 135, .1)']}>
              <Image
                style={styles.headerImg}
                source={require('../resources/img/splash.png')}
              />
            </LinearGradient>
            <Text style={styles.copy}>
              AVC-AGBU 2019
          </Text>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    height: '100%'
  },
  header: {
    justifyContent: 'flex-end',
    width: '100%',
    height: '37.5%'
    // backgroundColor: '#014d87'
  },
  welcome: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    color: 'white',
    alignSelf: 'center',
    fontWeight: '400'
  },
  loading: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    color: 'rgba(1, 77, 135, 1)',
    alignSelf: 'center',
    fontWeight: '400'
  },
  logo: {
    width: 100,
    height: 100,
    margin: 'auto',
    alignSelf: 'center',
  },
  body: {
    backgroundColor: 'rgba(255,255,255, 0)',
    width: '100%',
    height: '62.5%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  bodyText: {
    color: '#014d87',
    //margin: 32,
    marginTop: 30,
    marginBottom: 20,
    fontSize: 14,
    alignSelf: 'center',
    fontWeight: '500'
  },
  bodyTextFooter: {
    color: '#555',

    marginTop: 30,
    //marginBottom: 20,
    fontSize: 14, 
    alignSelf: 'center',
  },
  loginBlock: {
    width: '92%',
  },
  loginButton: {
    height: 100
  },
  copy: {
    zIndex: 0,
    marginTop: 'auto' || 15,
    marginBottom: 10,
    color: 'rgba(0,0,0,.35)'
  },
  headerImg: {
    flex: 1,
    width: undefined,
    height: undefined,
    borderTopWidth: 0,
    marginTop: -1,
    opacity: 0.4,
    zIndex: -1
  },
});

export default Loading