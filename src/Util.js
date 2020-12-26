import { Circle, Popup } from 'react-leaflet';
import { Media } from "reactstrap";

const caseTypeColors ={
    cases: {
        hex: "#CC1034",
        multiplier: 400,
    },
    recovered: {
        hex: "#7dd71d",
        multiplier: 600,
    },
    deaths: {
        hex: "#fb4443",
        multiplier: 1000,
    }
}

export const showMapCircles = (data, casesType = 'cases') => (
    data.map((country) => {
      return (
          <Circle
          center ={[country.countryInfo.lat, country.countryInfo.long]}
          fillOpacity={0.4}
          pathOptions={{color: caseTypeColors[casesType].hex,
            fillColor: caseTypeColors[casesType].hex }}
          radius={
              Math.sqrt(country[casesType])* caseTypeColors[casesType].multiplier
          }
          >
              <Popup>
                 <h2>{country.country}</h2>
                <Media src={country.countryInfo.flag} className="map__flag"/>
                  <span>{"Infected: "+ country.cases}</span>
                  <span>{"Deaths: "+ country.deaths}</span>
                  <span>{"Recovered: "+ country.recovered}</span>
              </Popup>
          </Circle>
      )
  })
  )
