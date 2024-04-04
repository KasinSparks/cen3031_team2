import React, { Component } from 'react';
import Navbar from "./Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Bookmarks from "./pages/Bookmarks";
import Search from "./pages/Search";
import BackendTest from "./BackendTest";
import { Route, Routes } from "react-router-dom";

/*import MySubmitButton, { MyTestForm } from './db_test_conn.js'*/

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
        <Navbar />
            <Routes>
                <Route path="/pages/Home" element={<Home />} />
                <Route path="/pages/Login" element={<Login />} />
                <Route path="/pages/Bookmarks" element={<Bookmarks />} />
                <Route path="/pages/Search" element={<Search />} />
                <Route path="/BackendTest" element={<BackendTest />} />
            </Routes>
        {/* <MyTest/>   */}
        {/*<MyTest />
        <MyTestForm />*/}
    </div>
  );
}

export default App;
