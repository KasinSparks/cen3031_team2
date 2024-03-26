import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import MySubmitButton, { MyTestForm } from './db_test_conn.js'

class MyTest extends Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
    }

    callAPI() {
        fetch("http://localhost:8080/testapi")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }))
            .catch(err => err);
    }

    componentDidMount() {
        this.callAPI();
    }

    render() {
        if (this.state.apiResponse === "Connected") {
            return <p color="green">Connected to backend API</p>
        }

        return <p color="red">Not connected to backend API</p>
    }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <MyTest />
        <MyTestForm />
      </header>
    </div>
  );
}

export default App;
