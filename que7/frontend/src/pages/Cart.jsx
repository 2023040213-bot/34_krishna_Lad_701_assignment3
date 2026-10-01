import { useCart } from "../cartContext";

function Cart() {

    const {
        cart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        total
    } = useCart();

    return (
        <div className="container mt-4">

            <h2>
                Shopping Cart
            </h2>

            {cart.length === 0 ? (

                <div className="alert alert-info">
                    Your cart is empty.
                </div>

            ) : (

                <>

                    {cart.map(item => (

                        <div
                            className="card mb-3"
                            key={item._id}
                        >

                            <div className="card-body">

                                <div className="row align-items-center">

                                    <div className="col-md-3">

                                        <img
                                            src={
                                                item.image ||
                                                "https://via.placeholder.com/150"
                                            }
                                            className="cart-image"
                                        />

                                    </div>

                                    <div className="col-md-3">

                                        <h5>
                                            {item.name}
                                        </h5>

                                        <p>
                                            ₹{item.price}
                                        </p>

                                    </div>

                                    <div className="col-md-3">

                                        <button
                                            className="btn btn-secondary"
                                            onClick={() =>
                                                decreaseQuantity(item._id)
                                            }
                                        >
                                            -
                                        </button>

                                        <span className="mx-3">
                                            {item.quantity}
                                        </span>

                                        <button
                                            className="btn btn-secondary"
                                            onClick={() =>
                                                increaseQuantity(item._id)
                                            }
                                        >
                                            +
                                        </button>

                                    </div>

                                    <div className="col-md-3">

                                        <button
                                            className="btn btn-danger"
                                            onClick={() =>
                                                removeFromCart(item._id)
                                            }
                                        >
                                            Remove
                                        </button>

                                    </div>

                                </div>

                            </div>

                        </div>

                    ))}

                    <div className="text-end">

                        <h3>
                            Total: ₹{total}
                        </h3>

                        <button className="btn btn-success">
                            Checkout
                        </button>

                    </div>

                </>

            )}

        </div>
    );
}

export default Cart;