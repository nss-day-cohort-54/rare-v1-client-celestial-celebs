import {useState , useEffect} from "react";
import { getAllTags } from "./tagsManager";
import {BsFillPencilFill} from "react-icons/bs"
import "./tags.css"
export const TagsList = () => {
    const [tags, setTags] = useState([])

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
        </>
    )
}