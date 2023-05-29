//import * as eva from '@eva-design/eva'
//import { ApplicationProvider } from '@ui-kitten/components'
import { Text, View, StyleSheet } from 'react-native'
//import {AppNavigator} from './components/Navigation'


export default function App() {
  return (
    //<ApplicationProvider {...eva} theme={eva.light}>
        //<AppNavigator />
    //</ApplicationProvider>
    <View>
      <Text>Hello There</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
