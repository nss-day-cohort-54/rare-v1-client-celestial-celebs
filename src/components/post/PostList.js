import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { getPosts, getPostsByCategoryId, deletePost } from "./PostManager";
import Post from "./Post";
import { getCategories } from "../categories/CategoriesManager";
import { DeleteDialogue } from "./PostModal";
import { useModal } from "./UseModal";
import { AuthorList } from "../search/AuthorDropdown";
import { getAllUsers, getPostsByUserId } from "../user/usersManager";

export const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category_id, setCategory_id] = useState(0);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const history = useHistory();
  const [currentPost, setCurrentPost] = useState();
  const [author, setAuthor] = useState(0)
  const [users, setUsers] = useState([])

  useEffect(() => {
    getAllUsers().then((data) => setUsers(data));
  }, []);

  const updateAuthorId = (event) => {
    setAuthor(parseInt(event.target.value));
  };

  const updateCategoryId = (event) => {
    setCategory_id(parseInt(event.target.value));
  };

  useEffect(() => {
    if (author){
      getPostsByUserId(author).then((data) => setFilteredPosts(data))
    } else if (category_id) {
      getPostsByCategoryId(category_id).then((data) => setFilteredPosts(data))
    }
    }, [author, category_id]);

  const { toggleDialogue, modalIsOpen } = useModal("delete-popup");

  useEffect(() => {
    getPosts().then((postData) => setPosts(postData));
  }, [currentPost]);

  // keyCode is esc key on keyboard, checking if modal is open if popup is open and user presses esc, box closes
  useEffect(() => {
    const handler = (event) => {
      if (event.keyCode === 27 && modalIsOpen) {
        toggleDialogue();
      }
    };
    window.addEventListener("keyup", handler);
    return () => {
      window.removeEventListener("keyup", handler);
    };
  }, [toggleDialogue, modalIsOpen]);

  const getAllPosts = () => {
    getPosts().then((postData = setPosts(postData)));
  };

  const onDeleteButtonClick = (postId) => {
    deletePost(postId).then(getAllPosts);
  };

  const confirmDelete = (post) => {
    setCurrentPost(post.id);
    toggleDialogue();
  };

  useEffect(() => {
    getCategories().then((data) => setCategories(data));
  }, []);




  return (
    <>
      
      <DeleteDialogue
        deletePostObject={currentPost}
        toggleDialogue={toggleDialogue}
        setCurrentPost={setCurrentPost}
      />
      <div style={{ margin: "0rem 3rem" }}>
        
        <h1 className="posts-list">Posts</h1>

        {/* <button onClick={() => history.push("/posts/create")}>Add Post</button> */}
        <div className="parent-dropdown">
            <AuthorList posts={posts} author={author} users={users} updateAuthorId={updateAuthorId}/>
        <div className="dropdown_container">
          <div className="control">
            <select
              className="category_dropdown"
              name="category_id"
              value={category_id}
              onChange={updateCategoryId}
            >
              <option name="category_id" value="">
                Select a category
              </option>
              {categories?.map((category, index) => {
                return (
                  <option key={index} name="category_id" value={category.id}>
                    {category.label}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        </div>
        <article className="posts">
          {category_id === 0 && author === 0
            ? posts?.map((post) => {
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
        {/* <button onClick={() => history.push("/posts/create")}>Add Post</button> */}
        {/*if the user is logged in on /my-posts, they should be able to delete a post
          and a message that displays "are you sure you want to delete this post" should appear  */}
        {/* {posts.map((post) => {
          return (
            <>
              <div className="panel-block">
                <Post
                  key={post.id}
                  post={post}
                  user={post.user_id}
                  confirmDelete={confirmDelete}
                />
              </div>
            </>
          );
        })} */}
      </div>
    </>
  );
};
