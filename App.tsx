/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import TodoList from './src/screens/todoList';





const App=(): React.JSX.Element=>{
  return(<>
  <Provider store={store}>
    <TodoList/>
  </Provider>
  </>)
}

const styles = StyleSheet.create({

});

export default App;
