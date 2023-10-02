
import WeatherApp from "./Layout/WeatherApp"
import { Carousel } from "antd"
import Weather5days from "./Layout/Weather5days"

function App() {


  return (
    <Carousel>
      <WeatherApp></WeatherApp>
      <Weather5days></Weather5days>
    </Carousel>
  )
}

export default App
