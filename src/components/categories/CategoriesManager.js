export const createCategory = (body) => {
    return fetch(`http://localhost:8088/categories`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
        .then(response => response.json())
}