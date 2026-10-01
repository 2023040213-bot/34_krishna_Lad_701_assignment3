import { Link } from "react-router-dom";

function Home() {

    return (
        <div className="hero">

            <div className="container text-center">

                <h1>
                    Welcome to MyShop
                </h1>

                <p>
                    Simple MERN Shopping Cart
                </p>

                <Link
                    to="/products"
                    className="btn btn-primary btn-lg"
                >
                    Shop Now
                </Link>

            </div>

        </div>
    );
}

export default Home;