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
import { persistor, store } from './src/store/store';
import TodoList from './src/screens/todoList';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';





const App=(): React.JSX.Element=>{
  return(<>
  <SafeAreaProvider>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <TodoList/>
     </PersistGate>
   </Provider>
  </SafeAreaProvider>;
  
  </>)
}

const styles = StyleSheet.create({

});

export default App;
