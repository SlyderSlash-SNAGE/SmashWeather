import React, { useEffect, useState } from 'react'
import { View, Text, TextInput } from 'react-native'
import axios from 'axios';
import WeatherIcons from './WeatherIcons';
import { Button } from '@ui-kitten/components';
import SafeArea from './SafeArea'
import * as Location from 'expo-location'


export default function SearchCity() {
    const [city,setcity] = useState('Paris')
    const [location , setLocation] = useState(false)
    const url = `http://api.weatherstack.com/current?access_key=b39ec1ee2cc1e519a2e587b3c414e5c8&query=${city}`
    const [dataCity,setDataCity] = useState(null)
    const [error, setError] = useState(false)
    let precipitation ='';
    let cloudCover = '';

    function cityFetch(receiveURL) {
        axios.get(receiveURL || url)
            .then(r => setDataCity(r.status === 200 ?r.data :null))
            .catch(e => console.error(e))
    }
    function testLocation () {
        Location.requestForegroundPermissionsAsync()
        .then(s => {
            s.status!='granted' 
                ? setError("Access denied => "+s.status)
                : Location.getCurrentPositionAsync({})
                .then(location => {
                    setLocation(location)
                    cityFetch(`http://api.weatherstack.com/current?access_key=b39ec1ee2cc1e519a2e587b3c414e5c8&query=${location.coords.latitude},${location.coords.longitude}`)
                })
                .catch(e => setError("Cannot Access Location"))
        })
        .catch(e => setError("Access denied cause error"))
    }
    useEffect(()=>{
        if(location.coords && location.coords.latitude && location.coords.longitude){
        setcity(`${location.coords.latitude},${location.coords.longitude}`)
        cityFetch()
        }
    },[location])
    useEffect(()=>{
        cityFetch()
        testLocation()
    },[])//a //aj //aja //ajac //ajaci //ajacio
    function HandlesubmitCity () {
        cityFetch()
    }
    function HandleChangeCity (city) {
        setcity(city)
    }
    
    if( dataCity && dataCity.current.cloudcover === 0){
         cloudCover = <Text>Ciel dégagé, c'est l'heure de la bronzette sauf en hiver</Text>
    } else if (dataCity && dataCity.current.cloudcover <= 25){
        cloudCover = <Text>Quelques nuages isolés</Text>
    } else if (dataCity && dataCity.current.cloudcover <= 50){
        cloudCover = <Text>Des nuages, pas de quoi en faire un fromage</Text>
    } else {
        cloudCover = <Text>Ciel couvert</Text>
    }
    if(dataCity && dataCity.current.precip === 0){
        precipitation = <Text>Il ne va pas pleuvoir aujourd'hui !</Text>
   } else if (dataCity && dataCity && dataCity.current.precip <= 3){
        precipitation = <Text>Pluie faible, pas de quoi faire une douche !</Text>
   } else if (dataCity && dataCity.current.precip <= 7){
        precipitation = <Text>Pluie modérée, les escargots sont de sortis</Text>
   } else {
        precipitation = <Text>C'est le déluge, choppe l'Arche de Noê</Text>
   }
    return (
    <SafeArea>
        <View>
            <TextInput onChangeText={HandleChangeCity} value= {city} placeholder="Choisis ta ville"/>
            <Button 
                onPress={HandlesubmitCity} 
            >Changer la ville
            </Button>
        {dataCity ? 
        <>
            {error ?<Text>Erreur : {error}</Text> :null}
            {location ?<Text>Localisation : {location.coords.latitude} / {location.coords.longitude}</Text> :null}
            <Text>La météo de votre ville : </Text>
            <Text>A  {dataCity.location.name}, il fait : {dataCity.current.temperature}°C à {dataCity.current.observation_time} </Text>
            <Text>Prevision des Précipitations : {dataCity.current.precip} - {precipitation}</Text>
            <Text>{ cloudCover}</Text> 
            <WeatherIcons weathers={dataCity.current["weather_icons"]}></WeatherIcons>
        </> 
        : null
        }
        </View>
    </SafeArea>
  )
}

