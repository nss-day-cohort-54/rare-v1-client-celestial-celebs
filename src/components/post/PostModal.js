import { deletePost } from "./PostManager";
import { useHistory } from "react-router-dom";

export const DeleteDialogue = ({
  setCurrentPost,
  deletePostObject,
  toggleDialogue,
}) => {
  const history = useHistory();
  return (
    <dialog id="delete-popup" className="delete-popup">
      <h2>Are you sure you want to delete this post</h2>
      <div>
        <button
          onClick={() => {
            deletePost(deletePostObject.id).then(
              () =>
                //   history.push("/posts");
                setCurrentPost({}),
              toggleDialogue()
            );
          }}
        >
          Delete Post
        </button>
        <button onClick={toggleDialogue}>Cancel</button>
      </div>
    </dialog>
  );
};
