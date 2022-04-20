import React from "react";
import { Route } from "react-router-dom";
import { CategoriesList } from "./categories/CategoriesList";
import { PostList } from "./post/PostList";

export const ApplicationViews = () => {
  return (
    <>
      <Route exact path="/categories">
        <CategoriesList />
      </Route>

      <Route path="/posts">
        <PostList />
      </Route>
    </>
  );
};
