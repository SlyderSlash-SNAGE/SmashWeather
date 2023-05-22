import {useEffect, useState} from 'react'
import axios from 'axios'
import { StatusBar } from 'expo-status-bar'
import { Layout, Text, Button } from '@ui-kitten/components'
import { Platform, Switch, Device } from 'react-native'
import SafeArea from './SafeArea'
import WeatherIcons from './WeatherIcons'
import * as SMS from 'expo-sms'
import * as Notification from 'expo-notifications'

const url = `http://api.weatherstack.com/current?access_key=2b66facf684809286d5571dfdfb1a2f9&query=Paris`



const Home = ({ navigation }) => {

    const [canSendSMS, setcanSendSMS] = useState(false)
    const [resultSMS, setResultSMS] = useState('En attente')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [data, setData] = useState(false)
    const [tokenExpo, setTokenExpo] = useState(false)


    const subscrireToNotifications = async()=>{
            console.log("Hey ho c'est un device")
            const {status : existingStatus} = await Notification.getPermissionsAsync()
            console.log(existingStatus)
            console.log("-------------------------------------------")
            let fStatus = existingStatus
            if (existingStatus!=='granted'){
                const {status} = await Notification.requestPermissionsAsync()
                console.log(status)
                fStatus = status
            }
            if(fStatus!=='granted'){
                setError('You say, I should not pass !')
            }
            const token = (await Notification.getDevicePushTokenAsync())
            console.log(token)
            setTokenExpo(token.data)

            if(Platform.OS === "android"){
                Notification.setNotificationChannelAsync("default", {
                    name: "default",
                    importance: Notification.AndroidImportance.MAX,
                    vibrationPattern: [0, 150 ,250 ,250],
                    lightColor: "#FF231F7C"
                })
            }
    }

    const handlePress = () => {
        navigation.navigate('SearchCity')
    }
    const sendSMS = () => {
        SMS.sendSMSAsync(
            ['0612345678'],
            `Hey, regarde le temps chez moi, il fait ${!loading ?data["temperature"] :'en chargement'}° Celsius`
        )
            .then (r => setResultSMS(r.result))
            .catch (e => setResultSMS('Oups I failed It again'))
    }
    const callAPI = () => {
        setLoading(true)
        axios.get(url)
            .then(res => {
                setData(res.data.current)
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                setError(`L'appel à l'API Météo à échoué ! Mince alors !`)
            })
    }
    useEffect(()=> {
        Notification.addNotificationResponseReceivedListener(
            response => {
                console.log("data => ", response.notification.request.content.body)
            }
        )
        subscrireToNotifications()
        SMS.isAvailableAsync()
            .then(r => setcanSendSMS(r))
            .catch(_e => setcanSendSMS(false))
        callAPI()
    }, [])
// => weather_descriptions => weather_icons ( array )
    return (
        <SafeArea>
            <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>{resultSMS}</Text>
                <Text category='h1' id="title">Hello there</Text>
                <Text>Mon OS :  {Platform.OS}</Text>
                <Text>Ma Version : {Platform.Version}</Text>
                <Text>TV : {Platform.isTV ?'oui':'non'}</Text>
                <Text>Chargement est : {loading ?'en cours' :'fini'}</Text>
                {tokenExpo && <Text>{tokenExpo}</Text>}
                { error
                    ? <Text>{error}</Text>
                    : null
                }
                <Text>Observé à : {!loading ?data["observation_time"] :'en chargement'}</Text>
                <Text>Température : {!loading ?data["temperature"] :'en chargement'}</Text>
                {!loading ?<WeatherIcons weathers={data["weather_icons"]}/> :null}
                <StatusBar style="auto" />
                <Button onPress={handlePress}>Changer De Page</Button>
                {canSendSMS ?<Text>Fonction SMS disponible</Text> :<Text>Ne peux pas envoyer de SMS</Text>}
                {canSendSMS ?<Button>Send Message</Button> :<Text>Bouton non disponible sur votre appareil sry not sry</Text>}
                <Button onPress={sendSMS}>Send Message</Button>
            </Layout>
        </SafeArea>
    )
  }

  export default Home