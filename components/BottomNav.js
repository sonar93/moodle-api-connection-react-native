import React from 'react';
import { 
  View, 
  StyleSheet, 
  Image 
} from 'react-native';
import BottomNavigation, {
  IconTab,
  Badge
} from 'react-native-material-bottom-navigation';
import Icon from '@expo/vector-icons/MaterialCommunityIcons'


class BottomNav extends React.Component {
  state = {
    activeTab: 'games'
  }

  tabs = [
    {
      key: 'person',
      label: 'Person',
      barColor: '#014d87',
      pressColor: 'rgba(255, 255, 255, 0.16)',
      icon: 'account'
    },
    {
      key: 'calendar',
      label: 'Calendar',
      barColor: '#014d87',
      pressColor: 'rgba(255, 255, 255, 0.16)',
      icon: 'calendar'
    },
    {
      key: 'settings',
      label: 'Settings',
      barColor: '#014d87',
      pressColor: 'rgba(255, 255, 255, 0.16)',
      icon: 'book'
    }
  ]

  state = {
    activeTab: this.tabs[0].key
  }

  renderIcon = icon => ({ isActive }) => (
    <Icon size={24} color="white" name={icon} />
  )

  renderTab = ({ tab, isActive }) => (
    <IconTab
      isActive={isActive}
      key={tab.key}
      label={tab.label}
      renderIcon={this.renderIcon(tab.icon)}
    />
  )

  render() {
    return (
      <View style={{ height: 100, backgroundColor: '#014d87'}}>
        <BottomNavigation
        style = {{ elevation: 0}}
        containerStyle = {{elevation: 0}}
          tabs={this.tabs}
          activeTab={this.state.activeTab}
          onTabPress={newTab => this.setState({ activeTab: newTab.key })}
          renderTab={this.renderTab}
          useLayoutAnimation
        />
      </View>
    )
  }
}

export default BottomNav;