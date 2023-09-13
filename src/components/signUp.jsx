
const COHORT_NAME = '2302-ACC-PT-WEB-PT-A'
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`

import { useState } from "react";

export function RegisterUser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(""); // Define token and setToken here
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/users/register`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            username: username,
            password: password
          }
        })
      });

      if (response.ok) {
        const result = await response.json();
        const userToken = result.data.token;

        // Store the token in state and sessionStorage
        setToken(userToken);
        sessionStorage.setItem('token', userToken);

        console.log("User registered successfully with token:", userToken);
      } else {
        const errorData = await response.json();
        setError(errorData.error.message);
        console.error("Registration failed:", errorData.error.message);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <h2>Sign Up</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:{" "}
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <p></p>
        <label>
          Password:{" "}
          <input
            type="password"
            value={password}
            required
            minLength="8"
            maxLength="14"
            onChange={(e) => setPassword(e.target.value)}
          />
          
        </label>
        <p></p>
        <button>Submit</button>
      </form>
    </>
  );
}



export function Authenticate() {
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  async function handleClick() {
    const storedToken = sessionStorage.getItem('token');
  
    if (!storedToken) {
      setError("Token not found in sessionStorage. Please register first.");
      return;
    }
  
    try {
      const response = await fetch(`${BASE_URL}/authenticate`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedToken}`
        },
        body: JSON.stringify({ /* whatever things you need to send to the API */ })
      });
  
      if (response.ok) {
        const result = await response.json();
        setSuccessMessage(result.message);
        console.log("Authentication success:", result.message);
      } else {
        const errorData = await response.json();
        setError(errorData.error.message);
        console.error("Authentication failed:", errorData.error.message);
      }
    } catch (error) {
      setError(error.message);
    }
  }
  

  return (
    <div>
      <h2>Authenticate</h2>
      {successMessage && <p>{successMessage}</p>}
      {error && <p>{error}</p>}
      <button onClick={handleClick}>Blast off!</button>
    </div>
  );
}


