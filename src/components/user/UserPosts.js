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
            <table>
                <tr>
                    <th>Title</th>
                    <th>Username</th>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Tags</th>
                </tr>
            {posts.map((post) => {
            return (
                    <tr>
                        <Link to={`/posts/${post.id}`}>
                            <td>{post.title}</td>
                        </Link>
                        <td>{post.user.username}</td>
                        <td>{post.publication_date}</td>
                        <td>{post.category.label}</td>
                        <td>{post.tags}</td>
                    </tr>
            );
        })}
        </table>
        </article>
        </div>
    );
    };
