import React, {useState} from 'react';
import ReactMapGL, {Marker,Popup} from "react-map-gl";
import * as geodata from './data_handling/location_data.json';
import './index.css';


const TOKEN = 'pk.eyJ1IjoiYWJoaWxhc2hhLXNpbmhhIiwiYSI6ImNqdzFwYWN1ajBtOXM0OG1wbHAwdWJlNmwifQ.91s73Dy03voy-wPZEeuV5Q';

export default function App(){

  const [viewport, setViewport] = useState({
    latitude: 38.913,
    longitude: 72.877426,
    width: "100vw",
    height: "100vh",
    bearing: 0,
    pitch: 0,
    zoom: 2

  });

  const [locationinfo, setlocationinfo] = useState(null);

  return <div>
    <ReactMapGL {...viewport}
    onViewportChange={(viewport) => {setViewport(viewport)}}
    mapStyle="mapbox://styles/mapbox/dark-v10"
    mapboxApiAccessToken = {TOKEN} >
      {geodata.features.map((place) => (
        <Marker latitude={place.latitude}
        longitude={place.longitude}>
          <button 
          icon = "like"
          className="marker-btn"
          onClick = {e => {
            e.preventDefault();
            setlocationinfo(place);
          }}
          >
            <img className="dot" src={"https://img.pngio.com/red-circle-png-images-download-424-png-resources-with-transparent-red-dot-png-260_260.png"} alt="dot" />

            
          </button>
        </Marker>
      ))}

      {locationinfo ? (
        <Popup latitude={locationinfo.latitude}
        longitude={locationinfo.longitude}
        onClose= {() =>{
          setlocationinfo(null);
        }}>
          

          <div>
              <h5>{locationinfo.Name}</h5>
              <h5>{locationinfo.City}</h5>
              <h5>{locationinfo.goog_address}</h5>
              <table>
              <tr>
                  <th>Date</th>
                  <th>Temperature</th>
                  <th>Max and Min Temperature</th>
                  <th>Pressure</th>
                  <th>Humidity</th>
                  <th>Dew Point</th>
                  <th>Wind Speed</th>
                  <th>Weather</th>
                  <th>Rainfall</th>
              </tr>
              <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
              </tr>
              <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
              </tr>
              <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
              </tr>
              <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
              </tr>
              <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
              </tr>
              <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
              </tr>
              <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
              </tr>
              </table>
          </div>


        </Popup>
      ) : null}
    </ReactMapGL>
  </div>
}