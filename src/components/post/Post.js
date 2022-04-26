import React from "react";
// import "./Posts.css";
import { Link } from "react-router-dom";

export default ({ post, confirmDelete }) => (
  <section className="post">
    <h3 className="post__title">
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </h3>
    <div className="post__author">{post.user_id}</div>
    <div className="post__category">{post.category.label}</div>
    <button
      onClick={() => {
        confirmDelete(post);
      }}
    >
      Delete
    </button>
  </section>
);
