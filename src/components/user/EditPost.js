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
    const [postTags, setPostTags] = useState([])
    const [selectedTags, setSelectedTags] = useState([])
    const history = useHistory()
    const postId = useParams()
    const [post, setPost] = useState({})
    const [checkedTags, setCheckedTags] = useState([])
    const [checkedState, setCheckedState] = useState(
        new Array(tags?.length).fill(false)
    )

    //iterate over postTags for postId to get tagIds
    //iterate over tagIds and subtract 1 to get the index of checkState that needs to be switched.
    const getCheckedTags = (tagsArray) => {
        debugger
        const newArray = []
        console.log(tagsArray)
        const filteredPostTags = tagsArray.map((tag) => {
            if (tag.post_id === parseInt(postId)) {
                newArray.append(tag)
            }
        })
        filteredPostTags?.map(tag => {
            const newIndex = tag.tag_id - 1
            const updatedCheckedState = checkedState.map((item, index) =>
                index === newIndex ? !item : item)
            setCheckedState(updatedCheckedState)
        })
    }

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
            setCheckedState(new Array(tags?.length).fill(false))
        }, [tags]
    )

    useEffect(
        () => {
            getAllPostTags()
                .then(data => getCheckedTags(data))
        }, []
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

        editPost(newPost)
            .then(getPosts)
            .then(() => history.push(`/posts/${postId.postId}`))
    }

    const onAddTag = (value) => {
        const list = checkedTags.concat(parseInt(value))
        setCheckedTags(list)
    }

    const onRemoveTag = (index) => {
        let copy = [...checkedTags]
        const list = copy.splice(index, 1)
        setCheckedTags(list)
    }

    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState?.map((item, index) =>
            index === position ? !item : item
        )
        updatedCheckedState?.map((state, index) => {
            if (state === true & index === position) {
                const newIndex = index + 1
                console.log(newIndex)
                const findTag = checkedTags.find(tag => tag === newIndex)
                console.log(findTag)
                if (!findTag) {
                    onAddTag(newIndex)
                }
            }
            else if (state === false) {
                const newIndex = index + 1
                const findTag = checkedTags.find(tag => tag === newIndex)
                if (findTag) {
                    const selectedIndex = checkedTags.indexOf(newIndex) + 1
                    onRemoveTag(selectedIndex)
                }
            }
        })
        setCheckedState(updatedCheckedState)
    }

    return (
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
                        <button className="publish_button" type="submit" onClick={handleSubmit}>Save</button>
                    </div>
                </div>
            </form>
        </section>
    )
}