import React, { useState} from "react";
import { createCategory } from "./CategoriesManager";


export const CategoryForm = () => {

const [category, setCategory] = useState({
    label: ""
})

const changeCategoryState = (event) => {
    const newCategory = Object.assign({}, category)
    newCategory[event.target.name] = event.target.value
    setCategory(newCategory)
}

const handleSubmit = () =>{
    createCategory(category)
}


return (
    <section className="category_form_container">
      <form className="category_form" onSubmit={handleSubmit}>
        <h1 className="title">Create a new category</h1>
        <div className="field">
          <div className="control">
            <input className="input" type="text" name="label" onChange={changeCategoryState} />
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button className="category_button" type="submit" >Submit</button>
          </div>
          <div className="control">
          </div>
        </div>
        {
          isUnsuccessful ? <p className="help is-danger">Username or password not valid</p> : ''
        }
      </form>
    </section>
  )
}