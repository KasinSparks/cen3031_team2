import React, { useState, useEffect } from "react";
import "./Search.css";
import CustomDropdown from "./CustomDropdown";
import DataViewer from "./DataViewer";

function ComparisonButton() {
    //take user to comparison feature if clicked
    const handleClick = () => {
      window.location.href = './Comparison';
    };
  
    return <button className="compare-button" onClick={handleClick}>Compare two datasets</button>;
}

function SubmitButton({ list, columns }) {
    const [validationMessage, setValidationMessage] = useState("");
    const [showData, setShowData] = useState(false);
    const [tag, setTag] = useState("");
    const [dataset, setDataset] = useState({ data: [] });
    //changes bookmark name dynamically
    const handleTagChange = (event) => {
        setTag(event.target.value);
      };

    function BookmarkButton() {

        const queryParams = {
            //retrieve params to feed API to add bookmark
            state: "'" + document.getElementById("StateName").value + "'",
            tag: "'" + tag + "'",
            md: "'" + document.getElementById("MeasureDesc").value + "'",
            pd: "'" + document.getElementById("ProvisionDesc").value + "'",
            pgd: "'" + document.getElementById("ProvisionGroupDesc").value + "'",
        }

        // API route
        const Url = `/bookmarks/add/?state=${queryParams["state"]}&tag=${queryParams["tag"]}&md=${queryParams["md"]}&pd=${queryParams["pd"]}&pgd=${queryParams["pgd"]}`

        const handleBMClick = () => {
            //attempt to add bookmark, return if no name
            if (tag == ""){
                return;
            }
            fetch(Url)
                .then(res => res.text())
                .catch(err => err);
        };
    
        return(<button className="bookmark-button" onClick={handleBMClick}>Bookmark this query</button>);
    }

    function handleClick() {
        //make sure list is unempty
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

        //retrieve relevant queried dataset, set it as dataset, and display it
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
        console.log(dataset.data.data)
        setValidationMessage("");
        setShowData(true);
    }

    return (
        <div>
            {/* render submit button and conditionally display dataset */}
            <button className="button" onClick={handleClick}>
                Submit
            </button>
            {showData && <Download dataset={dataset.data.data}/>}
            <div>
                {validationMessage && (
                    <p style={{ color: "#2a3653" }}>{validationMessage}</p>
                )}
            </div>
            {showData && <DataViewer dataset={dataset} columns={columns} />}
            <div>{showData && <h3 style={{ color: "#2a3653" }}>Add this query as a bookmark?</h3>}</div>
            {/* conditionally render bookmark addition functionality */}
            <div>{showData && 
            <input
            type="text"
            value={tag}
            onChange={handleTagChange}
            placeholder="Name your bookmark"
          />}</div>
            <br></br>
            <div>{showData && <BookmarkButton />}</div>
            <br></br><br></br>
        </div>
    );
}

function Download(dataset) {
    // allow user to download displayed dataset
    const [validDownload, setValidDownload] = useState(true);
    function handleClick() {
        /**
         * Javascript resources:
         * https://developer.mozilla.org/en-US/docs/Web/API/Blob
         */

        const json = new Blob([JSON.stringify(dataset, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(json);
        const link = document.createElement("a");
        link.download = 'data.json'
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        console.log('click');
    }



    return (
        <div>
            <button className="button" onClick={handleClick}>
                Download
            </button>
        </div>
    );
}

function Search() {
    const [list, setList] = useState(["", "", "", ""]);
    const [stateNameCol, setStateNameCol] = useState([]);
    const [measureDescCol, setMeasureDescCol] = useState([]);
    const [provisionGroupDescCol, setProvisionGroupDescCol] = useState([]);
    const [provisionDescCol, setProvisionDescCol] = useState([]);

    // retrieve column values
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

    // values fed into DataViewer to display later
    const columns = [stateNameRow, measureDescRow, provisionGroupDescRow, provisionDescRow];


    return (
        <div>
        <div style={{textAlign: 'right', margin: '10px 20px 0px auto' }}>
        {/* display comparison button in the top right of the page */}
        <ComparisonButton/>
        </div>
        <body>
            {/* dropdowns allow user to set their queries for the dataset */}
            <div className="Search">
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
                {/* displays current list of selected choices */}
                <p>Selected choices: { list.join(", ") }</p>
            </div>
            {/* will render the requested dataset */}
            <SubmitButton list={list} columns={columns} />
        </body>
        </div>
    );
}


export default Search;
