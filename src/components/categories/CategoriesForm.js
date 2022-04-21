import React from "react";
import { useHistory } from "react-router-dom";
import { createCategory } from "./CategoriesManager";
import "./Category.css"

export const CategoryForm = ({category, setCategory}) => {


const changeCategoryState = (event) => {
    const newCategory = Object.assign({}, category)
    newCategory[event.target.name] = event.target.value
    setCategory(newCategory)
}

const handleSubmit = (e) => {
    createCategory(category)
}


return (
    <section className="category_form_container">
      <form className="category_form" >
        <h1 className="title">Create a new category</h1>
        <div className="field">
          <div className="control">
            <input className="form_input" type="text" name="label" placeholder="Input a category..." value={category.label} onChange={changeCategoryState} />
          </div>
        </div>
        <div className="form_button">
          <div className="control">
            <button className="category_button" type="submit" onClick={handleSubmit}>Create</button>
          </div>
        </div>
      </form>
    </section>
  )
}