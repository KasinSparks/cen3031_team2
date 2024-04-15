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
        const VendingPenaltiesLaws = rowdata.filter(currRow => currRow.measureDesc === "Cigarette Vending Machines" && currRow.provisionGroupDesc === "Penalties" && currRow.provisionValue !== "No Provision" && currRow.provisionDesc !== "Penalty to Youth (Type)" && currRow.provisionDesc !== "Penalty to Business (Type)" && currRow.provisionDesc !== "Penalty to Youth" && currRow.provisionDesc !== "Penalty to Business");
        const VendingRestrictionsLaws = rowdata.filter(currRow => currRow.measureDesc === "Cigarette Vending Machines" && currRow.provisionGroupDesc === "Restrictions" && currRow.provisionValue !== "No Provision" && currRow.provisionDesc !== "Minimum Age" && currRow.provisionDesc !== "Purchase Prohibited");
        const VendingEnformentLaws = rowdata.filter(currRow => currRow.measureDesc === "Cigarette Vending Machines" && currRow.provisionGroupDesc === "Enforcement" && currRow.provisionValue !== "No Provision" && currRow.provisionDesc !== "Enforcement Authority");
        const SalesPenaltiesLaws = rowdata.filter(currRow => currRow.measureDesc === "Cigarette Sales" && currRow.provisionGroupDesc === "Penalties" && currRow.provisionValue !== "No Provision" && currRow.provisionDesc !== "Penalty to Youth (Type)" && currRow.provisionDesc !== "Penalty to Business (Type)" && currRow.provisionDesc !== "Penalty to Youth" && currRow.provisionDesc !== "Penalty to Business");
        const SalesRestrictionsLaws = rowdata.filter(currRow => currRow.measureDesc === "Cigarette Sales" && currRow.provisionGroupDesc === "Restrictions" && currRow.provisionValue !== "No Provision" && currRow.provisionDesc !== "Minimum Age" && currRow.provisionDesc !== "Purchase Prohibited");
        const SalesEnformentLaws = rowdata.filter(currRow => currRow.measureDesc === "Cigarette Sales" && currRow.provisionGroupDesc === "Enforcement" && currRow.provisionValue !== "No Provision" && currRow.provisionDesc !== "Enforcement Authority");

        // Iterates through values in VendingPenaltiesLaws array and converts provisionDesc value into display-ready content.
        for (let i = 0; i < VendingPenaltiesLaws.length; i++) {
            if (VendingPenaltiesLaws[i].provisionDesc === "Maximum Penalty ($)") {
                VendingPenaltiesLaws[i].provisionDesc = "Vending machine operators found in violation of youth tobacco access prevention laws may receive a maximum penalty of $" + VendingPenaltiesLaws[i].provisionValue + ". (See " + VendingPenaltiesLaws[i].citation + ")"
            }
            else if (VendingPenaltiesLaws[i].provisionDesc === "License Suspension or Revocation" && VendingPenaltiesLaws[i].provisionValue === "Both") {
                VendingPenaltiesLaws[i].provisionDesc = "Vending machine operators found in violation of youth tobacco access prevention laws shall be subject to license suspension and may be subject to license revocation. (See " + VendingPenaltiesLaws[i].citation + ")"
            }
            else if (VendingPenaltiesLaws[i].provisionDesc === "Minimum Penalty ($)") {
                VendingPenaltiesLaws[i].provisionDesc = "Vending machine operators found in violation of youth tobacco access prevention laws must receive a minimum penalty of at least $" + VendingPenaltiesLaws[i].provisionValue + ". (See " + VendingPenaltiesLaws[i].citation + ")"
            }
            else if (VendingPenaltiesLaws[i].provisionDesc === "Maximum Penalty to Youth ($)") {
                VendingPenaltiesLaws[i].provisionDesc = "Any youth found in violation of tobacco vending machine laws may receive a maximum penalty of $" + VendingPenaltiesLaws[i].provisionValue + ". (See " + VendingPenaltiesLaws[i].citation + ")"
            }
            else if (VendingPenaltiesLaws[i].provisionDesc === "Minimum Penalty to Youth ($)") {
                VendingPenaltiesLaws[i].provisionDesc = "Any youth found in violation of tobacco vending machine laws must receive a minimum penalty of at least " + VendingPenaltiesLaws[i].provisionValue + ". (See " + VendingPenaltiesLaws[i].citation + ")"
            }
        }
        // Iterates through values in VendingRestrictionsLaws array and converts provisionDesc value into display-ready content.
        for (let i = 0; i < VendingRestrictionsLaws.length; i++) {
            if (VendingRestrictionsLaws[i].provisionDesc === "Supervision" && VendingRestrictionsLaws[i].provisionValue === "Yes") {
                VendingRestrictionsLaws[i].provisionDesc = "Minors must be supervised while in the vicinity of a tobacco vending machine. (See " + VendingRestrictionsLaws[i].citation + ")"
            }
            else if (VendingRestrictionsLaws[i].provisionDesc === "Minimum Age (Years)") {
                VendingRestrictionsLaws[i].provisionDesc = "State law prohibits the purchase of tobacco products by individuals under the age of " + VendingRestrictionsLaws[i].provisionValue + "(See " + VendingRestrictionsLaws[i].citation + ")"
            }
            else if (VendingRestrictionsLaws[i].provisionDesc === "Restriction on Access" && VendingRestrictionsLaws[i].provisionValue === "Yes") {
                VendingRestrictionsLaws[i].provisionDesc = "Minors face restrictions when entering locations with tobacco vending machines. (See " + VendingRestrictionsLaws[i].citation + ")"
            }
            else if (VendingRestrictionsLaws[i].provisionDesc === "Banned from Location" && VendingRestrictionsLaws[i].provisionValue === "Yes") {
                VendingRestrictionsLaws[i].provisionDesc = "Minors are prohibited from entering locations with tobacco vending machines. (See " + VendingRestrictionsLaws[i].citation + ")"
            }
            else if (VendingRestrictionsLaws[i].provisionDesc === "Possession Prohibited" && VendingRestrictionsLaws[i].provisionValue === "Yes") {
                VendingRestrictionsLaws[i].provisionDesc = "Minors are prohibited from possessing tobacco producs. (See " + VendingRestrictionsLaws[i].citation + ")"
            }
            else if (VendingRestrictionsLaws[i].provisionDesc === "Use Prohibited" && VendingRestrictionsLaws[i].provisionValue === "Yes") {
                VendingRestrictionsLaws[i].provisionDesc = "Minors are prohibited from using tobacco producs. (See " + VendingRestrictionsLaws[i].citation + ")"
            }
            else if (VendingRestrictionsLaws[i].provisionDesc === "Limited Placement" && VendingRestrictionsLaws[i].provisionValue === "Yes") {
                VendingRestrictionsLaws[i].provisionDesc = "Cigarette vending machines may only be placed in limited areas. (See " + VendingRestrictionsLaws[i].citation + ")"
            }
            else if (VendingRestrictionsLaws[i].provisionDesc === "Locking Device" && VendingRestrictionsLaws[i].provisionValue === "Yes") {
                VendingRestrictionsLaws[i].provisionDesc = "Cigarette vending machines must utilize locking devices. (See " + VendingRestrictionsLaws[i].citation + ")"
            }
        }
        // Iterates through values in VendingEnformentLaws array and converts provisionDesc value into display-ready content.
        for (let i = 0; i < VendingEnformentLaws.length; i++)
        {
            if (VendingEnformentLaws[i].provisionDesc === "Enforcement (Type)") {
                VendingEnformentLaws[i].provisionDesc = "Laws are enforced by: " + VendingEnformentLaws[i].provisionValue + ". (See " + VendingEnformentLaws[i].citation + ")"
            }
            else if (VendingEnformentLaws[i].provisionDesc === "Signage Required" && VendingEnformentLaws[i].provisionValue === "Yes") {
                VendingEnformentLaws[i].provisionDesc = "Signage warnings of legal requirements must be displayed in the vicinity of all tobacco vending machines. (See " + VendingEnformentLaws[i].citation + ")"
            }
        }
        // Iterates through values in SalesPenaltiesLaws array and converts provisionDesc value into display-ready content.
        for (let i = 0; i < SalesPenaltiesLaws.length; i++) {
            if (SalesPenaltiesLaws[i].provisionDesc === "Maximum Penalty to Business ($)") {
                SalesPenaltiesLaws[i].provisionDesc = "Retail tobacco establishments found in violation of youth tobacco access prevention laws may receive a maximum penalty of $" + SalesPenaltiesLaws[i].provisionValue + ". (See " + SalesPenaltiesLaws[i].citation + ")"
            }
            else if (SalesPenaltiesLaws[i].provisionDesc === "License Suspension or Revocation" && SalesPenaltiesLaws[i].provisionValue === "Both") {
                SalesPenaltiesLaws[i].provisionDesc = "Retail tobacco establishments found in violation of youth tobacco access prevention laws shall be subject to license suspension and may be subject to license revocation. (See " + SalesPenaltiesLaws[i].citation + ")"
            }
            else if (SalesPenaltiesLaws[i].provisionDesc === "Minimum Penalty to Business ($)") {
                SalesPenaltiesLaws[i].provisionDesc = "Retail tobacco establishments found in violation of youth tobacco access prevention laws must receive a minimum penalty of at least $" + SalesPenaltiesLaws[i].provisionValue + ". (See " + SalesPenaltiesLaws[i].citation + ")"
            }
            else if (SalesPenaltiesLaws[i].provisionDesc === "Maximum Penalty to Youth ($)") {
                SalesPenaltiesLaws[i].provisionDesc = "Any youth found in violation of tobacco sales laws may receive a maximum penalty of $" + SalesPenaltiesLaws[i].provisionValue + ". (See " + SalesPenaltiesLaws[i].citation + ")"
            }
            else if (SalesPenaltiesLaws[i].provisionDesc === "Minimum Penalty to Youth ($)") {
                SalesPenaltiesLaws[i].provisionDesc = "Any youth found in violation of tobacco sales laws must receive a minimum penalty of at least " + SalesPenaltiesLaws[i].provisionValue + ". (See " + SalesPenaltiesLaws[i].citation + ")"
            }
        }
        // Iterates through values in SalesRestrictionsLaws array and converts provisionDesc value into display-ready content.
        for (let i = 0; i < SalesRestrictionsLaws.length; i++) {
            if (SalesRestrictionsLaws[i].provisionDesc === "Supervision" && SalesRestrictionsLaws[i].provisionValue === "Yes") {
                SalesRestrictionsLaws[i].provisionDesc = "Minors must be supervised while in retail tobacco establishments. (See " + SalesRestrictionsLaws[i].citation + ")"
            }
            else if (SalesRestrictionsLaws[i].provisionDesc === "Minimum Age (Years)") {
                SalesRestrictionsLaws[i].provisionDesc = "State law prohibits the purchase of tobacco products by individuals under the age of " + SalesRestrictionsLaws[i].provisionValue + ". (See " + SalesRestrictionsLaws[i].citation + ")"
            }
            else if (SalesRestrictionsLaws[i].provisionDesc === "Restriction on Access" && SalesRestrictionsLaws[i].provisionValue === "Yes") {
                SalesRestrictionsLaws[i].provisionDesc = "Minors face restrictions when entering retail tobacco establishments. (See " + SalesRestrictionsLaws[i].citation + ")"
            }
            else if (SalesRestrictionsLaws[i].provisionDesc === "Banned from Location" && SalesRestrictionsLaws[i].provisionValue === "Yes") {
                SalesRestrictionsLaws[i].provisionDesc = "Minors are prohibited from entering retail tobacco establishments. (See " + SalesRestrictionsLaws[i].citation + ")"
            }
            else if (SalesRestrictionsLaws[i].provisionDesc === "Possession Prohibited" && SalesRestrictionsLaws[i].provisionValue === "Yes") {
                SalesRestrictionsLaws[i].provisionDesc = "Minors are prohibited from possessing tobacco producs. (See " + SalesRestrictionsLaws[i].citation + ")"
            }
            else if (SalesRestrictionsLaws[i].provisionDesc === "Use Prohibited" && SalesRestrictionsLaws[i].provisionValue === "Yes") {
                SalesRestrictionsLaws[i].provisionDesc = "Minors are prohibited from using tobacco producs. (See " + SalesRestrictionsLaws[i].citation + ")"
            }
            else if (SalesRestrictionsLaws[i].provisionDesc === "Limited Placement" && SalesRestrictionsLaws[i].provisionValue === "Yes") {
                SalesRestrictionsLaws[i].provisionDesc = "Retail tobacco establishments may only be located in limited areas. (See " + SalesRestrictionsLaws[i].citation + ")"
            }
            else if (SalesRestrictionsLaws[i].provisionDesc === "Locking Device" && SalesRestrictionsLaws[i].provisionValue === "Yes") {
                SalesRestrictionsLaws[i].provisionDesc = "Retail tobacco establishments must utilize locking devices. (See " + SalesRestrictionsLaws[i].citation + ")"
            }
        }
        // Iterates through values in SalesEnformentLaws array and converts provisionDesc value into display-ready content.
        for (let i = 0; i < SalesEnformentLaws.length; i++) {
            if (SalesEnformentLaws[i].provisionDesc === "Enforcement (Type)") {
                SalesEnformentLaws[i].provisionDesc = "Laws are enforced by: " + SalesEnformentLaws[i].provisionValue + ". (See " + SalesEnformentLaws[i].citation + ")"
            }
            else if (SalesEnformentLaws[i].provisionDesc === "Signage Required" && SalesEnformentLaws[i].provisionValue === "Yes") {
                SalesEnformentLaws[i].provisionDesc = "Commercial tobacco venders must display signage warnings of legal requirements (See " + SalesEnformentLaws[i].citation + ")"
            }
        }

        // Returns the contents of all six arrays (and associated headers) as well as a table of raw data.
        return (
            <div style={{ margin: "30px 40px", height: "100%" }}>
                {(SalesPenaltiesLaws.length > 0 || SalesRestrictionsLaws.length > 0 || SalesEnformentLaws.length > 0 || VendingPenaltiesLaws.length > 0 || VendingRestrictionsLaws.length > 0 || VendingEnformentLaws.length > 0) &&
                    <h1 style={{ textAlign: "left", margin: "20 px", color: "#2a3653", textDecoration: "underline" }}> Overview of Applicable {rowdata[0].stateName} Laws: </h1>
                }
                {(VendingPenaltiesLaws.length > 0 || VendingRestrictionsLaws.length > 0 || VendingEnformentLaws.length > 0) &&
                    <h3 style={{textAlign: "left", margin: "20 px", color: "#2a3653" }}> Laws to Prevent Youth Access to Cigarette Vending Machines </h3>
                }
                {(VendingPenaltiesLaws.length > 0) &&
                    <div>
                    <h4 style={{ textAlign: "left", margin: "20 px", color: "#2a3653" }}> Penalties </h4>
                    <ul> {VendingPenaltiesLaws.map((law, i) => (<li key={i} style={{ textAlign: "left", color: "#2a3653" }}>{law.provisionDesc}</li>))}</ul>
                    </div>
                }
                {(VendingRestrictionsLaws.length > 0) &&
                    <div>
                        <h4 style={{ textAlign: "left", margin: "20 px", color: "#2a3653" }}> Restrictions </h4>
                        <ul> {VendingRestrictionsLaws.map((law, i) => (<li key={i} style={{ textAlign: "left", color: "#2a3653" }}>{law.provisionDesc}</li>))}</ul>
                    </div>
                }
                {(VendingEnformentLaws.length > 0) &&
                    <div>
                        <h4 style={{ textAlign: "left", margin: "20 px", color: "#2a3653" }}> Enforment </h4>
                        <ul> {VendingEnformentLaws.map((law, i) => (<li key={i} style={{ textAlign: "left", color: "#2a3653" }}>{law.provisionDesc}</li>))}</ul>
                    </div>
                }
                {(SalesPenaltiesLaws.length > 0 || SalesRestrictionsLaws.length > 0 || SalesEnformentLaws.length > 0) &&
                    <h3 style={{textAlign: "left", margin: "20 px", color: "#2a3653" }}> Laws to Prevent Cigarette Sales to Youth </h3>
                }
                {(SalesPenaltiesLaws.length > 0) &&
                    <div>
                        <h4 style={{ textAlign: "left", margin: "20 px", color: "#2a3653" }}> Penalties </h4>
                        <ul> {SalesPenaltiesLaws.map((law, i) => (<li key={i} style={{ textAlign: "left", color: "#2a3653" }}>{law.provisionDesc}</li>))}</ul>
                    </div>
                }
                {(SalesRestrictionsLaws.length > 0) &&
                    <div>
                        <h4 style={{ textAlign: "left", margin: "20 px", color: "#2a3653" }}> Restrictions </h4>
                        <ul> {SalesRestrictionsLaws.map((law, i) => (<li key={i} style={{ textAlign: "left", color: "#2a3653" }}>{law.provisionDesc}</li>))}</ul>
                    </div>
                }
                {(SalesEnformentLaws.length > 0) &&
                    <div>
                        <h4 style={{ textAlign: "left", margin: "20 px", color: "#2a3653" }}> Enforment </h4>
                        <ul> {SalesEnformentLaws.map((law, i) => (<li key={i} style={{ textAlign: "left", color: "#2a3653" }}>{law.provisionDesc}</li>))}</ul>
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
