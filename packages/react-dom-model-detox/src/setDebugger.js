module.exports = (isDebuggingRemotely) => {
  const { NativeModules } = require('react-native');

  if (!NativeModules) throw new Error('Got nothing from "import { NativeModules } from \'react-native\';"');
  if (!NativeModules.DevSettings) throw new Error('Couldn\'t find anything at NativeModules.DevSettings');
  if (!NativeModules.DevSettings.setIsDebuggingRemotely) throw new Error('Couldn\'t find anything at NativeModules.DevSettings.setIsDebuggingRemotely');
  if (typeof NativeModules.DevSettings.setIsDebuggingRemotely !== 'function') {
    throw new Error('NativeModules.DevSettings.setIsDebuggingRemotely is not a function');
  }

  NativeModules.DevSettings.setIsDebuggingRemotely(isDebuggingRemotely);
}


