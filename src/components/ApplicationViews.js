import React from "react"
import { Route } from "react-router-dom"
import { Post } from "./posts/Post"

export const ApplicationViews = () => {
  return (
    <>
      <h1 >Welcome to Rare Publishing</h1>
      <Route exact path="/posts/:postId(d\+)">
        <Post />
      </Route>

    </>
  )
}
