import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { getPosts, getPostsByCategoryId } from "./PostManager";
import Post from "./Post";
import { getCategories } from "../categories/CategoriesManager";

export const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([])
  const [category_id, setCategory_id] = useState(0)
  const [filteredPosts, setFilteredPosts] = useState([])
  const history = useHistory();

  useEffect(() => {
    getPosts().then((postData) => setPosts(postData));
  }, []);

  useEffect(() => {
    getCategories().then((data) => setCategories(data));
  }, []);

  useEffect(() => {
    getPostsByCategoryId(category_id).then(data => setFilteredPosts(data))
  }, [category_id]);

  const updateCategoryId = (event) => {
    setCategory_id(event.target.value)
  }

  return (
    <div style={{ margin: "0rem 3rem" }}>
      <h1>Posts</h1>

      {/* <button onClick={() => history.push("/posts/create")}>Add Post</button> */}
      <div className="dropdown_container">
        <div className="control">
          <select className="category_dropdown"
            name="category_id"
            value={category_id}
            onChange={updateCategoryId}>
            <option name="category_id" value="" >Select a category</option>
            {
              categories?.map((category, index) => {
                return <option key={index} name="category_id" value={category.id}>{category.label}</option>
              })
            }
          </select>
        </div>
      </div>
      <article className="posts">
        {category_id === 0?
        posts?.map((post) => {
          return (
            <section className="post" key={post.id}>
              <Link to={`/posts/${post.id}`}>
                <h3>{post.title}</h3>
              </Link>
              <h3>{post.user_id}</h3>
              <h3>{post.category.label}</h3>
            </section>
          );
        })
        :
        filteredPosts?.map((post) => {
          return (
            <section className="post" key={post.id}>
              <Link to={`/posts/${post.id}`}>
                <h3>{post.title}</h3>
              </Link>
              <h3>{post.user_id}</h3>
              <h3>{post.category.label}</h3>
            </section>
          );
        })}
      </article>
    </div>
  );
};
