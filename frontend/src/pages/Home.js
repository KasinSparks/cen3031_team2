import React, {useState, useEffect} from "react";
import "./Home.css";

function Feature1() {
  return (
      <div className="feature feature1">
          <div>
              {/* Provides basic info on the project */}
              <h4>Our Project</h4>
              Tobacco Tracker utilizes data gathered from the Centers for Disease Control and Prevention (CDC) to
              provide
              users with information on youth tobacco access prevention laws for all U.S. jurisdictions. Additionally,
              where possible, users are given the option to pair legal data with survey data from the CDC’s Youth
              Tobacco
              Survey – a dataset on middle school and high school students regarding tobacco. Please see below for an
              overview of the inclusion criteria and currentness of each dataset.
              <h4>Youth Tobacco Access Prevent Laws</h4>
              This dataset includes “current and historical state-level legislative
              data on tobacco use prevention and control policies. Data is reported on a quarterly basis. Data includes
              information related to restrictions, enforcement and penalties associated with the sale of cigarettes to
              youth through retail sales and vending machines.” The dataset covers laws enacted between 1995 and 2024.
              It
              is current as of February 2024.
              <h4>Youth Tobacco Survey</h4>
              This dataset includes information on “both middle school and high school students
              regarding tobacco use, exposure to environmental tobacco smoke, smoking cessation, school curriculum,
              minors' ability to purchase or otherwise obtain tobacco products, knowledge and attitudes about tobacco,
              and
              familiarity with pro-tobacco and anti-tobacco media messages. The YTS uses a two-stage cluster sample
              design
              to produce representative samples of students in middle schools (grades 6–8) and high schools (grades
              9–12).
              The data for the STATE System were extracted from Youth Tobacco Surveys from participating states. Tobacco
              topics included are cigarette smoking prevalence, cigarette smoking frequency, smokeless tobacco products
              prevalence and quit attempts.” It covers survey responses from 1999 to 2017. It is current as of August
              2023
          </div>
          <br/>
          {/* Redirects user to relevant site upon click */}
          <a href="https://data.cdc.gov/Legislation/CDC-STATE-System-E-Cigarette-Legislation-Youth-Acc/8zea-kwnt/about_data">
              <button className="button">View Legislation Data</button>
          </a>
          <a href="https://data.cdc.gov/Survey-Data/Youth-Tobacco-Survey-YTS-Data/4juz-x2tp/about_data">
              <button className="button">View Survey Data</button>
          </a>
      </div>
);
}

function Feature2() {
    const [prevFeedback, setPrevFeedback] = useState([]);

    useEffect(() => {
        //fetch previous feedback to display to users
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
