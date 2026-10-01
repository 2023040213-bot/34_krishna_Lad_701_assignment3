import { useCart } from "../cartContext";

function ProductCard({ product }) {

    const { addToCart } = useCart();

    return (
        <div className="card product-card">

            <img
                src={
                    product.image ||
                    "https://via.placeholder.com/300"
                }
                className="card-img-top"
                alt={product.name}
            />

            <div className="card-body">

                <h5>
                    {product.name}
                </h5>

                <p>
                    {product.description}
                </p>

                <h5>
                    ₹{product.price}
                </h5>

                <button
                    className="btn btn-primary w-100"
                    onClick={() => addToCart(product)}
                >
                    Add to Cart
                </button>

            </div>

        </div>
    );
}

export default ProductCard;