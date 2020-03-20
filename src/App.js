import React from "react";
import "./App.css";
import Axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.getCountryData = this.getCountryData.bind(this);
  }

  //library for the http request for example(axios)

  //create a state/response object where we can put data out of
  state = {
    confirmed: 0,
    recovered: 0,
    deaths: 0,
    countries: []
  };

  //set the DidMount which will get the data
  componentDidMount() {
    this.getData();
  }

  //async function that will  await to get the data with the response
  //throught  axios to get the API and will set the new state(setState) with the new
  //confermed value which should be the response whit the data()
  //than
  async getData() {
    const resApi = await Axios.get("https://covid19.mathdro.id/api");
    const resCountries = await Axios.get(
      "https://covid19.mathdro.id/api/countries"
    );
    const countries = Object.keys(resCountries.data.countries);
    this.setState({
      confirmed: resApi.data.confirmed.value,
      recovered: resApi.data.recovered.value,
      deaths: resApi.data.deaths.value,
      countries
    });
  }

  renderCountryOptions = (country, i) =>
    this.state.countries.map(country => (
      <option key={country}>{country} </option>
    ));

  async getCountryData(e) {
    const res = await Axios.get(
      `https://covid19.mathdro.id/api/countries/${e.target.value}`
    );
    this.setState({
      confirmed: res.data.confirmed.value,
      recovered: res.data.recovered.value,
      deaths: res.data.deaths.value
    });
  }

  render() {
    return (
      <div className='container'>
        {/*<header className='App-headera'>*/}
        <h1>Corona Virus RealTime</h1>
        {/*</header>*/}
        <p>Select Country</p>
        <select className='dropdown' onChange={this.getCountryData}>
          {this.renderCountryOptions()}
        </select>

        <div className='flex'>
          <div className='box confirmed'>
            <h1>Confirmed</h1>
            <h2>{this.state.confirmed}</h2>
          </div>
          <div className='box recovered'>
            <h1>Recovered</h1>
            <h2>{this.state.recovered}</h2>
          </div>
          <div className='box deaths'>
            <h1>Deaths</h1>
            <h2>{this.state.deaths}</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
