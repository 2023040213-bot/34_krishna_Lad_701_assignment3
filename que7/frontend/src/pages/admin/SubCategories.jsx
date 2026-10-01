import { useEffect, useState } from "react";

function SubCategories() {

    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");

    const loadData = async () => {

        const categoryResponse =
            await fetch(
                "http://localhost:5000/api/categories"
            );

        const categoryData =
            await categoryResponse.json();

        setCategories(categoryData);

        const subResponse =
            await fetch(
                "http://localhost:5000/api/subcategories"
            );

        const subData =
            await subResponse.json();

        setSubCategories(subData);
    };

    useEffect(() => {
        loadData();
    }, []);

    const addSubCategory = async () => {

        if (!name || !category) {
            alert("Fill all fields");
            return;
        }

        await fetch(
            "http://localhost:5000/api/subcategories",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name,
                    category
                })
            }
        );

        setName("");
        setCategory("");

        loadData();
    };

    const deleteSubCategory = async (id) => {

        await fetch(
            `http://localhost:5000/api/subcategories/${id}`,
            {
                method: "DELETE"
            }
        );

        loadData();
    };

    return (
        <div className="container mt-4">

            <h2>
                Manage Sub Categories
            </h2>

            <input
                className="form-control mb-2"
                placeholder="Sub category name"
                value={name}
                onChange={e => setName(e.target.value)}
            />

            <select
                className="form-control mb-2"
                value={category}
                onChange={e => setCategory(e.target.value)}
            >

                <option value="">
                    Select Category
                </option>

                {categories.map(cat => (

                    <option
                        key={cat._id}
                        value={cat._id}
                    >
                        {cat.name}
                    </option>

                ))}

            </select>

            <button
                className="btn btn-success mb-4"
                onClick={addSubCategory}
            >
                Add Sub Category
            </button>

            <table className="table table-bordered">

                <thead>
                    <tr>
                        <th>Sub Category</th>
                        <th>Category</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>

                    {subCategories.map(sub => (

                        <tr key={sub._id}>

                            <td>
                                {sub.name}
                            </td>

                            <td>
                                {sub.category?.name}
                            </td>

                            <td>

                                <button
                                    className="btn btn-danger"
                                    onClick={() =>
                                        deleteSubCategory(sub._id)
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

export default SubCategories;