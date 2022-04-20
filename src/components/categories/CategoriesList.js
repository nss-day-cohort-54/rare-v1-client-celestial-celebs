import {useState , useEffect} from "react";

export const CategoriesList = () => {
    const [categories, setCategories] = useState([])

    useEffect(
        () => {
            fetch("http://localhost:8088/categories")
                .then(res => res.json())
                .then((data) => {
                    setCategories(data)
                })
        },
        []
    )

    return (
        <>
        <div>Categories</div>
        {
            categories.map(
                category => {
                    return <p key={category.id}>{category.label}</p>
                }
            )
        }
        </>
    )
}