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
// import DrawerPanel from './DrawerPanel';
import BottomNav from './BottomNav';
import { LinearGradient } from 'expo';
import { Ionicons } from '@expo/vector-icons';

// import {createDrawerNavigator, DrawerActions
// } from 'react-navigation';

class MovieList extends Component {

  constructor(props) {
    super(props);
    this._isMounted = false
    this.state = {
      render: false,
      loading: false,
      data: [],
      userData: [],
      error: null,
      refreshing: false,
      id: null,
      query: '',
      modalVisible: false,
      userId: null,
      token: null,
      courseId: null
    };
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  componentWillMount() {
    //    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }



  async componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    const token = await AsyncStorage.getItem('token');
    const userId = await AsyncStorage.getItem('userId');
    this.setState({
      token: JSON.parse(token),
      userId: JSON.parse(userId)
    })
    // this.checkAsync()
    this._isMounted = true
    this.makeRemoteRequest()
    setTimeout(() => { this.setModalVisible(true) }, 600)
  }

  handleBackButton = () => {
    return true
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  // shouldComponentUpdate(){
  //   return this.state.render
  // }

  // checkAsync() {
  //   if(this.state.userId === null){
  //     this.setState({render: false})
  //     this.props.navigation.navigate('LoginScreen', {
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
  //     return false;
  //    } else {
  //     this.setState({render: true})
  //     return true;
  //    }
  // }

  makeRemoteRequest = () => {

    const url = `https://www.avc-agbu.org/edu/webservice/rest/server.php?moodlewsrestformat=json&wstoken=${this.state.token}&wsfunction=core_enrol_get_users_courses&userid=${this.state.userId}`;
    const userUrl = `https://www.avc-agbu.org/edu/webservice/rest/server.php?moodlewsrestformat=json&wstoken=${this.state.token}&wsfunction=core_user_get_users_by_field&field=id&values[0]=${this.state.userId}`
    console.log(url)
    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res,
          error: null,
          refreshing: false
        })
      })
      .catch(error => {
        this.setState({ error, loading: false, refreshing: false })
      })
    fetch(userUrl)
      .then(res => res.json())
      .then(res => {
        // console.log(res)
        this.setState({
          userData: res[0],
          error: null,
          refreshing: false
        })
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
        colors={['rgba(255,255,255, 1)', 'rgba(1, 77, 135, .0)', 'rgba(255,255,255,1)']}>
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
          <Text style={styles.headerText}>Your Courses</Text>
        </View>
      </LinearGradient>
    )
  }

  renderFooter = () => {
    if (this.state.loading === false) {
      return (
        <View
          style={{
            height: 20
          }}>
          <DotIndicator color="rgba(1, 77, 135, 1)" />
        </View>
      )
    } else {
      return (
        <View
          style={{
            height: 20
          }}>
        </View>
      )
    };
  }

  /* handleSearch = text => {
     console.log('text', text);
     this.setState({query: text});
     const data = this.state.data.filter(
       search => search.title.match(text)
     )
   } */


  handleRefresh = () => {
    this.setState({
      refreshing: true,
    },
      () => {
        this.makeRemoteRequest();
      })
  }

  handleLessons = (id) => {
    this.setState(
      {
        courseId: id
      }, () => this.props.navigation.navigate('Lessons', { token: this.state.token, userId: this.state.userId, courseId: this.state.courseId })
    )
  };

  async componentWillUnmount() {
  }


  idArr = [1716, 1717]
  filterIds() {
    const idArr = [1716, 1717]
    return this.state.data.filter(data => data.id === idArr.forEach(el => el))
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
        >
          <View style={{ flex: 1, backgroundColor: 'rgba(255,255,255, .9)', top: 0, bottom: 0, right: 0, left: 0, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{
              backgroundColor: 'white', padding: 20, borderRadius: 25, shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}>
              <View style={{ marginBottom: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Image
                  style={{ borderRadius: 50, width: 80, height: 80, overflow: 'hidden' }}
                  source={{ uri: this.state.userData.profileimageurl }}
                />
                <View style={{ flexDirection: 'column', margin: 10 }}>
                  <Text style={{ fontSize: 25, fontWeight: '500', color: 'rgba(1, 77, 135, 1)' }}>Welcome</Text>
                  <Text style={{ fontSize: 16 }}>{this.state.userData.fullname}!</Text>
                </View>
              </View>
              <Text style={{ width: 300, marginBottom: 20, flexWrap: 'wrap', fontSize: 14, justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>We're happy to present you the mobile application of AVC Armenian Language Course, press start to view your courses.</Text>
              <Button
                borderRadius={25}
                containerStyle={{ height: 45, flex: 1, overflow: 'hidden', borderRadius: 4, backgroundColor: 'rgba(1, 77, 135, 1)' }}
                buttonStyle={{ height: 45, borderRadius: 25, backgroundColor: 'rgba(1, 77, 135, 1)' }}
                onPress={() => this.setModalVisible(!this.state.modalVisible)}
                title={'Start!'}
                textStyle={{ fontSize: 16 }}
                color="rgba(255,255,255, .8)"
              />
            </View>
          </View>
        </Modal>
        <Header
          outerContainerStyles={{
            backgroundColor: 'white', height: '15%', borderBottomWidth: 0, paddingTop: 30
          }}
          innerContainerStyles={{ justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', marginTop: 5 }}
          leftComponent={<TouchableOpacity onPress={() => {
            AsyncStorage.clear()
            this.props.navigation.navigate('LoginScreen')
          }}><Ionicons name="ios-log-out" size={30} color="#014d87" /></TouchableOpacity>}
          rightComponent={<TouchableHighlight style={{ }}
          // onPress={() => this.props.navigation.navigate('DrawerOpen')}
          >
          <Ionicons name="ios-menu" size={30} color="#014d87" />
      </TouchableHighlight>}
          centerComponent={<SearchBar containerStyle={{ backgroundColor: 'transparent', borderTopWidth: 0, borderBottomWidth: 0, width: 250 }}
            inputStyle={{ backgroundColor: 'white', color: '#014d87', borderWidth: 1, borderColor: '#014d87' }} placeholder="Type here.." round ref={search => this.search = search}
          />}
        />
        <List containerStyle={{ marginTop: -1, paddingBottom: 20, borderTopWidth: 0, borderBottomWidth: 0, height: '86%' }}>
          <FlatList
            data={this.state.data.filter(({ shortname }) => shortname.slice(0, 2) === 'A1')}
            renderItem={({ item }) => (
              // <TouchableOpacity onPress={() => {
              //   //this.setState({courseId: item.id})
              //   // console.log(this.state.courseId)
              //   this.handleLessons(item.id)
              // }
              // }>
              <Card style={{ marginBottom: 5, padding: 0 }} borderRadius={5} imageStyle={{ opacity: 1 }}>
                <View>
                  <Image
                    style={styles.courseImg}
                    resizeMode="cover"
                    source={require('../resources/img/coursePoster.png')}
                    containerStyle={{ borderBottomWidth: 0 }}
                  />
                  <Text style={styles.courseText}>{`${item.shortname}`} </Text>
                  <Button
                    borderRadius={25}
                    containerStyle={{ marginTop: 15, height: 45, flex: 1, overflow: 'hidden', borderRadius: 4, backgroundColor: 'rgba(1, 77, 135, 1)' }}
                    onPress={() => { this.handleLessons(item.id) }}
                    buttonStyle={{ marginTop: 15, height: 45, borderRadius: 25, backgroundColor: 'rgba(1, 77, 135, 1)' }}
                    title={'View Course'}
                    textStyle={{ fontSize: 16 }}
                    color="rgba(255,255,255, .8)"
                  />
                </View>
              </Card>
              /* <ListItem
                roundAvatar
                avatar={`${item.shortname}`}
                title={`${item.shortname}`}
                containerStyle={{ borderBottomWidth: 0 }}
              /> */
              // </TouchableOpacity>
            )}
            keyExtractor={item => JSON.stringify(item.id)}
            // ItemSeparatorComponent={this.renderItemSeparator}
            ListHeaderComponent={this.renderHeader}
            ListFooterComponent={this.renderFooter}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
          />
        </List>
        {/* <View style={{ marginTop: -23, paddingBottom: 20, backgroundColor: '#014d87' }}>
                <BottomNav />
              </View> */}
      </View>
    );
  }
}

// const DrawerNavigator = createDrawerNavigator({
//   Home: {
//     screen: MovieList
//   }
// },
// {
//   initialRouteName: 'Home',
//   drawerWidth: 200
// });



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

export default MovieList;