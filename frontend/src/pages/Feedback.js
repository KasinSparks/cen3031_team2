import React, { useState, useEffect } from "react";
import "./Login.css";

function SubmitButton() {
    const [errmsg, setErrmsg] = useState("");

    function handleClick() {
        fetch("/feedback/add", {
            method: "POST",
            body: '{' +
                  '"rating":"' + document.getElementById("Rating").value + '",' +
                  '"text":"' + document.getElementById("FeedbackText").value + '"' +
                  '}'
        })
            .then(res => res.text())
            .then(text => setErrmsg(text))
            .catch(err => err);
    }

    return (
        <div>
            <button className="button" onClick={handleClick}>
                Submit
            </button>
            <div>
               <p>{errmsg}</p>
            </div>
        </div>
    );
}

function Feedback() {
    const [prevFeedback, setPrevFeedback] = useState([]);

    useEffect(() => {
        fetch("/login/get_user_id")
            .then(res => res.text())
            .then(text => {
                fetch("/feedback/get/" + text)
                    .then(res => res.json())
                    .then(json => setPrevFeedback(json));
        });
    }, []);


    const feedback_items = prevFeedback.map((el) => 
                <tr>
                  <td>{el["RATING"]}</td>
                  <td>{el["FEEDBACKTEXT"]}</td>
                  <td>{el["FEEDBACKTIME"]}</td>
                </tr>
        );

    
    return (
        <div>
            <div className="Login">
                <h3>Enter your rating:</h3>
                <label htmlFor="Rating">Enter you rating (1-5): </label>
                <input type="number" id="Rating" min="1" max="5"  />
                <h3>Enter your feedback:</h3>
                <textarea id="FeedbackText" rows="3" cols="80" />
            </div>
            <SubmitButton />
            <hr />
            <h3>Previous Feedback:</h3>
            <div align="center">
                <table>
                    <thead>
                    <tr>
                        <th>Rating</th>
                        <th>Feedback</th>
                        <th>Date</th>
                    </tr>
                    </thead>
                    <tbody>
                        {feedback_items}
                    </tbody>
                </table>
              </div>
        </div>
    );
}


export default Feedback;
