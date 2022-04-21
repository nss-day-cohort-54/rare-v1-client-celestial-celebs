import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { createPost, getPosts } from "./PostManager"
import { getCategories } from "../categories/CategoriesManager";
import "./Post.css"


export const PostForm = () => {
    const [categories, setCategories] = useState([])
    const [posts, setPosts] = useState([])
    const [post, setPost] = useState({
        title: "",
        content: "",
        user_id: localStorage.getItem("token"),
        category_id: 1,
        publication_date: Date(Date.now()).toLocaleString('en-us').split('GMT')[0]
    })
    const history = useHistory()

    useEffect(
        () => {
            getCategories()
                .then(data => setCategories(data))
        }, []
    )

    useEffect(
        () => {
            getPosts()
                .then(data => setPosts(data))
        }, []
    )


    const changePostState = (event) => {
        const newPost = Object.assign({}, post)
        newPost[event.target.name] = event.target.value
        setPost(newPost)
    }

    const handleSubmit = (e) => {
        const lastIndex = posts.length - 1
        const lastPostId = posts[lastIndex].id
        newPost = {
            user_id: parseInt(post.user_id),
            category_id: parseInt(category_id),
            title: post.title,
            publication_date: post.publication_date,
            content: post.content
        }

        createPost(newPost)
            .then(getPosts)
            .then(() => history.push(`/posts/${lastPostId}`))
    }


    return (
        <section className="post_form_container">
            <form className="post_form" >
                <h1 className="title">New Post</h1>
                <div className="field">
                    <div className="control">
                        <input className="post_title" type="text" name="title" placeholder="title" value={post.title} onChange={changePostState} />
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <input className="post_content" type="text" name="content" placeholder="Article content" value={post.content} onChange={changePostState} />
                    </div>
                </div>
                <div>
                    <select className="form-control"
                        name="category_id"
                        value={post.category_id}
                        placeholder="Category Select"
                        onChange={changePostState}>
                        {
                            categories?.map((category, index) => {
                                return <option key={index} name="category_id" value={category.id}>{category.label}</option>
                            })
                        }
                    </select>
                </div>
                <div className="form_button">
                    <div className="control">
                        <button className="category_button" type="submit" onClick={handleSubmit}>Create</button>
                    </div>
                </div>
            </form>
        </section>
    )
}