import { getSingleUser } from "./usersManager";
import {
  getAllSubscriptions,
  createSubscription,
} from "./SubscriptionsManager";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export const User = () => {
  const [currentUser, setCurrentUser] = useState();
  const userId = useParams();
  // get specific user from API
  const history = useHistory();
  useEffect(() => {
    getSingleUser(userId.userId).then((data) => setCurrentUser(data));
  }, []);

  // get Subscriptions from API
  useEffect(() => {
    getAllSubscriptions().then((data) => setSubscription(data));
  }, []);

  // function makes new object to send to API, then sends user to the new post details page
  const handleSubmit = (e) => {
    e.preventDefault();
    // get last index to push user to new page after API call
    const newSubscription = {
      follower_id: parseInt(localStorage.getItem("token")),
      author_id: currentUser.id,
    };

    createSubscription(newSubscription).then(() => history.push("/"));
  };

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

      <button className="subscribe_button" type="submit" onClick={handleSubmit}>
        Subscribe
      </button>
    </>
  ) : (
    ""
  );
};
