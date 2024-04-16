import React, { useState, useEffect } from "react";
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

    /* Javascript and React resources:
    1. https://www.geeksforgeeks.org/javascript-array-filter-method/ 
    2. https://react.dev/reference/react-dom/components/common#common 
    3. https://legacy.reactjs.org/docs/conditional-rendering.html 
    4. https://sentry.io/answers/react-for-loops/
    */

    if (rowdata !== undefined && rowdata.length > 0) {
        
        // Sorts Provisions into six categories (Sorted based on Penalties, Enforcement, and Restrictions for both Vending and Sales)
        const VendingPenaltiesLaws = rowdata.filter(currRow => currRow.MEASUREDESC === "Cigarette Vending Machines" && currRow.PROVISIONGROUPDESC === "Penalties" && currRow.PROVISIONVALUE !== "No Provision" && currRow.PROVISIONDESC !== "Penalty to Youth (Type)" && currRow.PROVISIONDESC !== "Penalty to Business (Type)" && currRow.PROVISIONDESC !== "Penalty to Youth" && currRow.PROVISIONDESC !== "Penalty to Business");
        const VendingRestrictionsLaws = rowdata.filter(currRow => currRow.MEASUREDESC === "Cigarette Vending Machines" && currRow.PROVISIONGROUPDESC === "Restrictions" && currRow.PROVISIONVALUE !== "No Provision" && currRow.PROVISIONDESC !== "Minimum Age" && currRow.PROVISIONDESC !== "Purchase Prohibited");
        const VendingEnformentLaws = rowdata.filter(currRow => currRow.MEASUREDESC === "Cigarette Vending Machines" && currRow.PROVISIONGROUPDESC === "Enforcement" && currRow.PROVISIONVALUE !== "No Provision" && currRow.PROVISIONDESC !== "Enforcement Authority");
        const SalesPenaltiesLaws = rowdata.filter(currRow => currRow.MEASUREDESC === "Cigarette Sales" && currRow.PROVISIONGROUPDESC === "Penalties" && currRow.PROVISIONVALUE !== "No Provision" && currRow.PROVISIONDESC !== "Penalty to Youth (Type)" && currRow.PROVISIONDESC !== "Penalty to Business (Type)" && currRow.PROVISIONDESC !== "Penalty to Youth" && currRow.PROVISIONDESC !== "Penalty to Business");
        const SalesRestrictionsLaws = rowdata.filter(currRow => currRow.MEASUREDESC === "Cigarette Sales" && currRow.PROVISIONGROUPDESC === "Restrictions" && currRow.PROVISIONVALUE !== "No Provision" && currRow.PROVISIONDESC !== "Minimum Age" && currRow.PROVISIONDESC !== "Purchase Prohibited");
        const SalesEnformentLaws = rowdata.filter(currRow => currRow.MEASUREDESC === "Cigarette Sales" && currRow.PROVISIONGROUPDESC === "Enforcement" && currRow.PROVISIONVALUE !== "No Provision" && currRow.PROVISIONDESC !== "Enforcement Authority");

        // Iterates through values in VendingPenaltiesLaws array and converts PROVISIONDESC value into display-ready content.
        for (let i = 0; i < VendingPenaltiesLaws.length; i++) {
            if (VendingPenaltiesLaws[i].PROVISIONDESC === "Maximum Penalty ($)") {
                VendingPenaltiesLaws[i].PROVISIONDESC = "Vending machine operators found in violation of youth tobacco access prevention laws may receive a maximum penalty of $" + VendingPenaltiesLaws[i].PROVISIONVALUE + ". (See " + VendingPenaltiesLaws[i].CITATION + ")"
            }
            else if (VendingPenaltiesLaws[i].PROVISIONDESC === "License Suspension or Revocation" && VendingPenaltiesLaws[i].PROVISIONVALUE === "Both") {
                VendingPenaltiesLaws[i].PROVISIONDESC = "Vending machine operators found in violation of youth tobacco access prevention laws shall be subject to license suspension and may be subject to license revocation. (See " + VendingPenaltiesLaws[i].CITATION + ")"
            }
            else if (VendingPenaltiesLaws[i].PROVISIONDESC === "Minimum Penalty ($)") {
                VendingPenaltiesLaws[i].PROVISIONDESC = "Vending machine operators found in violation of youth tobacco access prevention laws must receive a minimum penalty of at least $" + VendingPenaltiesLaws[i].PROVISIONVALUE + ". (See " + VendingPenaltiesLaws[i].CITATION + ")"
            }
            else if (VendingPenaltiesLaws[i].PROVISIONDESC === "Maximum Penalty to Youth ($)") {
                VendingPenaltiesLaws[i].PROVISIONDESC = "Any youth found in violation of tobacco vending machine laws may receive a maximum penalty of $" + VendingPenaltiesLaws[i].PROVISIONVALUE + ". (See " + VendingPenaltiesLaws[i].CITATION + ")"
            }
            else if (VendingPenaltiesLaws[i].PROVISIONDESC === "Minimum Penalty to Youth ($)") {
                VendingPenaltiesLaws[i].PROVISIONDESC = "Any youth found in violation of tobacco vending machine laws must receive a minimum penalty of at least " + VendingPenaltiesLaws[i].PROVISIONVALUE + ". (See " + VendingPenaltiesLaws[i].CITATION + ")"
            }
        }
        // Iterates through values in VendingRestrictionsLaws array and converts PROVISIONDESC value into display-ready content.
        for (let i = 0; i < VendingRestrictionsLaws.length; i++) {
            if (VendingRestrictionsLaws[i].PROVISIONDESC === "Supervision" && VendingRestrictionsLaws[i].PROVISIONVALUE === "Yes") {
                VendingRestrictionsLaws[i].PROVISIONDESC = "Minors must be supervised while in the vicinity of a tobacco vending machine. (See " + VendingRestrictionsLaws[i].CITATION + ")"
            }
            else if (VendingRestrictionsLaws[i].PROVISIONDESC === "Minimum Age (Years)") {
                VendingRestrictionsLaws[i].PROVISIONDESC = "State law prohibits the purchase of tobacco products by individuals under the age of " + VendingRestrictionsLaws[i].PROVISIONVALUE + "(See " + VendingRestrictionsLaws[i].CITATION + ")"
            }
            else if (VendingRestrictionsLaws[i].PROVISIONDESC === "Restriction on Access" && VendingRestrictionsLaws[i].PROVISIONVALUE === "Yes") {
                VendingRestrictionsLaws[i].PROVISIONDESC = "Minors face restrictions when entering locations with tobacco vending machines. (See " + VendingRestrictionsLaws[i].CITATION + ")"
            }
            else if (VendingRestrictionsLaws[i].PROVISIONDESC === "Banned from Location" && VendingRestrictionsLaws[i].PROVISIONVALUE === "Yes") {
                VendingRestrictionsLaws[i].PROVISIONDESC = "Minors are prohibited from entering locations with tobacco vending machines. (See " + VendingRestrictionsLaws[i].CITATION + ")"
            }
            else if (VendingRestrictionsLaws[i].PROVISIONDESC === "Possession Prohibited" && VendingRestrictionsLaws[i].PROVISIONVALUE === "Yes") {
                VendingRestrictionsLaws[i].PROVISIONDESC = "Minors are prohibited from possessing tobacco producs. (See " + VendingRestrictionsLaws[i].CITATION + ")"
            }
            else if (VendingRestrictionsLaws[i].PROVISIONDESC === "Use Prohibited" && VendingRestrictionsLaws[i].PROVISIONVALUE === "Yes") {
                VendingRestrictionsLaws[i].PROVISIONDESC = "Minors are prohibited from using tobacco producs. (See " + VendingRestrictionsLaws[i].CITATION + ")"
            }
            else if (VendingRestrictionsLaws[i].PROVISIONDESC === "Limited Placement" && VendingRestrictionsLaws[i].PROVISIONVALUE === "Yes") {
                VendingRestrictionsLaws[i].PROVISIONDESC = "Cigarette vending machines may only be placed in limited areas. (See " + VendingRestrictionsLaws[i].CITATION + ")"
            }
            else if (VendingRestrictionsLaws[i].PROVISIONDESC === "Locking Device" && VendingRestrictionsLaws[i].PROVISIONVALUE === "Yes") {
                VendingRestrictionsLaws[i].PROVISIONDESC = "Cigarette vending machines must utilize locking devices. (See " + VendingRestrictionsLaws[i].CITATION + ")"
            }
        }
        // Iterates through values in VendingEnformentLaws array and converts PROVISIONDESC value into display-ready content.
        for (let i = 0; i < VendingEnformentLaws.length; i++)
        {
            if (VendingEnformentLaws[i].PROVISIONDESC === "Enforcement (Type)") {
                VendingEnformentLaws[i].PROVISIONDESC = "Laws are enforced by: " + VendingEnformentLaws[i].PROVISIONVALUE + ". (See " + VendingEnformentLaws[i].CITATION + ")"
            }
            else if (VendingEnformentLaws[i].PROVISIONDESC === "Signage Required" && VendingEnformentLaws[i].PROVISIONVALUE === "Yes") {
                VendingEnformentLaws[i].PROVISIONDESC = "Signage warnings of legal requirements must be displayed in the vicinity of all tobacco vending machines. (See " + VendingEnformentLaws[i].CITATION + ")"
            }
        }
        // Iterates through values in SalesPenaltiesLaws array and converts PROVISIONDESC value into display-ready content.
        for (let i = 0; i < SalesPenaltiesLaws.length; i++) {
            if (SalesPenaltiesLaws[i].PROVISIONDESC === "Maximum Penalty to Business ($)") {
                SalesPenaltiesLaws[i].PROVISIONDESC = "Retail tobacco establishments found in violation of youth tobacco access prevention laws may receive a maximum penalty of $" + SalesPenaltiesLaws[i].PROVISIONVALUE + ". (See " + SalesPenaltiesLaws[i].CITATION + ")"
            }
            else if (SalesPenaltiesLaws[i].PROVISIONDESC === "License Suspension or Revocation" && SalesPenaltiesLaws[i].PROVISIONVALUE === "Both") {
                SalesPenaltiesLaws[i].PROVISIONDESC = "Retail tobacco establishments found in violation of youth tobacco access prevention laws shall be subject to license suspension and may be subject to license revocation. (See " + SalesPenaltiesLaws[i].CITATION + ")"
            }
            else if (SalesPenaltiesLaws[i].PROVISIONDESC === "Minimum Penalty to Business ($)") {
                SalesPenaltiesLaws[i].PROVISIONDESC = "Retail tobacco establishments found in violation of youth tobacco access prevention laws must receive a minimum penalty of at least $" + SalesPenaltiesLaws[i].PROVISIONVALUE + ". (See " + SalesPenaltiesLaws[i].CITATION + ")"
            }
            else if (SalesPenaltiesLaws[i].PROVISIONDESC === "Maximum Penalty to Youth ($)") {
                SalesPenaltiesLaws[i].PROVISIONDESC = "Any youth found in violation of tobacco sales laws may receive a maximum penalty of $" + SalesPenaltiesLaws[i].PROVISIONVALUE + ". (See " + SalesPenaltiesLaws[i].CITATION + ")"
            }
            else if (SalesPenaltiesLaws[i].PROVISIONDESC === "Minimum Penalty to Youth ($)") {
                SalesPenaltiesLaws[i].PROVISIONDESC = "Any youth found in violation of tobacco sales laws must receive a minimum penalty of at least " + SalesPenaltiesLaws[i].PROVISIONVALUE + ". (See " + SalesPenaltiesLaws[i].CITATION + ")"
            }
        }
        // Iterates through values in SalesRestrictionsLaws array and converts PROVISIONDESC value into display-ready content.
        for (let i = 0; i < SalesRestrictionsLaws.length; i++) {
            if (SalesRestrictionsLaws[i].PROVISIONDESC === "Supervision" && SalesRestrictionsLaws[i].PROVISIONVALUE === "Yes") {
                SalesRestrictionsLaws[i].PROVISIONDESC = "Minors must be supervised while in retail tobacco establishments. (See " + SalesRestrictionsLaws[i].CITATION + ")"
            }
            else if (SalesRestrictionsLaws[i].PROVISIONDESC === "Minimum Age (Years)") {
                SalesRestrictionsLaws[i].PROVISIONDESC = "State law prohibits the purchase of tobacco products by individuals under the age of " + SalesRestrictionsLaws[i].PROVISIONVALUE + ". (See " + SalesRestrictionsLaws[i].CITATION + ")"
            }
            else if (SalesRestrictionsLaws[i].PROVISIONDESC === "Restriction on Access" && SalesRestrictionsLaws[i].PROVISIONVALUE === "Yes") {
                SalesRestrictionsLaws[i].PROVISIONDESC = "Minors face restrictions when entering retail tobacco establishments. (See " + SalesRestrictionsLaws[i].CITATION + ")"
            }
            else if (SalesRestrictionsLaws[i].PROVISIONDESC === "Banned from Location" && SalesRestrictionsLaws[i].PROVISIONVALUE === "Yes") {
                SalesRestrictionsLaws[i].PROVISIONDESC = "Minors are prohibited from entering retail tobacco establishments. (See " + SalesRestrictionsLaws[i].CITATION + ")"
            }
            else if (SalesRestrictionsLaws[i].PROVISIONDESC === "Possession Prohibited" && SalesRestrictionsLaws[i].PROVISIONVALUE === "Yes") {
                SalesRestrictionsLaws[i].PROVISIONDESC = "Minors are prohibited from possessing tobacco producs. (See " + SalesRestrictionsLaws[i].CITATION + ")"
            }
            else if (SalesRestrictionsLaws[i].PROVISIONDESC === "Use Prohibited" && SalesRestrictionsLaws[i].PROVISIONVALUE === "Yes") {
                SalesRestrictionsLaws[i].PROVISIONDESC = "Minors are prohibited from using tobacco producs. (See " + SalesRestrictionsLaws[i].CITATION + ")"
            }
            else if (SalesRestrictionsLaws[i].PROVISIONDESC === "Limited Placement" && SalesRestrictionsLaws[i].PROVISIONVALUE === "Yes") {
                SalesRestrictionsLaws[i].PROVISIONDESC = "Retail tobacco establishments may only be located in limited areas. (See " + SalesRestrictionsLaws[i].CITATION + ")"
            }
            else if (SalesRestrictionsLaws[i].PROVISIONDESC === "Locking Device" && SalesRestrictionsLaws[i].PROVISIONVALUE === "Yes") {
                SalesRestrictionsLaws[i].PROVISIONDESC = "Retail tobacco establishments must utilize locking devices. (See " + SalesRestrictionsLaws[i].CITATION + ")"
            }
        }
        // Iterates through values in SalesEnformentLaws array and converts PROVISIONDESC value into display-ready content.
        for (let i = 0; i < SalesEnformentLaws.length; i++) {
            if (SalesEnformentLaws[i].PROVISIONDESC === "Enforcement (Type)") {
                SalesEnformentLaws[i].PROVISIONDESC = "Laws are enforced by: " + SalesEnformentLaws[i].PROVISIONVALUE + ". (See " + SalesEnformentLaws[i].CITATION + ")"
            }
            else if (SalesEnformentLaws[i].PROVISIONDESC === "Signage Required" && SalesEnformentLaws[i].PROVISIONVALUE === "Yes") {
                SalesEnformentLaws[i].PROVISIONDESC = "Commercial tobacco venders must display signage warnings of legal requirements (See " + SalesEnformentLaws[i].CITATION + ")"
            }
        }

        // Returns the contents of all six arrays (and associated headers) as well as a table of raw data.
        return (
            <div style={{ margin: "30px 40px", height: "100%" }}>
                {(SalesPenaltiesLaws.length > 0 || SalesRestrictionsLaws.length > 0 || SalesEnformentLaws.length > 0 || VendingPenaltiesLaws.length > 0 || VendingRestrictionsLaws.length > 0 || VendingEnformentLaws.length > 0) &&
                    <h1 style={{ textAlign: "left", margin: "20 px", color: "#2a3653", textDecoration: "underline" }}> Overview of Applicable {rowdata[0].STATENAME} Laws: </h1>
                }
                {(VendingPenaltiesLaws.length > 0 || VendingRestrictionsLaws.length > 0 || VendingEnformentLaws.length > 0) &&
                    <h3 style={{textAlign: "left", margin: "20 px", color: "#2a3653" }}> Laws to Prevent Youth Access to Cigarette Vending Machines </h3>
                }
                {(VendingPenaltiesLaws.length > 0) &&
                    <div>
                    <h4 style={{ textAlign: "left", margin: "20 px", color: "#2a3653" }}> Penalties </h4>
                    <ul> {VendingPenaltiesLaws.map((law, i) => (<li key={i} style={{ textAlign: "left", color: "#2a3653" }}>{law.PROVISIONDESC}</li>))}</ul>
                    </div>
                }
                {(VendingRestrictionsLaws.length > 0) &&
                    <div>
                        <h4 style={{ textAlign: "left", margin: "20 px", color: "#2a3653" }}> Restrictions </h4>
                        <ul> {VendingRestrictionsLaws.map((law, i) => (<li key={i} style={{ textAlign: "left", color: "#2a3653" }}>{law.PROVISIONDESC}</li>))}</ul>
                    </div>
                }
                {(VendingEnformentLaws.length > 0) &&
                    <div>
                        <h4 style={{ textAlign: "left", margin: "20 px", color: "#2a3653" }}> Enforment </h4>
                        <ul> {VendingEnformentLaws.map((law, i) => (<li key={i} style={{ textAlign: "left", color: "#2a3653" }}>{law.PROVISIONDESC}</li>))}</ul>
                    </div>
                }
                {(SalesPenaltiesLaws.length > 0 || SalesRestrictionsLaws.length > 0 || SalesEnformentLaws.length > 0) &&
                    <h3 style={{textAlign: "left", margin: "20 px", color: "#2a3653" }}> Laws to Prevent Cigarette Sales to Youth </h3>
                }
                {(SalesPenaltiesLaws.length > 0) &&
                    <div>
                        <h4 style={{ textAlign: "left", margin: "20 px", color: "#2a3653" }}> Penalties </h4>
                        <ul> {SalesPenaltiesLaws.map((law, i) => (<li key={i} style={{ textAlign: "left", color: "#2a3653" }}>{law.PROVISIONDESC}</li>))}</ul>
                    </div>
                }
                {(SalesRestrictionsLaws.length > 0) &&
                    <div>
                        <h4 style={{ textAlign: "left", margin: "20 px", color: "#2a3653" }}> Restrictions </h4>
                        <ul> {SalesRestrictionsLaws.map((law, i) => (<li key={i} style={{ textAlign: "left", color: "#2a3653" }}>{law.PROVISIONDESC}</li>))}</ul>
                    </div>
                }
                {(SalesEnformentLaws.length > 0) &&
                    <div>
                        <h4 style={{ textAlign: "left", margin: "20 px", color: "#2a3653" }}> Enforment </h4>
                        <ul> {SalesEnformentLaws.map((law, i) => (<li key={i} style={{ textAlign: "left", color: "#2a3653" }}>{law.PROVISIONDESC}</li>))}</ul>
                    </div>
                }
                <h1 style={{ textAlign: "left", margin: "20 px", color: "#2a3653", textDecoration: "underline" }}> Raw Data: </h1>
                <DataGrid columns={coldata} rows={rowdata} />
            </div>
        );
    } else {
        return (
            <h3 style={{ color: "#2a3653", margin: "30px 40px" }}>
                No Results Found
            </h3>
        );
    }
}

export default DataViewer;
