import React from "react";
import "../categories/Category.css"
import { createTag } from "./tagsManager";

export const TagsForm = ({tag, setTag}) => {


    const changeTagState = (event) => {
        const newTag = Object.assign({}, tag)
        newTag[event.target.name] = event.target.value
        setTag(newTag)
    }

    const handleSubmit = (e) => {
        createTag(tag)
    }


    return (
        <section className="category_form_container">
            <form className="category_form" >
                <h3 className="text">CREATE A NEW TAG</h3>
                <div className="field">
                    <div className="control">
                        <input className="form_input" type="text" name="label" placeholder="Input a tag..." value={tag.label} onChange={changeTagState} />
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