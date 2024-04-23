import React, { useState, useEffect } from "react";
import usePrevious from 'react-use-previous';
import "./Login.css";
import CustomDropdown from "./CustomDropdown";
import DataViewer from "./DataViewer";

function SubmitButton({ list, columns }) {
    // can change dataset, status message, bool to display data
    const [validationMessage, setValidationMessage] = useState("");
    const [showData, setShowData] = useState(false);
    const [dataset, setDataset] = useState({ data: [] });

    function handleClick() {
        //ensure list is filled
        if (!list || list.length === 0) {
            console.log("Error 1")
            setValidationMessage(`Please fill in all fields.`);
            setShowData(false);
            return;
        }
        for (let i = 0; i < list.length; i++) {
            if (!list[i] || list[i].length === 0) {
                // Set validation message and return
                console.log("Error 2")
                setValidationMessage(`Please fill in all fields.`);
                setShowData(false);
                return;
            }
        }
        //use list[] in this version as opposed to method used in Search.js because multiple queries will conflict
        //set dataset and display the data
        fetch("/get_tuples/KASINSPARKS.CENLaw", {
            method: "POST",
            body: '{' +
                  '"StateName":"' + list[0] + '",' +
                  '"MeasureDesc":"' + list[1] + '",' +
                  '"ProvisionGroupDesc":"' + list[2] + '",' +
                  '"ProvisionDesc":"' + list[3] + '"' +
                  '}'
        })
            .then(res => res.json())
            .then(json => setDataset({ data: json }))
            .catch(err => err);
        setValidationMessage("");
        setShowData(true);
    }

    return (
        <div>
            <button className="button" onClick={handleClick}>
                Submit
            </button>
            <div>
                {validationMessage && (
                    <p style={{ color: "#2a3653" }}>{validationMessage}</p>
                )}
            </div>
            <div className="scrollable-container">
                <div className="scrollable-content">
            {/* conditionally render dataset if button has been clicked */}
            {showData && <DataViewer dataset={dataset} columns={columns} />}
            </div>
            </div>
        </div>
    );
}

function Search() {
    const [list, setList] = useState(["", "", "", ""]);
    const [stateNameCol, setStateNameCol] = useState([]);
    const [measureDescCol, setMeasureDescCol] = useState([]);
    const [provisionGroupDescCol, setProvisionGroupDescCol] = useState([]);
    const [provisionDescCol, setProvisionDescCol] = useState([]);

    useEffect(() => {
        // open opening the page, retrieve all columns
        const fetchStateNameCol = async () => {
            const stateNameRes = await fetch("/datafilters/kasinsparks.CENLaw/StateName");
            const stateNameResult = await stateNameRes.json();
            setStateNameCol(stateNameResult);
        }
        const fetchMeasureDescCol = async () => {
            const measureDescRes = await fetch("/datafilters/kasinsparks.CENLaw/MeasureDesc");
            const measureDescResult = await measureDescRes.json();
            setMeasureDescCol(measureDescResult);
        }
        const fetchProvisionGroupDescCol = async () => {
            const provisionGroupDescRes = await fetch("/datafilters/kasinsparks.CENLaw/ProvisionGroupDesc");
            const provisionGroupDescResult = await provisionGroupDescRes.json();
            setProvisionGroupDescCol(provisionGroupDescResult);
        }
        const fetchProvisionDescCol = async () => {
            const provisionDescRes = await fetch("/datafilters/kasinsparks.CENLaw/ProvisionDesc");
            const provisionDescResult = await provisionDescRes.json();
            setProvisionDescCol(provisionDescResult);
        }
        console.log(stateNameCol)

        fetchStateNameCol();
        fetchMeasureDescCol();
        fetchProvisionGroupDescCol();
        fetchProvisionDescCol();
    }, []);

    const updateList = (newList) => {
        setList(newList);
    };

    
        const stateNameRow = [];
        for (var i = 0; i < stateNameCol.length; ++i) {
            stateNameRow.push(stateNameCol[i]);
    }
       
        const measureDescRow = [];
        for (var i = 0; i < measureDescCol.length; ++i) {
            measureDescRow.push(measureDescCol[i]);
    }

        const provisionGroupDescRow = [];
        for (var i = 0; i < provisionGroupDescCol.length; ++i) {
            provisionGroupDescRow.push(provisionGroupDescCol[i]);
    }
        const provisionDescRow = [];
        for (var i = 0; i < provisionDescCol.length; ++i) {
            provisionDescRow.push(provisionDescCol[i]);
        }

    //store all columns to be used in DataViewer
    const columns = [stateNameRow, measureDescRow, provisionGroupDescRow, provisionDescRow];


    return (
        <body>
            <div className="Login">
                {/* same as Search.js, occupies list with choices, send to SubmitButton */}
                <br />
                <h3>Select a state or territory:</h3>
                <CustomDropdown
                    id={"StateName"}
                    options={["All"].concat(stateNameCol)}
                    list={list}
                    updateList={updateList}
                    return_index={0}
                />
                <h3>Select a category of restricted behavior:</h3>
                <CustomDropdown
                    id={"MeasureDesc"}
                    options={["All"].concat(measureDescCol)}
                    list={list}
                    updateList={updateList}
                    return_index={1}
                />
                <h3>Select a category of restricted behavior:</h3>
                <CustomDropdown
                    id={"ProvisionGroupDesc"}
                    options={["All"].concat(provisionGroupDescCol)}
                    list={list}
                    updateList={updateList}
                    return_index={2}
                />
                <h3>Select a type of law:</h3>
                <CustomDropdown
                    id={"ProvisionDesc"}
                    options={["All"].concat(provisionDescCol)}
                    list={list}
                    updateList={updateList}
                    return_index={3}
                />
                <p>Selected choices: { list.join(", ") }</p>
            </div>
            <SubmitButton list={list} columns={columns} />
        </body>
    );
}

function Comparison() {
    // render search components with thin black separator line between
    return (
        <div className="comp-feature">
            <div className="scrollable-container">
          <Search/>
          </div>
      <div className="separator"></div>
      <div className="scrollable-container">
          <Search/>
          </div>
        </div>

      );
};

export default Comparison;