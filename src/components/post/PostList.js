import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getPosts } from "./PostManager";
import Post from "./Post";

export const PostList = () => {
  const [posts, setPosts] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getPosts().then((postData) => setPosts(postData));
  }, []);

  return (
    <div style={{ margin: "0rem 3rem" }}>
      <h1>Posts</h1>

      {/* <button onClick={() => history.push("/posts/create")}>Add Post</button> */}

      <article className="posts">
        {posts.map((post) => {
          return (
            <section className="post" key={post.id}>
              <Link to={`/posts/${post.id}`}>
                <h3>{post.title}</h3>
                <h3>{post.user_id}</h3>
                <h3>{post.category}</h3>
              </Link>
            </section>
          );
        })}
      </article>
    </div>
  );
};