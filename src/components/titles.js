import React from "react";

// Creating a Titles component
class Titles extends React.Component {
  render() {
    // Uses regular HTML tags to build up a customized and reusable Titles component
    // In App.js, see this component being used!
    return (
      <div>
        <div className="time">
          {this.props.time && `${this.props.time.hr}:${this.props.time.min}`}
        </div>
        <h1 className="title-container__title">Weather Scanner </h1>
        <p className="title-container__subtitle">
          Helps you find weather conditions in cities...
        </p>
      </div>
    );
  }
}

export default Titles;
