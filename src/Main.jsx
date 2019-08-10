import React from "react";

export default class Main extends React.Component {
  state = {
    timerOn: false,
    timerStart: 0,
    timerTime: 0,
    height: 0
  };

  startTimer = () => {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: Date.now() - this.state.timerTime
    });
    this.timer = setInterval(() => {
      this.setState({
        timerTime: Date.now() - this.state.timerStart
      });
    }, 10);
  };

  stopTimer = (centiseconds, seconds) => {
    console.log();
    let heightcalc = (
      4.9 *
      Math.pow(
        parseFloat(seconds.toString() + "." + centiseconds.toString()),
        2
      )
    ).toFixed(2);

    this.setState({ timerOn: false });
    this.setState({ height: heightcalc });
    clearInterval(this.timer);
  };

  resetTimer = () => {
    this.setState({
      timerStart: 0,
      timerTime: 0,
      height: 0
    });
  };

  render() {
    const { timerTime } = this.state;
    let centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    // let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    // let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);

    return (
      <div>
        <nav className="navbar navbar-light bg-light">
          <span className="navbar-brand mb-0 h1 font-weight-bold">
            Drop Height Calculator
          </span>
        </nav>
        <div className="container p-4">
          <div className="row">
            <div className="col" />
            <div className="col-lg-4">
              <div className="card p-5">
                <div className="row justify-content-center">
                  <h1>
                    {seconds} : {centiseconds}
                  </h1>
                </div>
                <div className="row justify-content-center pt-3">
                  {this.state.timerOn === false && this.state.timerTime === 0 && (
                    <button
                      className="btn btn-primary font-weight-bold"
                      onClick={this.startTimer}
                    >
                      Start
                    </button>
                  )}
                  {this.state.timerOn === true && (
                    <button
                      className="btn btn-danger font-weight-bold"
                      onClick={this.stopTimer.bind(this, centiseconds, seconds)}
                    >
                      Stop
                    </button>
                  )}
                  {this.state.timerOn === false && this.state.timerTime > 0 && (
                    <button
                      className="btn btn-danger font-weight-bold"
                      onClick={this.resetTimer}
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>

              <div className="card p-5 mt-3">
                <div className="row justify-content-center ">
                  <h2 className="font-weight-bold">Height:</h2>
                </div>
                <div className="row justify-content-center pt-1">
                  <h2>{this.state.height} metres</h2>
                </div>
              </div>
            </div>
            <div className="col" />
          </div>
        </div>
      </div>
    );
  }
}
