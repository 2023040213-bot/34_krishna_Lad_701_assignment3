import { Link } from "react-router-dom";
import { useCart } from "../cartContext";

function Navbar() {

    const { cart } = useCart();

    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            <div className="container">

                <Link
                    className="navbar-brand"
                    to="/"
                >
                    🛒 MyShop
                </Link>

                <div className="navbar-nav ms-auto">

                    <Link
                        className="nav-link"
                        to="/"
                    >
                        Home
                    </Link>

                    <Link
                        className="nav-link"
                        to="/products"
                    >
                        Products
                    </Link>

                    <Link
                        className="nav-link"
                        to="/cart"
                    >
                        Cart ({cart.length})
                    </Link>

                    <Link
                        className="nav-link"
                        to="/admin"
                    >
                        Admin
                    </Link>

                </div>

            </div>
        </nav>
    );
}

export default Navbar;