import React, { useEffect, useState } from 'react'
import { View, Text, TextInput } from 'react-native'
import axios from 'axios';
import WeatherIcons from './WeatherIcons';
import { Button } from '@ui-kitten/components';


export default function SearchCity() {
    const [city,setcity] = useState('Paris')
    const url = `http://api.weatherstack.com/current?access_key=2b66facf684809286d5571dfdfb1a2f9&query=${city}`
    const [dataCity,setDataCity] = useState(null)
    let precipitation ='';
    let cloudCover = '';

    async function cityFetch() {
        const data = await axios.get(url);
        const cityChoose = await data.data
        setDataCity(cityChoose)
    }
    useEffect(()=>{
        cityFetch()
    },[])
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
    <>
        <View>
            <TextInput onChangeText={HandleChangeCity} value= {city} placeholder="Choisis ta ville"></TextInput>
            <Button 
                title="Changer la ville"
                onPress={HandlesubmitCity} 
                
                />
        {dataCity ? 
        <>
            <Text>La météo de votre ville : </Text>
            <Text>A  {dataCity.location.name}, il fait : {dataCity.current.temperature}°C à {dataCity.current.observation_time} </Text>
            <Text>Prevision des Précipitations : {dataCity.current.precip} - {precipitation}</Text>
            <Text>{ cloudCover}</Text> 
            <WeatherIcons weathers={dataCity.current["weather_icons"]}></WeatherIcons>
        </> 
        : null}

        </View>
      
    </>
  )
}

