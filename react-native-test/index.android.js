/**
 * Sample React Native Apps
 */

import React, {
  AppRegistry,
  Component,
  Text,
  ToolbarAndroid,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3B3738'
  }
})

import MainView from './src/components/mainView.js';

class ArcuDanyka extends Component {

  render() {

    return (
      <View style={styles.container}>
        <MainView />
      </View>
    );
  }
}



AppRegistry.registerComponent('ArcuDanyka', () => ArcuDanyka);
