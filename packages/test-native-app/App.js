import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { setFuncTestEnvironment, selectors } from 'react-dom-model-detox/client';

setFuncTestEnvironment(true);

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container} {...selectors('App', 'View')}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
