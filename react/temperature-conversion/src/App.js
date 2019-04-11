import React from "react";

class App extends React.Component {
  state = {
    fahrenheit: "32",
    celsius: "0",
    error: undefined
  }

  timer = 0;

  timeoutFunc = () => {
    console.log("Timer fired");
    this.setState({
      error: undefined
    })
  }

  setError = (error) => {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(this.timeoutFunc, 5000);

    this.setState({
      error
    });
  }

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  onFtoCClick = () => {
    const fahrenheit = parseFloat(this.state.fahrenheit);
    if (isNaN(fahrenheit)) {
      this.setError("Fahrenheit value must be a number.");
      return;
    }

    const celsius = (fahrenheit - 32) * 5 / 9;
    this.setState({
      celsius,
      error: undefined
    });
  }

  onCtoFClick = () => {
    const celsius = parseFloat(this.state.celsius);
    if (isNaN(celsius)) {
      this.setError("Celsius value must be a number.");
      return;
    }

    const fahrenheit = (celsius * 9 / 5) + 32;
    this.setState({
      fahrenheit,
      error: undefined
    });
  }

  render() {
    return (
      <div>
        <div>
          <input
            className="edit"
            type="text"
            name="fahrenheit"
            onChange={this.onChange}
            value={this.state.fahrenheit}
          />
          <button 
            className="btn btn-success btn-left" 
            type="button" 
            onClick={this.onFtoCClick}
          >
              &gt;
          </button>

          <button 
            className="btn btn-success btn-right" 
            type="button" 
            onClick={this.onCtoFClick}>
            &lt;
          </button>
          <input 
            type="text" 
            name="celsius" 
            onChange={this.onChange}
            value={this.state.celsius}
          />
        </div>
        { this.state.error && <div>{this.state.error}</div>}
      </div>
    );
  }
}

export default App;
