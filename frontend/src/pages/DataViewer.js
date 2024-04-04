import React, { useState, useEffect }  from "react";
import "react-data-grid/lib/styles.css";
import DataGrid from "react-data-grid";
import "./DataViewer.css";

function DataViewer(dataset, columns) {
  const [rowdata, setRowdata] = useState([]);
  const [coldata, setColdata] = useState([]);


  useEffect(() => {
    setRowdata(dataset["dataset"]["data"]["data"]);
    setColdata(dataset["dataset"]["data"]["columns"]);
  }, [dataset]);

  if (rowdata !== undefined) {
    return (
      <div style={{ margin: "30px 40px", height: "100%" }}>
            <DataGrid columns={coldata} rows={rowdata} />
      </div>
    );
  } else {
    return (
        <h3 style={{ color: "#2a3653", margin: "30px 40px"}}>
            No Results
       </h3>
    );
  }
}

export default DataViewer;
