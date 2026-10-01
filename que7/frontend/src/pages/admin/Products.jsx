import { useEffect, useState } from "react";

function Products() {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");

    const loadData = async () => {

        const p =
            await fetch(
                "http://localhost:5000/api/products"
            );

        setProducts(await p.json());

        const c =
            await fetch(
                "http://localhost:5000/api/categories"
            );

        setCategories(await c.json());

        const s =
            await fetch(
                "http://localhost:5000/api/subcategories"
            );

        setSubCategories(await s.json());
    };

    useEffect(() => {
        loadData();
    }, []);

    const addProduct = async () => {

        if (
            !name ||
            !price ||
            !category ||
            !subCategory
        ) {
            alert("Fill required fields");
            return;
        }

        await fetch(
            "http://localhost:5000/api/products",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name,
                    description,
                    price,
                    image,
                    category,
                    subCategory
                })
            }
        );

        setName("");
        setDescription("");
        setPrice("");
        setImage("");
        setCategory("");
        setSubCategory("");

        loadData();
    };

    const deleteProduct = async (id) => {

        await fetch(
            `http://localhost:5000/api/products/${id}`,
            {
                method: "DELETE"
            }
        );

        loadData();
    };

    return (
        <div className="container mt-4">

            <h2>
                Manage Products
            </h2>

            <input
                className="form-control mb-2"
                placeholder="Product name"
                value={name}
                onChange={e => setName(e.target.value)}
            />

            <textarea
                className="form-control mb-2"
                placeholder="Description"
                value={description}
                onChange={e =>
                    setDescription(e.target.value)
                }
            />

            <input
                type="number"
                className="form-control mb-2"
                placeholder="Price"
                value={price}
                onChange={e => setPrice(e.target.value)}
            />

            <input
                className="form-control mb-2"
                placeholder="Image URL"
                value={image}
                onChange={e => setImage(e.target.value)}
            />

            <select
                className="form-control mb-2"
                value={category}
                onChange={e => {
                    setCategory(e.target.value);
                    setSubCategory("");
                }}
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

            <select
                className="form-control mb-2"
                value={subCategory}
                onChange={e =>
                    setSubCategory(e.target.value)
                }
            >

                <option value="">
                    Select Sub Category
                </option>

                {subCategories
                    .filter(
                        sub =>
                            sub.category?._id === category
                    )
                    .map(sub => (

                        <option
                            key={sub._id}
                            value={sub._id}
                        >
                            {sub.name}
                        </option>

                    ))}

            </select>

            <button
                className="btn btn-primary mb-4"
                onClick={addProduct}
            >
                Add Product
            </button>

            <div className="row">

                {products.map(product => (

                    <div
                        className="col-md-4 mb-3"
                        key={product._id}
                    >

                        <div className="card">

                            <img
                                src={
                                    product.image ||
                                    "https://via.placeholder.com/300"
                                }
                                className="card-img-top"
                            />

                            <div className="card-body">

                                <h5>
                                    {product.name}
                                </h5>

                                <p>
                                    ₹{product.price}
                                </p>

                                <p>
                                    Category:
                                    {" "}
                                    {product.category?.name}
                                </p>

                                <p>
                                    Sub Category:
                                    {" "}
                                    {product.subCategory?.name}
                                </p>

                                <button
                                    className="btn btn-danger"
                                    onClick={() =>
                                        deleteProduct(
                                            product._id
                                        )
                                    }
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default Products;