import { getSinglePost } from "./PostManager"
import { useParams } from "react-router-dom"
import React, { useState, useEffect } from "react"

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
        <h2 className="post_details_title">{currentPost.title}</h2>
        <div className="post_details_author">{currentPost.user.first_name} {currentPost.user.last_name}</div>
        <div className="post_details_category">{currentPost.category.label}</div>
        <div className="post_details_publication_date">{currentPost.publication_date}</div>
        <div className="post_details_content">{currentPost.content}</div>
        </>
        : ""
    )
}