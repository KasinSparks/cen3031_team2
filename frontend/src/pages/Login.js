import React, { useState, useEffect } from "react";
import "./Login.css";

function Login() {
  // State to hold the value of the username input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errmsg, setErrmsg] = useState("");
  const [isloggedin, setIsloggedin] = useState(false);

  // Function to handle changes in the input value
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  function loginUser() {
     fetch("/login", {
        method: "POST",
        body: '{"email":"' + email + '",' + '"password":"' + password + '"}'
     })
      .then(res => res.text())
      .then(text => { setErrmsg(text); isLoggedIn(); });
  }

  function logoutUser() {
    fetch("/logout")
      .then(res => res.text())
      .then(text => setIsloggedin(text === "200" ? false : true));
  }

  useEffect(() => {
      isLoggedIn();
  }, [isloggedin]);

  function isLoggedIn() {
    fetch("/login/get_user_id")
      .then(res => res.text())
      .then(text => {
          setIsloggedin(text === "None" ? false : true)
      });
  }

  function createUser() {
    fetch("/login/create", {
        method: "POST",
        body: '{' +
              '"email":"' + document.getElementById("new-email").value + '",' +
              '"password":"' + document.getElementById("new-password").value + '",' +
              '"fname":"' + document.getElementById("fname").value + '",' +
              '"lname":"' + document.getElementById("lname").value + '"' +
              '}'
    })
        .then(res => res.text())
        .then(text => {
            setErrmsg(text);
            setIsloggedin(text === "None" ? false : true);
        })
        .catch(err => err);
  }
 
  if (isloggedin) {
    return (
        <body>
          <div className="Login">
            <h1>Logout</h1>
          </div>
          <LoginErrorMsg msg={errmsg} />
          <br />
          <div>
            <input type="button" id="login-button" onClick={logoutUser} value="Logout" />
          </div>
        </body>
    );
  } else {
      return (
        <body>
          <div className="Login">
            <h1>Login</h1>
          </div>
          <div>
            <label htmlFor="email">Email: </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
            />
          </div>
          <br />
          <div>
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
            />
          </div>
          <LoginErrorMsg msg={errmsg} />
          <br />
          <div>
            <input type="button" id="login-button" onClick={loginUser} value="Login" />
          </div>
          <br /><br />
          <div className="Login">
            <h1>Register</h1>
          </div>
          <div>
            <label htmlFor="new-email">Email: </label>
            <input
              type="text"
              id="new-email"
              placeholder="Enter your email"
            />
          </div>
          <br />
          <div>
            <label htmlFor="fname">First Name: </label>
            <input
              type="text"
              id="fname"
              placeholder="Enter your first name"
            />
          </div>
          <br />
          <div>
            <label htmlFor="lname">Last Name: </label>
            <input
              type="text"
              id="lname"
              placeholder="Enter your last name"
            />
          </div>
          <br />
          <div>
            <label htmlFor="new-password">Password: </label>
            <input
              type="password"
              id="new-password"
              placeholder="Enter your password"
            />
          </div>
          <br />
          <div>
            <input type="button" id="create-user-button" onClick={createUser} value="Create" />
          </div>
        </body>
      );
  }
}

function LoginErrorMsg({msg}) {
    if (msg !== "") {
        return (
          <>
              <br />
              <div>
                <p color="red">{msg}</p>
              </div>
          </>
        );
    } else {
        return;
    }
}

export default Login;