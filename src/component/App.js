import React, { useState ,useEffect} from 'react'
import Axios from 'axios'

const GeoCodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
const ApiKey = 'access_token=pk.eyJ1Ijoicm9vdHJzayIsImEiOiJjazVnOWRqeDAwNTFxM2RwYmptcWJmYnBpIn0.VeWzTx2FJA6zIbjDDmfbYQ&limit=1'

function App() {

    const [address, setAddress] = useState('')
    const [weather,setWeather] = useState('')
    const [buttonStatus, setButtonStatus] = useState('&#128512;')
    
    const adressInputHandler = (e) =>{
        setAddress(e.target.value)

    }
    const searchButtonHandler = async (e) =>{
        if(!address){
            setButtonStatus('Enter Location')
            return
        }
        setButtonStatus('Loading...')
        const url = GeoCodeUrl + encodeURIComponent(address) + '.json?'+ApiKey
        const response = await Axios({
            url:url,
            method: 'get',
            
        })
        const APIKEY = `a2344865c9890e3fd12f284af2ec6a65`
        const place_name = response.data.features[0].place_name
        const latitude = response.data.features[0].center[1]
        const longitude = response.data.features[0].center[0]
        const OpenWeatherMapUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKEY}`
        const weather_response = await Axios({
            url:OpenWeatherMapUrl
        })

        const weather = {
            place_name,
            weather : weather_response.data
        }
        setWeather(weather)
        setButtonStatus('&#128526;')
    
        return
    }
    
    
    
    useEffect(() => {
        document.getElementById('load').innerHTML = buttonStatus
        
    }, [buttonStatus]);
    return (
        <div className='main'>
            <h1>Weather</h1>
            <div className='search'>
                <input 
                    onChange={adressInputHandler}
                    defaultValue={address}
                    placeholder='Enter Location'
                    onKeyPress={(e)=>{
                        if (address) setButtonStatus('&#128521;')
                        if(e.key==='Enter') searchButtonHandler()
                    }}
                />
                <div className="button_prop">
                    <p id='load'> {buttonStatus} </p>
                    <button 
                        onClick={searchButtonHandler}
                        className='button'>
                        Search
                    </button>


                </div>
                
            </div>
            
            <div className='weather_div'> 
                {weather?<RenderTemp weather={weather} /> :null}
            </div>
        </div>
    )
}


const RenderTemp = (props) =>{

    const icon = props.weather.weather.weather[0].icon
    return(
        <div className="weathers_details">

            <div className="location_details">
                <p>{props.weather.place_name}</p>

            </div>
            <div className="main_details">
                <div className='temp'>
                    <h1 id='temp'>{Math.floor(props.weather.weather.main.temp-273)}&#8451;</h1>
                </div>
                <div className='icon'>
                    <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt='icon' />

                </div>

            </div>  
            <div className="other_details">
                <p>{props.weather.weather.weather[0].description.toUpperCase()}</p>

            </div>
            

            
            


            {console.log(props.weather)}
        </div>
    )

}

export default App
