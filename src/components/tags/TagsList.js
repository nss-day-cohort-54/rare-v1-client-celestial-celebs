import {useState , useEffect} from "react";
import { getAllTags } from "./tagsManager";

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
        <div>Tags</div>
        {
            tags.map(
                tags => {
                    return <>
                        <span class="tag is-primary" 
                            key={`delete--${tags.id}`}>{tags.label}<button 
                            class="delete"></button>
                        </span>
                        <span class="icon has-text-info" key={`edit--${tags.id}`}>
                        <i class="fas fa-info-circle"></i>
                        </span>
                        </>
                }
            )
        }
        </>
    )
}