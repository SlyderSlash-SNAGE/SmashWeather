import {useEffect, useState} from 'react'
import axios from 'axios'
import { StatusBar } from 'expo-status-bar'
import { Layout, Text } from '@ui-kitten/components'
import { Switch } from 'react-native'
import SafeArea from './SafeArea'
import Weather from './Weather'
import { DeviceInfo } from './DeviceInfo'

const url = `http://api.weatherstack.com/current?access_key=4a0981798d3b5e3764fee50abf88bf6b&query=Bordeaux`



const Home = () => {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [data, setData] = useState(false)

    const callAPI = () => {
        setLoading(true)
        axios.get(url)
            .then(res => {
                if(res.data.current){
                    setData(res.data.current)
                    setLoading(false)
                }
                else setError(`L'appel à l'API Météo à échoué ! Mince alors !`)
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
                <DeviceInfo />
                <Text>Chargement est : {loading ?'en cours' :'fini'}</Text>
                { error
                    ? <Text>{error}</Text>
                    : null
                }
                {!loading 
                    ? <Weather weathers={data}/> 
                    : <Text>en chargement</Text>
                }
                <Weather.WeatherIcons />
                <StatusBar style="auto" />
                <Switch onTouchStart={handleSwitch}></Switch>
            </Layout>
        </SafeArea>
    )
  }

  export default Home