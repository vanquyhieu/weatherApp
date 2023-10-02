

interface conditionType{
    icon: string,
    text:string
}[]

interface dayHourType { 
    time: string,
    condition: conditionType;
    temp_c: string
}


const SingleWeather = ({dayHour} :
                     {dayHour : dayHourType}) => {
//dectructuring

//time
  const newTime = dayHour.time.split(' ')
  const [ , timeFormat] = newTime
//icon 
 const weatherIcon = dayHour.condition.icon
//tempC
 const tempC = dayHour.temp_c
 //text
 const weatherDes = dayHour.condition.text

  return (
    <div className='flex items-center justify-between cursor-pointer text-5xl text-white pb-20' >
        <div>{timeFormat}</div>
        <div className='flex items-center'>
            <div>
            <img width={150} src={weatherIcon} ></img>
            </div>
            <span>
                <div className='text-5xl'>{tempC}℃</div>
                <div className='text-3xl'>{weatherDes}</div>
            </span>
        </div>
    </div>

    )

 
}

export default SingleWeather