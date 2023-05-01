import { Layout } from "@ui-kitten/components"
import { Avatar } from '@ui-kitten/components'
import { Image, Text } from "react-native"

const weatherList = (icons) => icons.map((icon, index) => <Image key={'imgWeather'+index} style={{width: '100%', height: '50%'}} source={{uri: icon}}/>)

const WeatherIcons = ({weathers}) => {
    return (
        weathers.length === 1
        ? <Image
          style={{width: '100%', height: '50%'}}
          source={{uri: weathers[0]}}
        />
        : weatherList(weathers)
    )
}

export default WeatherIcons
/*
urlone
urltwo
urlthree

<Image key={imgWeather0} source={'urlone'}/>
<Image key={imgWeather1} source={'urltwo'}/>
<Image key={imgWeather2} source={'urlthree'}/>

*/