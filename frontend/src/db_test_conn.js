import React, { Component } from 'react';

export default function MySubmitButton() {
    function handleClick() {
        fetch("http://localhost:8080/get_tuples", {
            method: "POST",
            body: 
                "NumOfCols=9&" +
                "SELECT=*" +
                "&" +
                "FROM=CENHealthData" +
                "&" +
                "WHERE=LocationDesc='" +
                document.getElementById("Location").value +
                "' AND Year=TO_DATE('" +
                document.getElementById("Year").value +
                "', 'DD-MM-YY')"
        })
    }

    return (
        <button onClick={handleClick}>
          Filter
        </button>
    );
}

export class MyTestForm extends Component {
    constructor(props) {
        super(props);
        this.state = { locationCol: {}, yearCol: {} };
    }

    callAPI() {
        fetch("http://localhost:8080/datafilters/CENHealthData/LocationDesc")
            .then(res => res.json())
            .then(res => this.setState({ locationCol : res }))
            .catch(err => err);
        fetch("http://localhost:8080/datafilters/CENHealthData/Year")
            .then(res => res.json())
            .then(res => this.setState({ yearCol : res }))
            .catch(err => err);
    }

    componentDidMount() {
        this.callAPI();
    }

    render() {
        const loc_rows = [];
        for (var i = 0; i < this.state.locationCol.length; ++i) {
            loc_rows.push(this.state.locationCol[i]);
        }

        const year_rows = [];
        for (var i = 0; i < this.state.yearCol.length; ++i) {
            year_rows.push(this.state.yearCol[i]);
        }

        return (
            <>
              <label for="Location">Location:</label><br/>
              <select id="Location" name="Location">
                {loc_rows.map(loc => (
                    <option value={loc}>{loc}</option>
                ))}
              </select>
              <br/>
              <label for="Year">Year:</label><br/>
              <select id="Year" name="Year">
                {year_rows.map(year => (
                    <option value={year}>{year}</option>
                ))}
              </select>

              <MySubmitButton />
            </>
        );
    }
}

