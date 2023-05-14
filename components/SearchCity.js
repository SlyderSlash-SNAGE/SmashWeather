import React, { useEffect, useState } from 'react'
import { View, Text, TextInput } from 'react-native'
import WeatherIcons from './WeatherIcons'
import { Button } from '@ui-kitten/components'
import SafeArea from './SafeArea'
import { weatherApi } from './../configs/api'
import * as Location from 'expo-location'


export default function SearchCity() {
    // précèdement : const [city, setCity] = useState('Paris')
    const [wLocation,setWLocation] = useState('Paris') 
    /* 
    Le parametre "query" de l'API peut prendre plusieurs valeurs :
     - Une localisation par nom, ex : Paris ou London, UnitedKingdom
     - Plusieurs locationsation par nom, ex : London;Singapur;Shanghai
     - Un Zip Code ( UK, Canada, US only ), ex : 99501
     - Des coordonnées Latitude / Longitude, ex : 40.7831,-73.9712
     - Une adresse ip afin de déterminer sa localisation ( approximative ), ex : 153.65.8.20
     - Une autodetection de l'IP fonctionnant sur le même principe précèdent, ex : fetch:ip

     Nous pouvons donc garder city comme localisation en cherchant son nom pour une meilleure lecture
     city devient alors wLocation pour Weather Location
    */
    // précèdement : const url = `http://api.weatherstack.com/current?access_key=b39ec1ee2cc1e519a2e587b3c414e5c8&query=${wLocation}`
    /*
    Nous créons une instance pour weatherstack avec Axios dans configs/api
    Cette dernière contiendra la base url : http://api.weatherstack.com
    et le params de clé api : access_key=b39ec1ee2cc1e519a2e587b3c414e5c8
    Nous pouvons donc appeler l'instance, uniquement avec le chemin current et la query wLocation, ce qui donnera le lien suivant :
    `http://api.weatherstack.com/current?access_key=b39ec1ee2cc1e519a2e587b3c414e5c8&query=${wLocation}`
    */
    const [dataCity,setDataCity] = useState(null)
    const [error, setError] = useState(false)
    let precipitation ='';
    let cloudCover = '';

    function cityFetch() {
        /* ici on modifie la requête pour utiliser l'instance axios créée
        Précèdement : axios.get(receiveURL || url)
            .then(r => setDataCity(r.status === 200 ?r.data :null))
            .catch(e => console.error(e))
        */
       /* Dans la nouvelle requête on ne spécifie que le chemin /current, la base url (http://api.weatherstack.com) étant spécifié dans l'instance
       Et uniquement le paramètre query, l'access_key étant spécifié dans l'instance */
        weatherApi.get('/current',{
            params: {
                "query": wLocation
            }
        })
            .then(r => setDataCity(r.status === 200 ?r.data :null))
            .catch(e => console.error(e))
    }

    function testLocation () {
        // Cette fonction gérera toute la partie Location de react Native
        Location.requestForegroundPermissionsAsync() // ici nous demandons si nous avons l'autorisation d'accéder à la localisation, cela nous retourne une promesse
        .then(s => {
            /* Si une réponse nous est renvoyée 
if              Nous accèdons à son statut et vérifions qu'il est en autorisé (granted)
false           Si ce n'es pas le cas, nous générons une erreure "Access denied => " avec le statut actuel 
true            Si c'est le cas, nous demandons la localisation (location) avec la méthode getCurrentPositionAsync
                    En recevant la location, nous accèdons à sa valeure que nous envoyons à wLocation via setWLocation
                    Nous lui indiquons la latitude et longitude au format que l'API attend (latitude, longitude)
                    Nous rappelons alors cityFetch pour mettre à jour les informations
                    Dans le cas, ou la promesse catch une erreure, nous indiquons une erreure via setError avec la valeure Cannot Access Location
                Dans le cas, ou la promesse catch une erreure, nous indiquons une erreure via setError avec la valeure Access denied cause error
            */
            s.status!='granted' 
                ? setError("Access denied => "+s.status)
                : Location.getCurrentPositionAsync({})
                .then(location => {
                    setWLocation(`${location.coords.latitude},${location.coords.longitude}`)
                    cityFetch()
                })
                .catch(_e => setError("Cannot Access Location"))
                // L'underscore "_" avant le paramètre e est la pour signaler explicitement, que nous n'utiliseront pas ce paramètre.
         })
        .catch(_e => setError("Access denied cause error"))
    }
    useEffect(()=>{
        cityFetch()
        /* 
        Nous récupérons les informations de la query par défaut ( Paris ) afin d'afficher des valeures 
            *NOTE : ( La valeure par défaut pourrait être fetch:ip afin d'avoir une localisation plus proche de celle de l'utilisateur)*
        */
        testLocation()
        // Nous testons si nous arrivons à récupérer la localisation du mobile et si oui, nous modifions la query
    },[])
    function HandlesubmitCity () {
        cityFetch()
    }
    function HandleChangeCity (city) {
        setWLocation(city)
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
   } else if (dataCity && dataCity.current.precip <= 3){
        precipitation = <Text>Pluie faible, pas de quoi faire une douche !</Text>
   } else if (dataCity && dataCity.current.precip <= 7){
        precipitation = <Text>Pluie modérée, les escargots sont de sortis</Text>
   } else {
        precipitation = <Text>C'est le déluge, choppe l'Arche de Noê</Text>
   }
    return (
    <SafeArea>
        <View>
            {error && <Text>{error}</Text>}
            <Text>Indiquer votre ville ci-dessous :</Text>
            <TextInput onChangeText={HandleChangeCity} value= {wLocation} placeholder="Choisis ta ville"/>
            <Button 
                onPress={HandlesubmitCity} 
            >Changer la ville
            </Button>
        {dataCity && 
        // ici le "&&"" évite de réaliser une condition ternaire, le code de la seconde partie n'es lancé que si la première partie est valide ( donc vrai )
            <>
                <Text>La météo de votre ville : </Text>
                <Text>A  {dataCity.location.name}, il fait : {dataCity.current.temperature}°C à {dataCity.current.observation_time} </Text>
                <Text>Prevision des Précipitations : {dataCity.current.precip} - {precipitation}</Text>
                <Text>{ cloudCover }</Text> 
                <WeatherIcons weathers={dataCity.current["weather_icons"]}></WeatherIcons>
            </> 
        }
        </View>
    </SafeArea>
  )
}

