import { useState, useEffect } from "react";
import { CategoryForm } from "./CategoriesForm";

export const CategoriesList = (props) => {
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState({
        label: ""
    })

    useEffect(
        () => {
            fetch("http://localhost:8088/categories")
                .then(res => res.json())
                .then((data) => {
                    setCategories(data)
                })
        },
        [category]
    )

    return (
        <>
            <div>Categories</div>
            <CategoryForm
                category={category}
                setCategory={setCategory}
            />
            {
                categories?.map(
                    category => {
                        return <p key={category.id}>{category.label}</p>
                    }
                )
            }
        </>
    )
}