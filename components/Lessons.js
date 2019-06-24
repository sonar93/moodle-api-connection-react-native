import React, { Component, PureComponent } from 'react';
import { List, ListItem, SearchBar, Header, Icon } from 'react-native-elements';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  BackHandler,
  AsyncStorage
} from 'react-native';
import {
  DotIndicator
} from 'react-native-indicators';
import BottomNav from './BottomNav';
import { LinearGradient } from 'expo';
import { ScreenOrientation } from 'expo'

class Lessons extends PureComponent {

  changeScreenOrientation() {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT);
  }

  constructor(props) {
    super(props);
    // this.handleBackButton = this.handleBackButton.bind(this)
    this.state = {
      loading: false,
      data: [],
      userData: [],
      error: null,
      refreshing: false,
      id: null,
      query: '',
      modalVisible: false,
      userId: this.props.navigation.state.params.userId,
      token: this.props.navigation.state.params.token,
      courseId: this.props.navigation.state.params.courseId,
      lessonUrl: null
    }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton)
    this.changeScreenOrientation()
    this.makeRemoteRequest();
  }

  handleBackButton = () => {
      return this.props.navigation.goBack()
    }

  makeRemoteRequest =  () => {
    const token = this.props.navigation.state.params.token;
    const userId =this.props.navigation.state.params.userId;
    const id = this.props.navigation.state.params.courseId;
    const url = `https://www.avc-agbu.org/edu/webservice/rest/server.php?moodlewsrestformat=json&wstoken=${token}&wsfunction=core_course_get_contents&courseid=${id}`;
    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(async res => {
        const result = []
        this.setState({
          data: res[1].modules,
          error: null,
          refreshing: false
        })
        AsyncStorage.setItem('data', JSON.stringify(res[1].modules))
      })
      .catch(error => {
        this.setState({ error, loading: false, refreshing: false })
      })
  }

  renderItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '90%',
          backgroundColor: '#ddd'
        }}>
      </View>
    )
  }

  renderHeader = () => {
    return (
      <LinearGradient style={{ marginBottom: -12, zIndex: 1 }}
        colors={['rgba(255,255,255, 1)', 'rgba(255,255,255, 0.3)', 'rgba(255,255,255,1)']}>
        <Image
          style={styles.headerImg}
          source={require('../resources/img/book.jpg')}
        />
        {/* <Text style={{ color: '#014d87', fontWeight: '500', backgroundColor: 'white', paddingTop: 5, paddingLeft: 12, paddingBottom: 3}}>Your courses</Text> */}
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, marginTop: -10, height: 200, width: '100%', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <Image
            style={styles.logo}
            source={require('../resources/img/logo.png')}
            resizeMode="contain"
          />
          <Text style={styles.headerText}>Your Lessons</Text>
        </View>
      </LinearGradient>
    )
  }

  renderFooter = () => {
    if(this.state.loading===false){
    return (
      <View
        style={{
          marginBottom: 10
        }}>
        <DotIndicator color="rgba(1, 77, 135, 1)" />
      </View>
    )} else{ return (
      <View
        style={{
          marginBottom: 10
        }}>
      </View>
    )};
  }

  handleRefresh = () => {
    this.setState({
      refreshing: true,
    }, () => {
        this.makeRemoteRequest();
       })
  }
  
  handleLesson = (url) => {
    this.setState(
      {
        lessonUrl: url
      }, () => this.props.navigation.navigate('Lesson', {token: this.state.token, userId: this.state.userId, courseId: this.state.courseId, lessonUrl: this.state.lessonUrl})
    )
    //this.props.navigation.navigate('Lessons', { token: this.state.token, userId: this.state.userId, courseId:  this.setState({ courseId: id })})
    // this.timer = setTimeout(() => this.props.navigation.navigate('Lessons', { token: this.state.token, userId: this.state.userId, courseId:  this.state.courseId}), 10)
    // clearTimeout(this.timer, 100)
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
                <Header
          outerContainerStyles={{
            backgroundColor: 'white', height: '15%', borderBottomWidth: 0, paddingTop: 30
          }}
          innerContainerStyles={{ justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', marginTop: 5 }}
          leftComponent={<TouchableOpacity onPress = {() => this.props.navigation.goBack()}><Icon name='navigate-before' color='#014d87'/></TouchableOpacity>}
          rightComponent={{ icon: 'menu', color: '#014d87'}}
          centerComponent={<SearchBar containerStyle={{ backgroundColor: 'transparent', borderTopWidth: 0, borderBottomWidth: 0, width: 250}}
            inputStyle={{ backgroundColor: 'white', color: '#014d87', borderWidth: 1, borderColor: '#014d87' }} placeholder="Type here.." round ref={search => this.search = search} 
            />}
        />
        <List containerStyle={{ marginTop: -1, borderTopWidth: 0, borderBottomWidth: 0, paddingBottom: 0, height: '85%' }}>
           <FlatList
            data={this.state.data}
            renderItem={({ item }) =>
            <TouchableOpacity onPress = {() => this.handleLesson(item.contents[0])}>
              <ListItem
                roundAvatar
                leftIcon = {{name:'book', color: '#014d87'}}
                title={`${item.contents[0].filename}`}
                containerStyle={{ borderBottomWidth: 0 }}
              />
              </TouchableOpacity>
            }
            key = {item => JSON.stringify(item.contents[0].timemodified)}
            keyExtractor={item => JSON.stringify(item.contents[0].timemodified)}
            ItemSeparatorComponent={this.renderItemSeparator}
            ListHeaderComponent={this.renderHeader}
            ListFooterComponent={this.renderFooter}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
          /> 
        </List>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    color: 'white',
    backgroundColor: '#F5FCFF',
  },

  search: {
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
  },

  headerImg: {
    borderTopWidth: 0,
    marginTop: -1,
    width: '100%',
    height: 200,
    opacity: .3,
    zIndex: -1
  },

  courseImg: {
    borderTopWidth: 0,
    borderRadius: 5,
    margin: 0,
    width: '100%',
    height: 200,
    opacity: 1,
    zIndex: -1
  },

  logo: {
    width: 75,
    height: 75,
    margin: 'auto',
    marginBottom: 15,
    alignSelf: 'center',
  },

  headerText: {
    color: '#014d87',
    fontSize: 30,
  },

  courseText: {
    color: '#014d87',
    marginTop: 10,
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center'
  },

  dark: {
    marginTop: -12,
    backgroundColor: '#000',
  }
});

export default Lessons;