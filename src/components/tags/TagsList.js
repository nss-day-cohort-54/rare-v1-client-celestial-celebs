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
                    return <p key={tags.id}>{tags.label}</p>
                }
            )
        }
        </>
    )
}