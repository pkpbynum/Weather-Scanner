// Importing components from relative path
import React from "react";
import Weather from "./components/weather";
import Form from "./components/form";
import Titles from "./components/titles";

// API Key to be able to use the OpenWeatherMap API
const WEATHER_API_KEY = "8d2de98e089f1c28e1a22fc19a24ef04";
const TIME_API_KEY = "AIzaSyBUgaUvUMSM6HFszVKNrFoYvqajqQ5v228";

class App extends React.Component {
  // Initialize state to undefined for all relevant data points
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    lat_lng: undefined,
    humidity: undefined,
    pressure: undefined,
    windSpeed: undefined,
    description: undefined,
    error: undefined,
    iconId: undefined,
    time: undefined,
    isCloudy: false
  };

  // getWeather is a method we'll use to make the API call
  // It is passed in as the loadWeather prop to Form component in the render function below
  // Use async keyword to specify it's an asynchronous function in response to an event e
  getWeather = async e => {
    // Store city and country values based on current value in form
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    e.preventDefault();
    // fetch keyword for API call, await to show it's asynchronous,
    // URL defined at https://openweathermap.org/current
    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=imperial&appid=${WEATHER_API_KEY}`
    );
    // response stored as json in `response` variable
    const response = await api_call.json();
    if (city && country) {
      this.setState({
        temperature: response.main.temp,
        city: response.name,
        country: response.sys.country,
        lat_lng: response.coord,
        humidity: response.main.humidity,
        windSpeed: response.wind.speed,
        pressure: response.main.pressure,
        description: response.weather[0].description,
        error: "",
        iconId: response.weather[0].icon,
        isCloudy: response.clouds.all > 50,
        time: undefined
      });
      this.getTime();
    } else {
      this.setState({
        error: "Please input search values..."
      });
    }
  };

  getTime = async () => {
    const {
      lat_lng: { lon, lat }
    } = this.state;

    const temp = new Date();
    const timestamp = temp.getTime() / 1000 + temp.getTimezoneOffset() * 60;
    const api_call = await fetch(
      `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lon}&timestamp=${timestamp}&key=${TIME_API_KEY}`
    );

    const { dstOffset, rawOffset } = await api_call.json();
    const total = timestamp + dstOffset + rawOffset;
    const nd = new Date(total * 1000);
    console.log(nd.toLocaleString());
    this.setState({
      time: {
        hr: nd.getHours(),
        min: nd.getMinutes()
      }
    });
  };

  // Render function updates view whenever the state changes
  // Components that were imported (Titles, Weather, Form) are called below as HTML tags,
  //   with props as attributes associated with that component
  // Within the tag, props can be passed in to populate the component with the syntax
  //   <componentName prop={value}>
  // Look at the component definitions within the imported files (lines 2-5)
  //   to see how the props populate each component!
  render() {
    const {
      temperature,
      city,
      country,
      humidity,
      windSpeed,
      pressure,
      description,
      error,
      iconId,
      isCloudy,
      time
    } = this.state;

    return (
      <div>
        <div
          style={{ backgroundColor: isCloudy ? "#e8e8e8" : "#70bef4" }}
          className="wrapper"
        >
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Titles time={time} />
                </div>
                <div className="col-xs-7 form-container">
                  <Form loadWeather={this.getWeather} />
                  <Weather
                    temperature={temperature}
                    city={city}
                    country={country}
                    humidity={humidity}
                    description={description}
                    windSpeed={windSpeed}
                    pressure={pressure}
                    error={error}
                    id={iconId}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// App is exported as a component which allows it to be imported by another file
export default App;
