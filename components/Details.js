import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components'
import SafeArea from './SafeArea'

/*const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
)*/

export const DetailsScreen = ({ navigation }) => {

  const navigateBack = () => {
    navigation.goBack()
  }

  const BackAction = () => (
    <TopNavigationAction />
  )

  return (
    <SafeArea>
      <TopNavigation title='Smash Weather' alignment='center' accessoryLeft={BackAction}/>
      <Divider/>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text category='h1'>DETAILS</Text>
      </Layout>
    </SafeArea>
  )
}