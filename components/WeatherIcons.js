import { Image } from "react-native"

const weatherList = (icons) => icons.map((icon, index) => <Image key={'imgWeather'+index} style={{width: 35, height: 35}} source={{uri: icon}}/>)

const WeatherIcons = ({weathers}) => {
    return (
        weathers.length === 1
        ? <Image
          style={{width: 35, height: 35}}
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