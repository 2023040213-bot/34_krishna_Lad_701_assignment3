import { Link } from "react-router-dom";

function AdminDashboard() {

    return (
        <div className="container mt-5">

            <h1>
                Admin Dashboard
            </h1>

            <div className="row mt-4">

                <div className="col-md-4">
                    <Link
                        to="/admin/categories"
                        className="btn btn-primary w-100 p-4"
                    >
                        Manage Categories
                    </Link>
                </div>

                <div className="col-md-4">
                    <Link
                        to="/admin/subcategories"
                        className="btn btn-success w-100 p-4"
                    >
                        Manage Sub Categories
                    </Link>
                </div>

                <div className="col-md-4">
                    <Link
                        to="/admin/products"
                        className="btn btn-warning w-100 p-4"
                    >
                        Manage Products
                    </Link>
                </div>

            </div>

        </div>
    );
}

export default AdminDashboard;