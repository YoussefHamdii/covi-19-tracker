import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import './Map.css';
import { Circle } from 'react-leaflet';

const caseTypeColors ={
    cases: {
        hex: "#CC1034",
        multiplier: 400
    },
    recovered: {
        hex: "#7dd71d",
        multiplier: 600
    },
    deaths: {
        hex: "#fb4443",
        multiplier: 1000
    }
}

const showMapCircles = (data, caseType = 'cases') => {
  console.log(data)
  return(
    data.map((country) => {
      return (
          <Circle
          center ={[country.countryInfo.lat, country.countryInfo.long]}
          fillOpacity={0.4}
          color={caseTypeColors[caseType].hex}
          fillColor={caseTypeColors[caseType].hex}
          radius={
              Math.sqrt(country[caseType])* caseTypeColors[caseType].multiplier
          }
          >
              <Popup>
                  <h1>{"Infected: "+ country.cases}</h1>
              </Popup>
          </Circle>
      )
  })
  )
}

function ChangeView({center, zoom}) {
    const map = useMap();
    map.setView(center,zoom);
    return null;
}

function Map ({countries, caseType, center, zoom}){
    
  console.log(countries)
    return(
      
        <div className='app__map'>
        <MapContainer position={center} center={center} zoom={zoom} scrollWheelZoom={false}>
            <ChangeView center={center} zoom={zoom} />
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {showMapCircles(countries, caseType)}
        </MapContainer>
        </div>
    );
}

export default Map;