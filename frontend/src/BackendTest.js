import React, { Component } from "react";
import "./App.css";

class MyTest extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch("/testapi")
      .then((res) => res.text())
      .then((res) => this.setState({ apiResponse: res }))
      .catch((err) => err);
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    if (this.state.apiResponse === "Connected") {
      return <p style={{ color: "green" }}>Connected to backend API</p>;
    }

      return <p style={{ color: "red" }}>Not connected to backend API</p>;
  }
}

function BackendTest() {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <MyTest />
        </header>
      </div>
    </>
  );
}

export default BackendTest;
