import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getCategories } from "../categories/CategoriesManager";
import { editPost, getPosts, getSinglePost } from "../post/PostManager";
import "../post/Post.css"
import { getAllPostTags, getAllTags } from "../tags/tagsManager";

// function allows user to edit content of post
export const EditPost = () => {
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const [selectedTags, setSelectedTags] = useState([])
    const history = useHistory()
    const postId = useParams()
    const [post, setPost] = useState()

    useEffect(
        () => {
            getCategories()
                .then(data => setCategories(data))
        }, []
    )

    useEffect(
        () => {
            getSinglePost(postId.postId)
                .then(data => setPost(data))
        }, []
    )

    useEffect(
        () => {
            getAllTags()
                .then(data => setTags(data))
        }, []
    )

    useEffect(
        () => {
            let tagIdArray = post?.tags.map(tag => tag.id)
            setSelectedTags(tagIdArray)
        }, [post]
    )


    const changePostState = (event) => {
        const newPost = Object.assign({}, post)
        newPost[event.target.name] = event.target.value
        setPost(newPost)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newPost = {
            id: post.id,
            user_id: parseInt(post.user_id),
            category_id: parseInt(post.category_id),
            title: post.title,
            publication_date: post.publication_date,
            content: post.content
        }
        newPost.tags = selectedTags
        editPost(newPost)
            .then(getPosts)
            .then(() => history.push(`/posts/${postId.postId}`))
    }

    const handleOnChange = (tag) => {
        const copy = [...selectedTags]
        if (copy.includes(tag)) {
            copy.splice(copy.indexOf(tag), 1)
        }
        else {
            copy.push(tag)
        }
        setSelectedTags(copy)
    }

    return (
        post && tags ?
            <section className="post_form_container">
                <form className="post_form" >
                    <h1 className="formTitle">Edit Post</h1>
                    <div className="title_field">
                        <div className="title_control">
                            <input className="post_title" type="text" name="title" placeholder={post.title} value={post.title} onChange={changePostState} />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <textarea className="post_content" type="text" name="content" placeholder="Article content" value={post.content} onChange={changePostState} />
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="tags" className="label">Tags: </label>
                        <ul className="tagBoxes">
                            {
                                tags?.map((tag, index) => {
                                    return <li className="tagCheck" key={index}>
                                        <label htmlFor={tag.label} className="tag_label">{tag.label} </label>
                                        <div className="control">
                                            <input
                                                type="checkbox"
                                                name={tag.label}
                                                id={`custom-checkbox-${index}`}
                                                value={tag.id}
                                                className={tag.label}
                                                checked={selectedTags?.includes(tag.id)}
                                                onChange={() => handleOnChange(tag.id)}
                                            ></input>
                                        </div>
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                    <div className="dropdown_container">
                        <div className="control">
                            <select className="category_dropdown"
                                name="category_id"
                                value={post.category_id}
                                onChange={changePostState}>
                                <option name="category_id" value="" >Select a category</option>
                                {
                                    categories?.map((category, index) => {
                                        return <option key={index} name="category_id" value={category.id}>{category.label}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="publishForm_button">
                        <div className="control">
                            <button className="publish_button" type="submit" onClick={handleSubmit}>Save</button>
                        </div>
                    </div>
                </form>
            </section>
            : ""
    )
}