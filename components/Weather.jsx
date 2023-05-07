import {Text} from '@ui-kitten/components'
import { Image } from "react-native"

const weatherList = (icons) => icons.map((icon, index) => <Image key={'imgWeather'+index} style={{width: '100%', height: '50%'}} source={{uri: icon}}/>)

export const WeatherIcons = ({weathers}) => {
    return (
        weathers.length === 1
        ? <Image
          style={{width: '100%', height: '50%'}}
          source={{uri: weathers[0]}}
        />
        : weatherList(weathers)
    )
}
export const Weather = ({data}) => {
    const placeHolder = 'Information Manquante' 
    return (
        <>
            <Text>Observé à : {data["observation_time"] || placeHolder}</Text>
            <Text>Température : {data["temperature"] || placeHolder}</Text>
            {data["weather_icons"] > 0 
                ?<WeatherIcons weathers={data["weather_icons"]}/>
                :<Text>No icon</Text>
            }
        </>
    )
}