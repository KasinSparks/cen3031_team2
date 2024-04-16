import React, {useState, useEffect} from "react";
import "./Home.css";

function Feature1() {
  return (
    <div className="feature feature1">
      <div>
        This project seeks to allow medical professionals, lawmakers, and laymen
        alike to explore data related to youth tobacco use so that we may put an
        end to its use among young Americans. <br /> <br /> Users may bookmark
        datasets, search for particularities in the datasets, and suggest
        changes to the site administrators.
      </div>
      <div className="button">View Legislation Data</div>
      <div className="button">View Survey Data</div>
    </div>
  );
}

function Feature2() {
    const [prevFeedback, setPrevFeedback] = useState([]);

    useEffect(() => {
        fetch("/feedback/get/0")
            .then(res => res.json())
            .then(json => setPrevFeedback(json));
    }, []);


    var top_three = [];
    if (prevFeedback.length > 3) {
        top_three = prevFeedback.slice(0, 3);
    } else {
        top_three = prevFeedback;
    }

    const top_three_html = top_three.map((el) => 
        <div>
            {el["RATING"]} / 5
            <br />
            "{el["FEEDBACKTEXT"]}"
            <br />
            <i>- {el["FIRSTNAME"]} {el["LASTNAME"]}</i>
            <br /> <br />
        </div>
    );

    console.log(top_three_html);

  return (
    <div className="feature feature2">
      <div className="textbox">
          {top_three_html}
      </div>
    </div>
  );
}

function Home() {
  return (
    <body>
      <div className="Home">
        <div class="container">
          <Feature1 />
          <Feature2 />
        </div>
      </div>
    </body>
  );
}

export default Home;
