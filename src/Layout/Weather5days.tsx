import axios from "axios"
import { useEffect, useState } from "react"
import { weatherConfig } from "../Data/weatherConfig"

import moment from "moment";

// import { Carousel } from 'antd';

// import Weather5days from "./Weather5days";

interface ConditionType {
    text: string,
    icon: string,
}

interface forecastdayType{
    date:string,
    day: {
        avgtemp_c :string
        condition: ConditionType,
    },

}

interface WeatherProps {
  
    forecast:{
        forecastday : forecastdayType[]
    },
}

const Weather5days = () => {
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

    const {forecast} = weathers ?? {}

        const {forecastday} = forecast ?? {};
      
        const [ , ...nextDay] = forecastday ?? [];

       

//body
  return (
    <div className='h-screen w-full bg-slate-600 px-auto py-auto mx-auto my-auto'>
            {/** Slide */} 
            <div>
            {nextDay.map((day,index) => {
                              return (
                                     <div key ={index}>
                                       <div className='flex flex-wrap gap-5 items-center justify-between text-4xl text-white border-2 border-white' >
                                            <div>{moment(day.date).format('DD-MM-YYYY')}</div>
                                            <div className='flex items-center'>
                                                <div>
                                                <img width={100} src={day.day.condition.icon} ></img>
                                                </div>
                                                <span>
                                                    <div>{day.day.avgtemp_c}℃</div>
                                                    <div>{day.day.condition.text}</div>
                                                </span>
                                            </div>
                                        </div>
                                     </div>                  
      
                               )
                              }
                          )}
            </div>
    </div>          
      
  )
}

export default Weather5days