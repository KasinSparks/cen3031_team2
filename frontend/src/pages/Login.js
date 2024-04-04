import React, { useState } from "react";
import "./Login.css";

function Login() {
  // State to hold the value of the username input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle changes in the input value
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

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
          type="text"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter your password"
        />
      </div>
    </body>
  );
}

export default Login;
