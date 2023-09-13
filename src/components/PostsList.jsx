import { useState, useEffect } from 'react';
import { fetchPostsData } from './api';
import { Routes, Route, Link } from "react-router-dom";

function PostsList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const fetchedPosts = await fetchPostsData();
      setPosts(fetchedPosts);
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1><Link to="/login" className="login">Log in</Link></h1>
      <h1><Link to="/register" className="register">Register</Link></h1>
      {posts.map((post) => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
        </div>
      ))}
    </div>
  );
}

export default PostsList;
