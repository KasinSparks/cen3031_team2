import React from "react";
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
  return (
    <div className="feature feature2">
      <div className="textbox">
        "Great bookmark feature!" <br />
        <i>-User 1</i>
        <br /> <br />
        "Extremely useful datasets." <br />
        <i>-User 2</i>
        <br /> <br />
        "Very responsive to feedback." <br />
        <i>-User 3</i>
        <br /> <br />
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
