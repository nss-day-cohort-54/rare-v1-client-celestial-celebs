import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostComments } from "./commentsManager";
import "./CommentsList.css"
export const CommentsList = () => {
    const [comments, setComments] = useState([])

    const postId = useParams()
    useEffect(() => {
        getPostComments(postId.postId).then((data) => setComments(data));
      }, []);
    
      return<div className="comments-container">
                {comments.map(comment => {
                    return <div class="box" key={comment.id}>
                        <h3>{comment.user.username}</h3>
                        <p>{comment.content}</p>
                    </div>
                })}
            </div>
        
}