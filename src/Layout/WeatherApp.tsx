import axios from "axios"
import { useEffect, useState } from "react"
import { weatherConfig } from "../Data/weatherConfig"
import SingleWeather from "./SingleWeather"
import { Carousel } from "antd"
import moment from "moment";

// import { Carousel } from 'antd';

// import Weather5days from "./Weather5days";

interface ConditionType {
    text: string,
    icon: string,
}

interface hourForecastdayType{
    time:string,
    temp_c:string,
    condition:ConditionType,
}

interface forecastdayType{
    hour: hourForecastdayType[]
}



interface WeatherProps {
   
    location: {
        name: string,
        country: string,
        localtime: string, 
    },
   
    current:{
        temp_c:string,
        condition: ConditionType,
         },
    forecast:{
        forecastday : forecastdayType[]
    },
}

const WeatherApp = () => {
    //state data
    const [weathers,setWeathers] = useState<WeatherProps | null>(null)
    //call api
    useEffect(()=>{
        const fetchCurrentWeather = async () => {
            try {
                const {data} = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${weatherConfig.apiKey}&q=${weatherConfig.city}&days=6&aqi=no&alerts=no&lang=vi`)
           
                //   console.log(data);
                  setWeathers(data);
            
            } catch (error) {
                console.log(error);
                throw error
            }   
        }
        fetchCurrentWeather();
    },[])
    //dectructuring
    //city

    const {location: local } = weathers ?? {}
    // console.log(local)
    // console.log(curr)
    // console.log(fore)
    const {name : N , localtime: L} = local ?? {}
    //city

    const DateTime = L?.split(' ')
    const [currentDate, currentTime] = (DateTime ?? [])
    const currentDateFormat = moment(currentDate).format("DD-MM-YYYY")
   

    const weatherIcon = weathers?.current.condition.icon
    //tempC
    const weatherTempC = weathers?.current.temp_c
    //des
    const weatherDes = weathers?.current.condition.text

//body
  return (
    <div className='h-screen w-full bg-slate-600 px-auto py-auto mx-auto my-auto flex flex-col justify-between'>
        <h1 className="text-6xl text-white text-center">{N}</h1>
        <div
          className="flex flex-col justify-center items-center mx-auto rounded text-5xl text-white">
            <p className="py-2">{currentDateFormat}</p>
            <p className="py-2">{currentTime}</p>
            <div>
                <img width={150}  src={weatherIcon} /> 
            </div>
            <h2 > {weatherTempC}℃</h2>
            <p className="py-4">{weatherDes}</p>

            {/** Slide */} 
        </div>
              <Carousel autoplay dots={false}>                 
                  {weathers?.forecast.forecastday[0].hour.map((dayHour,index) => {
                              return (
                                          <SingleWeather 
                                              key={index}
                                              dayHour = {dayHour}
                                          ></SingleWeather>                        
      
                               )
                              }
                          )}
              </Carousel>        
    </div>          
      
  )
}

export default WeatherApp