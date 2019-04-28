import React from "react";

// Creating Weather component to display weather information
class Weather extends React.Component {
  render() {
    // Uses regular HTML tags to build up a customized and reusable form component
    // Defines props for city {this.props.city}, temperature {this.props.temperature}, etc.
    //  that will be passed in when the component is called in the "render" function of another file
    // In App.js, see this component being used with props being passed in!
    return (
      <div className="weather-info">
        {this.props.country && this.props.city && (
          <p className="weather__key">
            Location:
            <span className="weather__value">
              {this.props.city}, {this.props.country}
            </span>
          </p>
        )}

        {this.props.lon && this.props.lat && (
          <p className="weather__key">
            Longitude and latitude:
            <span className="weather__value">
              {this.props.lon}, {this.props.lat}
            </span>
          </p>
        )}

        {this.props.temperature && (
          <p className="weather__key">
            Temperature:
            <span className="weather__value">
              {`${this.props.temperature} °F`}
            </span>
          </p>
        )}

        {this.props.clouds && (
          <p className="weather__key">
            Cloudiness:
            <span className="weather__value">{`${this.props.clouds} %`}</span>
          </p>
        )}

        {this.props.humidity && (
          <p className="weather__key">
            Humidity:
            <span className="weather__value"> {`${this.props.humidity}%`}</span>
          </p>
        )}
        {this.props.windSpeed && (
          <p className="weather__key">
            Wind Speed:
            <span className="weather__value">
              {`${this.props.windSpeed} mph`}
            </span>
          </p>
        )}
        {this.props.pressure && (
          <p className="weather__key">
            Pressure:
            <span className="weather__value">
              {`${this.props.pressure} hpa`}
            </span>
          </p>
        )}

        {this.props.description && (
          <p className="weather__key">
            Conditions:
            <span id="conditions__wrapper" className="weather__value">
              {this.props.description}
              <img
                alt=""
                src={
                  "http://openweathermap.org/img/w/" + this.props.id + ".png"
                }
              />
            </span>
          </p>
        )}

        {this.props.error && (
          <p className="weather__error">{this.props.error}</p>
        )}
      </div>
    );
  }
}

export default Weather;
