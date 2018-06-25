import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, ScrollView } from 'react-native';
import { setFuncTestEnvironment, selectors } from 'react-dom-model-detox/client';

setFuncTestEnvironment(true);

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state  = {
      toggleButtonState: true,
      testState: {
        first: true,
        second: false, 
      }
    }
  }

  onPress = () => {
    this.setState({ toggleButtonState: !this.state.toggleButtonState })
  }

  render() {
    return (
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyle}
        {...selectors('App', 'visibleAtFirst',  'exists')}
        testProps={{ first: true, second: false }}
      >
        <Text {...selectors('Text1', 'twoClassesExample')} exampleProp={true}>Open up App.js to start working on your app!</Text>
        <Text {...selectors(null, 'twoClassesExample')}>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <TouchableHighlight {...selectors('ToggleButton')} onPress={this.onPress}>
          <Text {...selectors('ToggleButtonText')}>{this.state.toggleButtonState ? 'Yes' : 'No'}</Text>
        </TouchableHighlight>
        <View style={styles.spacing} />
        <Text {...selectors(null, 'notVisibleAtFirst')}>Shake your phone to open the developer menu.</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  spacing: {
    height: 600,
  },

  contentContainerStyle: {
    paddingTop: 50,
    paddingBottom: 100
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
