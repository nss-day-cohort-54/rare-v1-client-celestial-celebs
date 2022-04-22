import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { getUserPosts } from "../post/PostManager";
import "./UserPosts.css"
export const UserPostList = () => {
    const [posts, setPosts] = useState([]);
    const history = useHistory();
    
    const userId = parseInt(localStorage.getItem('token'))
    
    useEffect(() => {
        getUserPosts(userId).then((postData) => setPosts(postData));
    }, []);

    return (
        <div style={{ margin: "0rem 3rem" }}>
        <h1>My Posts</h1>


        <article className="user-posts">
            {posts.map((post) => {
            return (
                <section className="user-post" key={post.id}>
                <Link to={`/posts/${post.id}`}>
                    <h3>{post.title}</h3>
                </Link>
                    <h3>{post.user.username}</h3>
                    <h3>{post.publication_date}</h3>
                    <h3>{post.category.label}</h3>
                    <h3>{post.tags}</h3>
                </section>
            );
            })}
        </article>
        </div>
    );
    };
