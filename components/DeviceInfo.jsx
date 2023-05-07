import { Platform, Text } from 'react-native'
export const DeviceInfo = () => (
    <>
        <Text>Mon OS :  {Platform.OS}</Text>
        <Text>Ma Version : {Platform.Version}</Text>
        <Text>TV : {Platform.isTV ?'oui':'non'}</Text>
    </>
)