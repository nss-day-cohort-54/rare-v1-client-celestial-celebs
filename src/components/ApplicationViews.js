import React from "react"
import { Route } from "react-router-dom"
import { Post } from "./post/PostDetail"
import { CategoriesList } from "./categories/CategoriesList";
import { PostList } from "./post/PostList"
import { PostForm } from "./post/PostForm";
import { TagsList } from "./tags/TagsList";
import { UserPostList } from "./user/UserPosts";

export const ApplicationViews = () => {
  return (
    <>

      {/* <h1 >Welcome to Rare Publishing</h1> */}
      <Route exact path="/categories">
        <CategoriesList />
      </Route>
      <Route exact path="/posts">
        <PostList />
      </Route>
      <Route path="/posts/create">
        <PostForm />
      </Route>
      <Route path="/posts/:postId(\d+)">
        <Post />
      </Route>
      <Route exact path="/tags">
        <TagsList />
      </Route>
      <Route exact path="/my-posts">
        < UserPostList/>
      </Route>
    </>
  );
};
