import { deletePost } from "./PostManager";

export const DeleteDialogue = ({ deletePostObject, toggleDialogue }) => {
  return (
    <dialog id="delete-popup" className="delete-popup">
      <h2>Are you sure you want to delete this post</h2>
      <div>
        <button
          onClick={() => {
            deletePost(deletePostObject);
          }}
        >
          Delete Post
        </button>
        <button onClick={toggleDialogue}>Cancel</button>
      </div>
    </dialog>
  );
};
