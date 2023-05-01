import {useEffect, useState} from 'react'
import axios from 'axios'
import { StatusBar } from 'expo-status-bar'
import { Layout, Text } from '@ui-kitten/components'
import { Platform, Switch } from 'react-native'
import SafeArea from './SafeArea'
import WeatherIcons from './WeatherIcons'

const url = `http://api.weatherstack.com/current?access_key=4a0981798d3b5e3764fee50abf88bf6b&query=Paris`



const Home = () => {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [data, setData] = useState(false)

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
        callAPI()
    }, [])
    const handleSwitch = () => {
        setLoading(!loading)
    }
// => weather_descriptions => weather_icons ( array )
    return (
        <SafeArea>
            <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text category='h1' id="title">Hello there</Text>
                <Text>Mon OS :  {Platform.OS}</Text>
                <Text>Ma Version : {Platform.Version}</Text>
                <Text>TV : {Platform.isTV ?'oui':'non'}</Text>
                <Text>Chargement est : {loading ?'en cours' :'fini'}</Text>
                { error
                    ? <Text>{error}</Text>
                    : null
                }
                <Text>Observé à : {!loading ?data["observation_time"] :'en chargement'}</Text>
                <Text>Température : {!loading ?data["temperature"] :'en chargement'}</Text>
                {!loading ?<WeatherIcons weathers={data["weather_icons"]}/> :null}
                <StatusBar style="auto" />
                <Switch onTouchStart={handleSwitch}></Switch>
            </Layout>
        </SafeArea>
    )
  }

  export default Home