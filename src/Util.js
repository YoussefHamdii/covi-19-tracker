import { Circle, Popup } from 'react-leaflet';

const caseTypeColors ={
    cases: {
        hex: "#CC1034",
        multiplier: 800
    },
    recovered: {
        hex: "#7dd71d",
        multiplier: 1200
    },
    deaths: {
        hex: "#fb4443",
        multiplier: 2000
    }
}

export const showMapCircles = ({data, caseType = 'cases'}) => (
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
                    <h1>hi i am a pop up</h1>
                </Popup>
            </Circle>
        )
    })
)