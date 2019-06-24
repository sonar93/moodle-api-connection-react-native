import React, { Component } from 'react';
import { AppRegistry, WebView, StatusBar } from 'react-native';
import { Icon } from 'react-native-elements';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { ScreenOrientation } from 'expo'


export default class Lesson extends Component {
  constructor( props ) {
    super( props );
    this.webView = null;
    this.state = {
      userId: this.props.navigation.state.params.userId,
      token: this.props.navigation.state.params.token,
      courseId: this.props.navigation.state.params.courseId,
      lessonUrl: this.props.navigation.state.params.lessonUrl
    }
}

componentDidMount(){
  StatusBar.setHidden(true);
  this.changeScreenOrientation();
}

changeScreenOrientation() {
  ScreenOrientation.allowAsync(ScreenOrientation.Orientation.LANDSCAPE);
}

componentWillUnmount() {
  StatusBar.setHidden(false);
  ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT);
}

onMessage( event ) {
    console.log( "On Message", event.nativeEvent.data );
}

sendPostMessage() {
    this.webView.postMessage(JSON.stringify({
      "token": this.state.token,
      "user_id": this.state.userId
    }));
}

render() {
    return (
      <View style={{flex: 1}}>
        <View style={{ position: 'absolute', top: 0, right: 0, margin: 7, justifyContent: 'flex-start', alignItems: 'flex-end', zIndex: 1 }}>
          <TouchableOpacity onPress = {() => this.props.navigation.goBack()}><Icon name='navigate-before' color='#fff'/><Text style={{fontSize: 8, color: 'white'}}>Back to lessons</Text></TouchableOpacity>
        </View>
            <WebView
                onLoad={() => this.sendPostMessage()}
                scalesPageToFit = {true}
                domStorageEnabled={true}
                startInLoadingState={true}
                style={{flex: 1, height: '100%'}}
                startInLoadingState
                javaScriptEnabled
                mixedContentMode = {'always'}
                allowsInlineMediaPlayback = {true}
                bounces={false}
                scrollEnabled={true}
                source={{uri: this.props.navigation.state.params.lessonUrl.fileurl}}     
                ref={( webView ) => this.webView = webView}
                // onMessage={this.onMessage}
            />
        </View>
    );
  }
}

AppRegistry.registerComponent( 'Lesson', () => Lesson );