import React from 'react';
import { StyleSheet, Text, View, Animated, Easing, AsyncStorage } from 'react-native';
import MovieList from './components/MovieList';
import BottomNav from './components/BottomNav';
import Login from './components/Login';
import Lessons from './components/Lessons';
import Lesson from './components/Lesson';
import Spinner from './components/Spinner';
import Loading from './components/Loading'
import {createStackNavigator, createDrawerNavigator} from 'react-navigation';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isAuth: false,
      loading: false,
      home: 'LoginScreen'
    };
  }

  componentWillReceiveProps() {
    const token = this.props.navigation.state.params.token;
    const userId =this.props.navigation.state.params.userId;
      if (token) {
        this.setState({ auth: true });
      } else {
        this.setState({ auth: false });
      }
  }

  async componentDidMount() {
    console.log(await AsyncStorage.getItem('userId'))
  }

  render() {
      return (
        //<Provider>
          <AppNavigator style = {{flex: 1}} />
        //</Provider>
      );
    }
}

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 250,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {      
      const { layout, position, scene } = sceneProps
      const thisSceneIndex = scene.index
      const width = layout.initWidth
      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [width, 0],
      })
      return { transform: [ { translateX } ] }
    },
  }
}

const AppNavigator = createStackNavigator({
  HomeScreen: {screen:MovieList,  
    screenPlaceholder: {
    screen: Spinner,
    animation: { },
    
  } },
  LoginScreen: {screen:Login},
  Lessons: {screen: Lessons},
  Lesson: {screen: Lesson},
  Loading: {screen: Loading}
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  },
  initialRouteName: 'Loading',
  initialRouteParams: { transition: 'fade' },
  transitionConfig
 }
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});