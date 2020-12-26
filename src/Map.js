import React from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import './Map.css';
import {showMapCircles} from './Util';

function ChangeView({center, zoom}) {
    const map = useMap();
    map.setView(center,zoom);
    return null;
}

function Map ({countries, casesType, center, zoom}){
    
    return(
        <div className='app__map'>
        <MapContainer position={center} center={center} zoom={zoom} scrollWheelZoom={false}>
            <ChangeView center={center} zoom={zoom} />
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {showMapCircles(countries, casesType)}
        </MapContainer>
        </div>
    );
}

export default Map;