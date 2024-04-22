import React, { useState, useEffect } from "react";
import "./Login.css";
import DataViewer from "./DataViewer";

function GetColumns() {
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
    return columns;
}

function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const [selecBmark, setselecBmark] = useState();
  const [loading, setLoading] = useState(true);
  const [showData, setshowData] = useState(false);
  const [showButtons, setshowButtons] = useState(false);
  const [dataset, setDataset] = useState({ data: [] });
  const columns = GetColumns();

  function handledataClick() {
    fetch("/get_tuples/KASINSPARKS.CENLaw", {
      method: "POST",
      body: '{' +
              '"StateName":"' + selecBmark.STATENAME + '",' +
              '"MeasureDesc":"' + selecBmark.MEASUREDESC + '",' +
              '"ProvisionGroupDesc":"' + selecBmark.PROVISIONGROUPDESC + '",' +
              '"ProvisionDesc":"' + selecBmark.PROVISIONDESC + '"' +
              '}'
    })
      .then(res => res.json())
      .then(json => setDataset({ data: json }))
      .catch(err => err);
    setshowData(true);
  }

  function handledeleteClick(){
    setshowButtons(false);
    setshowData(false);
    fetch(`/bookmarks/delete/${selecBmark.TAG}`)
      .catch(err => err);

    const newbmarks = [];
    bookmarks.forEach(item => {
      if (item.TAG != selecBmark.TAG){
        newbmarks.push(item);
      }
    })
    setBookmarks(newbmarks);
  }

  function handlelistClick(bookmark) {
      setshowButtons(true);
      setselecBmark(bookmark);
  }

  useEffect(() => {
    fetch('/bookmarks/get/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch bookmarks');
      }
      return response.json();
    })
    .then(data => {
      setBookmarks(data);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching bookmarks:', error);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <h1 style={{ color: "#2a3653" }}>Your Bookmarks</h1>
      <h4 style={{ color: "#2a3653" }}>Select a bookmark</h4>
      {loading ? (
        <p></p>
      ) : (
        <ul class="bms">
          {bookmarks.map((bookmark, index) => (
            <li key={index} onClick={() => handlelistClick(bookmark)}>
              {bookmark.TAG}: {bookmark.STATENAME}, {bookmark.MEASUREDESC}, {bookmark.PROVISIONDESC}, {bookmark.PROVISIONGROUPDESC}
            </li>
          ))}
        </ul>
      )}
      <div>{showButtons && <p style={{ color: "#2a3653" }}>Selected tag: {selecBmark.TAG}</p>}</div>
      {showButtons && <button onClick={() => handledataClick()} style={{ marginLeft: '16px', marginRight: '20px' }} className="bookmark-button">Display data</button>}
      {showButtons && <button onClick={() => handledeleteClick()} style={{ marginLeft: '10px' }} className="bookmark-button">Delete bookmark</button>}
      {showData && <DataViewer dataset={dataset} columns={columns} />}
    </div>
  );
}

export default Bookmarks;
