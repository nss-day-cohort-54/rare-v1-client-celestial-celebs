import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { getUserPosts } from "../post/PostManager";
import {BsFillPencilFill} from "react-icons/bs"
import "./UserPosts.css"

// function shows all user posts specific to logged in user
export const UserPostList = () => {
    const [posts, setPosts] = useState([]);
    const history = useHistory();
    const userId = parseInt(localStorage.getItem('token'))
    // gets all posts from specific user_id
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
                    {/* map out all posts with edit button links to edit post, and post name links to post detail page */}
                {posts.map((post) => {
                return (
                        <tr>
                            <Link className="edit" to={`/edit/${post.id}`}>{BsFillPencilFill()}</Link>
                            <Link to={`/posts/${post.id}`}><td>{post.title}</td></Link>
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
