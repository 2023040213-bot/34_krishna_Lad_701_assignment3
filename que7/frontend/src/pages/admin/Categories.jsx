import { useEffect, useState } from "react";

function Categories() {

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");

    const loadCategories = () => {

        fetch("http://localhost:5000/api/categories")
            .then(res => res.json())
            .then(data => setCategories(data));

    };

    useEffect(() => {
        loadCategories();
    }, []);

    const addCategory = async () => {

        if (!name) {
            alert("Enter category name");
            return;
        }

        await fetch(
            "http://localhost:5000/api/categories",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name
                })
            }
        );

        setName("");

        loadCategories();
    };

    const deleteCategory = async (id) => {

        await fetch(
            `http://localhost:5000/api/categories/${id}`,
            {
                method: "DELETE"
            }
        );

        loadCategories();
    };

    return (
        <div className="container mt-4">

            <h2>
                Manage Categories
            </h2>

            <div className="input-group mb-4">

                <input
                    className="form-control"
                    placeholder="Category name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />

                <button
                    className="btn btn-primary"
                    onClick={addCategory}
                >
                    Add
                </button>

            </div>

            <table className="table table-bordered">

                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>

                    {categories.map(category => (

                        <tr key={category._id}>

                            <td>
                                {category.name}
                            </td>

                            <td>

                                <button
                                    className="btn btn-danger"
                                    onClick={() =>
                                        deleteCategory(category._id)
                                    }
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default Categories;