import React, { Component, PureComponent } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  KeyboardAvoidingView,
  AsyncStorage,
  BackHandler
} from 'react-native'
import {
  DotIndicator
} from 'react-native-indicators'
import { FormInput, Button } from 'react-native-elements'
import { LinearGradient } from 'expo'
import { StackActions, NavigationActions } from 'react-navigation'

class Login extends Component {
  constructor(props) {
    super(props)
    // this.handleBackButtonClick = this.handleBackButtonClick.bind(this)
    this.state = {
      text: '',
      password: '',
      courseId: null,
      loading: false,
      token: null,
      userId: null,
      isLogin: false,
      bodyTextColor: '#014d87',
      data: [],
      render: true
    }
  }


  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
}

componentWillUnmount() {
    return BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}

handleBackButtonClick = () => {
  Alert.alert(
    'Exit App',
    'Exiting the application?',
    [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      },
      {
        text: 'OK',
        onPress: () => BackHandler.exitApp()
      }
    ],
    {
      cancelable: false
    }
  )
  return true
}

  // shouldComponentUpdate(){
  //   return this.state.render
  // }

  // async componentWillUnmount(){

  // }

  // checkAsync() {
  //   if(this.state.userId !== null){
  //     this.setState({render: false})
  //     this.props.navigation.navigate('HomeScreen', {
  //       token: this.state.token, userId: this.state.userId, courseId: this.state.courseId, onGoBack: this.setState({
  //         courseId: null,
  //         token: null, 
  //         userId: null,
  //         isLogin: false,
  //         loading: false,
  //         text: '',
  //         password: ''
  //       })
  //     });
  //    } else {
  //     this.setState({render: true})
  //    }
  // }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick)
      this.setState({loading: false})
  }

  componentWillMount() {
      this.setState({loading: false})
  }

  componentDidCatch() {
    this.setState({loading: false})
  }

  makeLoginRequest = () => {
    const url = `https://www.avc-agbu.org/edu/login/token.php?service=moodle_mobile_app&username=${this.state.text}&password=${this.state.password}`;
    this.setState({ loading: true });
    //const a = loading ? <ActivityIndicator animating size='large' /> : 'login';
    fetch(url).then(client => client.json())
      .then(response => {
        this.setState({ token: response.token });
        fetch(`https://www.avc-agbu.org/edu/webservice/rest/server.php?moodlewsrestformat=json&wstoken=${this.state.token}&wsfunction=core_webservice_get_site_info`)
          .then(user => user.json())
          .then(async id => {
            this.setState({
              userId: id.userid
            });
            this.state.userId ? this.setState({ isLogin: true }) : this.state.isLogin
            AsyncStorage.setItem('userId', JSON.stringify(this.state.userId))
            AsyncStorage.setItem('token', JSON.stringify(this.state.token))

            if (this.state.isLogin) {
              this.props.navigation.navigate('HomeScreen', {onGoBack: this.setState({loading: false, text: '',
              password: ''})});
            } else {
              this.setState({ loading: false, bodyTextColor: 'red' })
              Alert.alert('Login Failed', 'You typed the wrong password or User Name, try again.')
            };
            fetch(`https://www.avc-agbu.org/edu/webservice/rest/server.php?moodlewsrestformat=json&wstoken=${this.state.token}&wsfunction=core_enrol_get_users_courses&userid=${this.state.userId}`)
              .then(course => course.json())
              .then(courseList => this.setState({
                data: courseList
              }))
          })
      })
  }
  

  componentWillUnmount(){
  }

  render() {
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;
    // this.state.loading = true;

    if (this.state.loading) {
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
      )
    } else 
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled keyboardVerticalOffset={keyboardVerticalOffset}>
          <LinearGradient style={styles.container}
            colors={['rgb(0, 58, 102)', 'rgba(1, 77, 135, .8)', 'rgba(255,255,255, .7)', 'rgba(255,255,255, .7)', 'rgba(255,255,255, 1)']}>
            <View style={{ position: 'absolute', flex: 1, height: '100%', width: '100%' }}>
              <Image
                style={styles.headerImg}
                source={require('../resources/img/lg-bg.png')}
              />
            </View>
            <View
              style={styles.header}
            >
              <Image
                style={styles.logo}
                source={require('../resources/img/logo.png')}
              />
              <Text style={styles.welcome}>
                Armenian Language Course
          </Text>
            </View>
            <View style={styles.body}>
              <Text style={styles.bodyText} color={[this.state.bodyTextColor]}>
                Log in to access Your lessons!
          </Text>
              <View style={styles.loginBlock}>
                <FormInput
                  containerStyle={{
                    height: 45, marginBottom: 15, backgroundColor: 'rgba(1, 77, 135, 0.15)',
                    borderRadius: 22
                  }}
                  paddingHorizontal={20}
                  onChangeText={(text) => this.setState({ text })}
                  placeholder={'User Name'}
                  value={this.state.text}
                  placeholderTextColor='rgba(1, 77, 135, 0.8)'
                  underlineColorAndroid='transparent'
                  inputStyle={{ color: 'rgba(1, 77, 135, 1)' }}
                />
                <FormInput
                  containerStyle={{
                    height: 45, marginBottom: 15, backgroundColor: 'rgba(1, 77, 135, 0.15)',
                    borderRadius: 22
                  }}
                  paddingHorizontal={20}
                  onChangeText={(password) => this.setState({ password })}
                  placeholder={'Password'}
                  value={this.state.password}
                  placeholderTextColor='rgba(1, 77, 135, 0.8)'
                  underlineColorAndroid='transparent'
                  secureTextEntry={true}
                />
                <Button
                  enabled
                  borderRadius={25}
                  containerStyle={{ height: 45, flex: 1, overflow: 'hidden', borderRadius: 4, backgroundColor: 'rgba(1, 77, 135, 1)', opacity: 1 }}
                  buttonStyle={{ height: 45, borderRadius: 25, backgroundColor: 'rgba(1, 77, 135, 1)', zIndex: 1, opacity: 1 }}
                  onPress={() => this.makeLoginRequest()}
                  title={'Login'}
                  textStyle={{ fontSize: 16 }}
                  color="rgba(255,255,255, .8)"
                />
              </View>
              <Text style={styles.bodyTextFooter}>
                If you still haven't account, please sign in here!
          </Text>
            </View>

          </LinearGradient>
        </KeyboardAvoidingView>
        <Text style={styles.copy}>
          AVC-AGBU 2019
          </Text>
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

export default Login;
