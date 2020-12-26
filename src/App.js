import './App.css';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import { Component } from 'react';
import InfoBox from './InfoBoxComponent';
import Map from './Map';


// https://disease.sh/v3/covid-19/countries

class App extends Component {

  constructor(props){
    super(props);

    this.state ={
      countries:[],
      country: "worldwide",
      countryco : [30.033, 31.23],
      countrynums: {cases: 0, deaths: 0 , recovered: 0},
      zoom: 3,
      allcont: [],
      casesType: "cases"
    }
  }

  getCountrieFromApi = async ()=> {
    fetch('https://disease.sh/v3/covid-19/countries')
    .then(response => response.json())
    .then((data) => {this.setState({allcont: data}); return data;}
    )
    .then(data => {const countries = data.map((country) => ({
      name: country.country,
      iso: country.countryInfo.iso2
    }))
  this.setState({countries: countries})})


    fetch('https://disease.sh/v3/covid-19/all')
    .then(response => response.json())
    .then(data => {
      this.setState({countrynums: {cases:data.cases, deaths:data.deaths, recovered:data.recovered}})
    })
  }

  onCountryChange = async (event) => {
    const countryCode = event.target.value;
    this.setState({country: countryCode});
    const url = countryCode === "worldwide"? 
    'https://disease.sh/v3/covid-19/all'
    :'https://disease.sh/v3/covid-19/countries/' + countryCode;

    fetch (url)
    .then(response => response.json())
    .then(data => {
      this.setState({countryco: [data.countryInfo.lat, data.countryInfo.long]});
      this.setState({countrynums: {cases:data.cases, deaths:data.deaths, recovered:data.recovered}});
      this.setState({zoom:5});
    });

    //const selectedCountryInfo = this.state.countryinfo.filter(country => country.countryInfo.iso2 === newCountry);

  }

  componentDidMount(){
    this.getCountrieFromApi();
  }

  render() {
    return (
      <div className="App">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined" value={this.state.country} onChange={this.onCountryChange}>
              <MenuItem value="worldwide">WorldWide</MenuItem>
              {this.state.countries.map((country) => {return(<MenuItem value={country.iso}>{country.name}</MenuItem>)})}
            </Select>
          </FormControl>
        </div>
        {/* info boxes */}
        <div className="app__boxes">
          <InfoBox onClick={() => this.setState({casesType: "cases"})} type="Infected" cases={this.state.countrynums.cases} />
          <InfoBox onClick={() => this.setState({casesType: "deaths"})} type="Deaths" cases={this.state.countrynums.deaths} />
          <InfoBox onClick={() => this.setState({casesType: "recovered"})} type="Recovered" cases={this.state.countrynums.recovered} />
        </div>
        {/* MAP */}

        <Map countries ={this.state.allcont} casesType={this.state.casesType} center={this.state.countryco} zoom ={this.state.zoom} />
        
      </div>
    );
  }
}

export default App;
