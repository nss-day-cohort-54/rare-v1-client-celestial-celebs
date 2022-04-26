import { getSingleUser } from "./usersManager";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

export const User = () => {
  const [currentUser, setCurrentUser] = useState();
  const userId = useParams();
  // get specific user from API
  useEffect(() => {
    getSingleUser(userId.userId).then((data) => setCurrentUser(data));
  }, []);

  return currentUser ? (
    <>
      <h2 className="user_details_full_name">
        {currentUser.first_name} {currentUser.last_name}
      </h2>
      <div className="user_details_profile_image">
        {currentUser.profile_image_url}
      </div>
      <div className="user_details_username">{currentUser.username}</div>
      <div className="user_details_creation_date">{currentUser.created_on}</div>
      <div className="user_details_bio">{currentUser.bio}</div>
    </>
  ) : (
    ""
  );
};
