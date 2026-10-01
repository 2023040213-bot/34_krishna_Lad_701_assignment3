import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

function Products() {

    const [products, setProducts] = useState([]);

    useEffect(() => {

        fetch("http://localhost:5000/api/products")
            .then(response => response.json())
            .then(data => setProducts(data));

    }, []);

    return (
        <div className="container mt-4">

            <h2 className="mb-4">
                All Products
            </h2>

            <div className="row">

                {products.map(product => (

                    <div
                        className="col-md-4 mb-4"
                        key={product._id}
                    >
                        <ProductCard
                            product={product}
                        />
                    </div>

                ))}

            </div>

        </div>
    );
}

export default Products;