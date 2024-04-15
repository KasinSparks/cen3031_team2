import React, { useState, useEffect } from "react";
import usePrevious from 'react-use-previous';
import "./Login.css";
import CustomDropdown from "./CustomDropdown";
import DataViewer from "./DataViewer";
function SubmitButton({ list, columns }) {
    const [validationMessage, setValidationMessage] = useState("");
    const [showData, setShowData] = useState(false);
    const [dataset, setDataset] = useState({ data: [] });

    function handleClick() {
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

        fetch("/get_tuples/KASINSPARKS.CENLaw", {
            method: "POST",
            body: '{' +
                  '"StateName":"' + document.getElementById("StateName").value + '",' +
                  '"MeasureDesc":"' + document.getElementById("MeasureDesc").value + '",' +
                  '"ProvisionGroupDesc":"' + document.getElementById("ProvisionGroupDesc").value + '",' +
                  '"ProvisionDesc":"' + document.getElementById("ProvisionDesc").value + '"' +
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
            {showData && <DataViewer dataset={dataset} columns={columns} />}
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
    const columns = [stateNameRow, measureDescRow, provisionGroupDescRow, provisionDescRow];


    return (
        <body>
            <div className="Login">
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


export default Search;
