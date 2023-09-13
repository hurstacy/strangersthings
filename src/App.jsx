
import './App.css';
import { RegisterUser } from './components/signUp';
import { Routes, Route } from "react-router-dom";
import Login from './components/login';

import PostsList from './components/PostsList'; // Update the path

function App() {
  return (
    <div>
      <div>
        <Routes>
          <Route path="/" element={<PostsList />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
