export const getCategories = () => {
    return fetch("http://localhost:8088/categories").then((res) => res.json());
  };

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