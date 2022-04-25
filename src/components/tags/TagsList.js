import {useState , useEffect} from "react";
import { getAllTags } from "./tagsManager";
import {BsFillPencilFill} from "react-icons/bs"
import { TagsForm } from "./TagsForm";
import "./tags.css"

// lists all tags
export const TagsList = () => {
    const [tags, setTags] = useState([])
    const [tag, setTag] = useState([])
    
    useEffect(
        () => {
            getAllTags()
                .then((data) => {
                    setTags(data)
                })
        },
        []
    )

    return (
        <>
        <h3 className="tags-list">TAGS</h3>
        {
            tags.map(
                tags => {
                    return <>
                        <span class="tag is-primary is-large" 
                            key={`delete--${tags.id}`}>{tags.label}
                            {/* delete button */}{/* edit button */}
                            <div class="edit">{BsFillPencilFill()}</div>
                            <button class="delete"></button>
                            
                        </span>
                        
                        </>
                }
            )
        }
        <div className="tags-list"><TagsForm tag={tag} setTag={setTag}/></div>
        </>
    )
}