import { useState } from "react";
import { useNavigate } from "react-router-dom";

const COHORT_NAME = '2302-ACC-PT-WEB-PT-A';
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [token, setToken] = useState("");
  
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
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

        console.log("User logged in successfully with token:", userToken);
        navigate("/");
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
      <h2>Log in</h2>
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