import React, { useState ,useEffect} from 'react'
import Axios from 'axios'
import request from 'request'
const forecast = require('../forecast')

const GeoCodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
const ApiKey = 'access_token=pk.eyJ1Ijoicm9vdHJzayIsImEiOiJjazVnOWRqeDAwNTFxM2RwYmptcWJmYnBpIn0.VeWzTx2FJA6zIbjDDmfbYQ&limit=1'

function App() {

    const [address, setAddress] = useState('')
    const adressInputHandler = (e) =>{
        setAddress(e.target.value)

    }
    const searchButtonHandler = async (e) =>{
        const url = GeoCodeUrl + encodeURIComponent(address) + '.json?'+ApiKey
        const response = await Axios({
            url:url,
            method: 'get',
            credentials:'no-cors'
            
        })
        const place_name = response.data.features[0].place_name
        const latitude = response.data.features[0].center[1]
        const longitude = response.data.features[0].center[0]
        console.log(response)
        const url2 = 'https://api.darksky.net/forecast/97efc916259805f85a7ad8a5d10c6561/'+latitude+','+longitude+'?units=auto'
        const r = await forecast(latitude, longitude, place_name, (error, data) => {
            console.log(data)
            console.log(error)
        })
        
    }
    
    
    useEffect(() => {
        
    }, []);
    return (
        <div>
            <h1>Weather App</h1>
            <div>
                <input 
                    onChange={adressInputHandler}
                    defaultValue={address}
                />
            </div>
            <button onClick={searchButtonHandler}>
                Search
            </button>
            <div>
                <h2>Details </h2>
                {console.log(address)}
            </div>
        </div>
    )
}

export default App
