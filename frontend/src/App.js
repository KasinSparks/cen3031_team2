import React, { Component } from 'react';
import Navbar from "./Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Bookmarks from "./pages/Bookmarks";
import Search from "./pages/Search";
import BackendTest from "./BackendTest";
import Comparison from "./pages/Comparison";
import Feedback from "./pages/Feedback";

// library allows user to be routed from page to page
import { Route, Routes } from "react-router-dom";

class MyTest extends Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
    }

    callAPI() {
        fetch("/testapi")
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
            {/* contains list of all pages that user may be routed to */}
            <Routes>
                <Route path="/pages/Home" element={<Home />} />
                <Route path="/pages/Login" element={<Login />} />
                <Route path="/pages/Bookmarks" element={<Bookmarks />} />
                <Route path="/pages/Search" element={<Search />} />
                <Route path="/pages/Comparison" element={<Comparison />} />
                <Route path="/pages/Feedback" element={<Feedback />} />
                <Route path="/BackendTest" element={<BackendTest />} />
            </Routes>
    </div>
  );
}

export default App;
