import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { setFuncTestEnvironment, selectors } from 'react-dom-model-detox/client';

setFuncTestEnvironment(true);

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state  = {
      toggleButtonState: true
    }
  }

  onPress = () => {
    this.setState({ toggleButtonState: !this.state.toggleButtonState })
  }

  render() {
    return (
      <View style={styles.container} {...selectors('App')}>
        <Text {...selectors(null, 'twoClassesExample')}>Open up App.js to start working on your app!</Text>
        <Text {...selectors(null, 'twoClassesExample')}>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <TouchableHighlight {...selectors('ToggleButton')} onPress={this.onPress}>
          <Text {...selectors('ToggleButtonText')}>{this.state.toggleButtonState ? 'Yes' : 'No'}</Text>
        </TouchableHighlight>
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
