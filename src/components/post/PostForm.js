import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { createPost, getPosts } from "./PostManager"
import { getCategories } from "../categories/CategoriesManager";
import "./Post.css"
import { getAllTags } from "../tags/tagsManager";


export const PostForm = () => {
    const [categories, setCategories] = useState([])
    const [posts, setPosts] = useState([])
    const [tags, setTags] = useState([])
    const [checkedTags, setCheckedTags] = useState([])
    const [checkedState, setCheckedState] = useState(
        new Array(tags?.length).fill(false)
    )
    const [post, setPost] = useState({
        title: "",
        content: "",
        user_id: localStorage.getItem("token"),
        category_id: "",
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

    useEffect(
        () => {
            getAllTags()
                .then(data => setTags(data))
        }, []
    )

    useEffect(
        () => {
            setCheckedState(new Array(tags?.length).fill(false))
        }, [tags]
    )


    const changePostState = (event) => {
        const newPost = Object.assign({}, post)
        newPost[event.target.name] = event.target.value
        setPost(newPost)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const lastIndex = posts.length - 1
        const lastPostId = posts[lastIndex].id + 1
        const newPost = {
            user_id: parseInt(post.user_id),
            category_id: parseInt(post.category_id),
            title: post.title,
            publication_date: post.publication_date,
            content: post.content
        }
        newPost.tags = checkedTags

        createPost(newPost)
            .then(getPosts)
            .then(() => history.push(`/posts/${lastPostId}`))
    }

    const onAddTag = (value) => {
        const list = checkedTags.concat(parseInt(value))
        setCheckedTags(list)
    }

    const onRemoveTag = (index) => {
        const list = checkedTags.splice(index, 1)
        setCheckedTags(list)
    }

    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState?.map((item, index) =>
            index === position ? !item : item
        )

        setCheckedState(updatedCheckedState)

        updatedCheckedState?.map((state, index) => {

            const allTags = updatedCheckedState.reduce(
                (selectedTags, currentState, index) => {
                    if (currentState === true) {
                        selectedTags.append(tags[index].id)
                    }
                    return selectedTags
                },
                []
            )
            // if (state === true & index === position) {
            //     const newIndex = index + 1
            //     console.log(newIndex)
            //     const findTag = checkedTags.find(tag => tag === newIndex)
            //     console.log(findTag)
            //     if (!findTag) {
            //     onAddTag(newIndex)
            //     }
            // else if (state === false)
            //     if (findTag) {
            //         checkedTags.filter(tag => tag !== newIndex)
            //     }
            // }
        })
        setCheckedTags(allTags)
    }

    return (
        <section className="post_form_container">
            <form className="post_form" >
                <h1 className="formTitle">New Post</h1>
                <div className="title_field">
                    <div className="title_control">
                        <input className="post_title" type="text" name="title" placeholder="Title" value={post.title} onChange={changePostState} />
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
                                            checked={checkedState[index]}
                                            onChange={() => handleOnChange(index)}
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
                        <button className="publish_button" type="submit" onClick={handleSubmit}>Publish</button>
                    </div>
                </div>
            </form>
        </section>
    )
}