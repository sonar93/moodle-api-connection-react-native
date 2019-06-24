import React, { Component } from 'react';
import { ScrollView, FlatList, Text } from 'react-native';
import { View } from 'react-native-animatable';
import { List, Button } from 'react-native-elements';

class DrawerPanel extends Component {

  render() {
    console.log(this.props);
    return (
      <ScrollView style={{ backgroundColor: '#81A3A7' }}>

        <Button
          onPress={() => {
            this.props.navigation.actions.closeDrawer();
            this.props.navigation.navigate('MainActivity');
          }}
          backgroundColor={'#81A3A7'}
          containerViewStyle={{ width: '100%', marginLeft: -61 }}
          title='Main page' 
        />
        <Button
          onPress={() => this.props.navigation.navigate('ThisWeek')}
          backgroundColor={'#81A3A7'}
          containerViewStyle={{ width: '100%', marginLeft: -46 }}
          title='This weel'
        /> 
      </ScrollView>
    );
  }
}

export default DrawerPanel;