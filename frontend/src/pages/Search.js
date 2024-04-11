import React, { useState, useEffect } from "react";
import "./Search.css";
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

        var stateNameField = "";
        var measureDescField = "";
        var provisionGroupField = "";
        var provisionDescField = "";
        var stateNameHasWhereCondition = false;
        var measureDescHasWhereCondition = false;
        var provisionGroupHasWhereCondition = false;
        var provisionDescHasWhereCondition = false;

        if (document.getElementById("StateName").value !== "" && document.getElementById("StateName").value !== "All") {
            stateNameField = "StateName='" +
                document.getElementById("StateName").value;
            stateNameHasWhereCondition = true;
        }

        if (document.getElementById("MeasureDesc").value !== "" && document.getElementById("MeasureDesc").value !== "All") {
            measureDescField = "'AND MeasureDesc='" +
                document.getElementById("MeasureDesc").value;
            measureDescHasWhereCondition = true;
        }

        if (document.getElementById("ProvisionGroupDesc").value !== "" && document.getElementById("ProvisionGroupDesc").value !== "All") {
            provisionGroupField = "' AND ProvisionGroupDesc='" +
                document.getElementById("ProvisionGroupDesc").value;
            provisionGroupHasWhereCondition = true;
        }

        if (document.getElementById("ProvisionDesc").value !== "" && document.getElementById("ProvisionDesc").value !== "All") {
            provisionDescField = "' AND ProvisionDesc='" +
                document.getElementById("ProvisionDesc").value;
            provisionDescHasWhereCondition = true;
        }

        var whereClause = "";
        if (stateNameHasWhereCondition || measureDescHasWhereCondition || provisionGroupHasWhereCondition || provisionDescHasWhereCondition) {
            whereClause = "&" +
                "WHERE="
                + stateNameField
                + measureDescField
                + provisionGroupField
                + provisionDescField + "'";
        }
        console.log(whereClause);

        fetch("/get_tuples", {
            method: "POST",
            body:
                "NumOfCols=10&" +
                "SELECT=stateName,measureDesc,provisionGroupDesc,provisionDesc,provisionValue,citation,provisionAltValue,datatype,enactedDate,effectiveDate" +
                "&" +
                "FROM=Kasinsparks.CENLaw" +
                whereClause
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

function CompareSubmitButton({ list, columns }) {
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

        var locationDescField = "";
        var topicDescField = "";
        var measureDescField = "";
        var genderField = "";
        var educationField = "";

        var locationDescHasWhereCondition = false;
        var topicDescHasWhereCondition = false;
        var measureDescHasWhereCondition = false;
        var genderHasWhereCondition = false;
        var educationHasWhereCondition = false;

        if (document.getElementById("LocationDesc").value !== "" && document.getElementById("LocationDesc").value !== "All") {
            locationDescField = "LocationDesc='" +
                document.getElementById("LocationDesc").value;
            locationDescHasWhereCondition = true;
        }

        if (document.getElementById("TopicDesc").value !== "" && document.getElementById("TopicDesc").value !== "All") {
            topicDescField = "'AND TopicDesc='" +
                document.getElementById("TopicDesc").value;
            topicDescHasWhereCondition = true;
        }

        if (document.getElementById("MeasureDesc").value !== "" && document.getElementById("MeasureDesc").value !== "All") {
            measureDescField = "' AND MeasureDesc='" +
                document.getElementById("MeasureDesc").value;
            measureDescHasWhereCondition = true;
        }

        if (document.getElementById("Gender").value !== "" && document.getElementById("Gender").value !== "All") {
            genderField = "' AND Gender='" +
                document.getElementById("Gender").value;
            genderHasWhereCondition = true;
        }

        if (document.getElementById("Education").value !== "" && document.getElementById("Education").value !== "All") {
            genderField = "' AND Education='" +
                document.getElementById("Education").value;
            educationHasWhereCondition = true;
        }

        var whereClause = "";
        if (locationDescHasWhereCondition || topicDescHasWhereCondition || measureDescHasWhereCondition || genderHasWhereCondition ||educationHasWhereCondition){
            whereClause = "&" +
                "WHERE="
                + locationDescField
                + topicDescField
                + measureDescField
                + genderField
                + educationField
                + "'";
        }
        console.log(whereClause);

        fetch("/get_tuples", {
            method: "POST",
            body:
                "NumOfCols=9&" +
                "SELECT=year, locationDesc, topicDesc, measureDesc, response, percentage, sampleSize, gender, education"+
                "&" +
                "FROM=Kasinsparks.CENHealthData" +
                whereClause
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
// function CompareButton() {
//     const [xPos, setXPos] = useState(0);
//     //const delta = 200;
//     const [moved, setMoved] = useState(false);
//
//     function handleClick() {
//         const x = document.getElementById("b");
//         const compareSearch = document.getElementById("CompareSearchFeature");
//         const clone = compareSearch.cloneNode(true);
//         clone.id = "cloneID";
//
//         // if (compareSearch.style.display === "none") {
//         //     compareSearch.style.display = "block";
//         // } else {
//         //     compareSearch.style.display = "none";
//         // }
//         if (!moved) {
//             setMoved(true)
//             clone.style.position = "absolute";
//             clone.style.right= "0px";
//             clone.style.margin = "10px 10px";
//             document.body.appendChild(clone);
//             clone.style.display = "block";
//
//             compareSearch.style.position = "absolute";
//             compareSearch.style.left = "-0px";
//             compareSearch.style.margin = "10px 10px";
//             //search.style.transition = 'all 0.5s ease';
//         } else {
//             // not moved
//             setMoved(false)
//             compareSearch.style.position = "static";
//             compareSearch.style.left = "auto";
//             compareSearch.style.margin = "0";
//
//             clone.style.display = "none";
//             clone.remove();
//             //document.body.appendChild(clone);
//
//             //search.style.transition = 'all 0.5s ease';
//         }
//     }
//
//     return (
//         <div>
//             <button id='b' className="compare-button" onClick={handleClick}>
//                 Compare
//             </button>
//         </div>
//     );
// }

function CompareSearch() {
    const [list, setList] = useState(["", ""]);//, "", "", ""]);
    const [locationDescCol, setLocationDescCol] = useState([]);
    const [topicDescCol, setTopicDescCol] = useState([]);
    const [measureDescCol, setMeasureDescCol] = useState([]);
    const [genderCol, setGenderCol] = useState([]);
    const [educationCol, setEducationCol] = useState([]);

    useEffect(() => {
        const fetchLocationDescCol = async () => {
            const locationDescRes = await fetch("/datafilters/kasinsparks.CENHealthData/locationDesc");
            const locationDescResult = await locationDescRes.json();
            setLocationDescCol(locationDescResult);
        }
        const fetchTopicDescCol = async () => {
            const topicDescRes = await fetch("/datafilters/kasinsparks.CENHealthData/topicDesc");
            const topicDescResult = await topicDescRes.json();
            setTopicDescCol(topicDescResult);
        }
        const fetchMeasureDescCol = async () => {
            const measureDescRes = await fetch("/datafilters/kasinsparks.CENHealthData/measureDesc");
            const measureDescResult = await measureDescRes.json();
            setMeasureDescCol(measureDescResult);
        }
        const fetchGenderCol = async () => {
            const genderRes = await fetch("/datafilters/kasinsparks.CENHealthData/Gender");
            const genderResult = await genderRes.json();
            setGenderCol(genderResult);
        }

        const fetchEducationCol = async () => {
            const educationRes = await fetch("/datafilters/kasinsparks.CENHealthData/Education");
            const educationResult = await educationRes.json();
            setEducationCol(educationResult);
        }

        fetchLocationDescCol();
        fetchTopicDescCol();
        fetchMeasureDescCol();
        fetchGenderCol();
        fetchEducationCol();
    }, []);

    const updateList = (newList) => {
        setList(newList);
    };


        const locationDescRow = [];
        for (var i = 0; i < locationDescCol.length; ++i) {
            locationDescRow.push(locationDescCol[i]);
    }

        const topicDescRow = [];
        for (var i = 0; i < topicDescCol.length; ++i) {
            topicDescRow.push(topicDescCol[i]);
    }

        const measureDescRow = [];
        for (var i = 0; i < measureDescCol.length; ++i) {
            measureDescRow.push(measureDescCol[i]);
    }
        const genderRow = [];
        for (var i = 0; i < genderCol.length; ++i) {
            genderRow.push(genderCol[i]);
        }
    const educationRow = [];
    for (var i = 0; i < educationCol.length; ++i) {
        educationRow.push(educationCol[i]);
    }


    const columns = [locationDescRow, topicDescRow, measureDescRow, genderRow, educationRow];

    return (
        <body>
        <div className="Search">
            {/*<CompareButton/>*/}
            <br/>
            <div className="search-feature" id="CompareSearchFeature">
            <h3>Select a state or territory:</h3>
            <CustomDropdown
                id={"LocationDesc"}
                options={["All"].concat(locationDescCol)}
                list={list}
                updateList={updateList}
                return_index={0}
            />
            <h3>Select a survey topic:</h3>
            <CustomDropdown
                id={"TopicDesc"}
                options={["All"].concat(topicDescCol)}
                list={list}
                updateList={updateList}
                return_index={1}
            />
            <h3>Select a collected data type:</h3>
            <CustomDropdown
                id={"MeasureDesc"}
                options={["All"].concat(measureDescCol)}
                list={list}
                updateList={updateList}
                return_index={2}
            />
            <h3>Select gender of participants:</h3>
            <CustomDropdown
                id={"Gender"}
                options={["All"].concat(genderCol)}
                list={list}
                updateList={updateList}
                return_index={3}
            />
            <h3>Select education level of participants:</h3>
            <CustomDropdown
                id={"Education"}
                options={["All"].concat(educationCol)}
                list={list}
                updateList={updateList}
                return_index={3}
            />
            <p>Selected choices: {list.join(", ")}</p>
            </div>
        </div>
        <CompareSubmitButton list={list} columns={columns}/>
        </body>
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
    const columns = [stateNameRow, measureDescRow, provisionGroupDescRow, provisionDescRow];

    return (
        <body>
        <div className="Search">
            <br/>
            <div className="search-feature" id="SearchFeature">
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
                <p>Selected choices: {list.join(", ")}</p>
            </div>
        </div>
        <SubmitButton list={list} columns={columns}/>
        </body>
    );
}


export default CompareSearch;
