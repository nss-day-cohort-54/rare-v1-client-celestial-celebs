import { getSinglePost } from "./PostManager"
import { Link, useParams } from "react-router-dom"
import React, { useState, useEffect } from "react"
import {BsTrash, BsGear} from "react-icons/bs"
import "./PostDetail.css"
// post detail page
export const Post = () => {
    const [currentPost, setCurrentPost] = useState()
    const postId = useParams()
    // get specific post from API
    useEffect(
        () => {
            getSinglePost(postId.postId)
                .then(data => setCurrentPost(data))
        }, []
    )

    return (
        currentPost?
        <>
        <div className="title-buttons-container">
            <div>{BsTrash()}</div>
            <div>{BsGear()}</div>
            <h2 className="post_details_title">{currentPost.title}</h2>
            <div className="post_details_category">{currentPost.category.label}</div>
        </div>
        <div className="post-img">
            <h2>(img would be here)</h2>
        </div>
        <div className="comment-button-author-container">
            <div className="post_details_author">{currentPost.user.first_name} {currentPost.user.last_name}</div>
            <Link class="button" id="comment-button" to={`/comments/${postId.postId}`} >COMMENTS</Link>
        </div>
        <div className="post_details_publication_date">{currentPost.publication_date}</div>
        <div className="post_details_content">{currentPost.content}</div>
        </>
        : ""
    )
}