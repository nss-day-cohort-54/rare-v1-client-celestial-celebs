import React from "react"
import { Route } from "react-router-dom"
import { CategoriesList } from "./categories/CategoriesList"

export const ApplicationViews = () => {
  return (
    <Route exact path="/categories">
      <CategoriesList/>
    </Route>
  )
}
