import { StatusBar } from 'expo-status-bar'
import { Layout, Text } from '@ui-kitten/components'
import { Platform, Switch } from 'react-native'
import SafeArea from './SafeArea'

const Home = () => {
    return (
        <SafeArea>
            <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text category='h1' id="title">Hello there</Text>
                <Text>Mon OS :  {Platform.OS}</Text>
                <Text>Ma Version : {Platform.Version}</Text>
                <Text>TV : {Platform.isTV ?'oui':'non'}</Text>
                <StatusBar style="auto" />
                <Switch></Switch>
            </Layout>
        </SafeArea>
    )
  }

  export default Home