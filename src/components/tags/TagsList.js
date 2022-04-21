import {useState , useEffect} from "react";

export const TagsList = () => {
    const [tags, setTags] = useState([])

    useEffect(
        () => {
            fetch("http://localhost:8088/tags")
                .then(res => res.json())
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
                category => {
                    return <p key={tags.id}>{tags.label}</p>
                }
            )
        }
        </>
    )
}