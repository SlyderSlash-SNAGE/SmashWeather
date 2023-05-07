import * as eva from '@eva-design/eva'
import { ApplicationProvider } from '@ui-kitten/components'
import { StyleSheet } from 'react-native'
import {AppNavigator} from './components/Navigation'


export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
        <AppNavigator />
    </ApplicationProvider>
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
