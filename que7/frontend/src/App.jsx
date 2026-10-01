import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";

import AdminDashboard
    from "./pages/admin/AdminDashboard";

import Categories
    from "./pages/admin/Categories";

import SubCategories
    from "./pages/admin/SubCategories";

import AdminProducts
    from "./pages/admin/Products";

function App() {

    return (

        <BrowserRouter>

            <Navbar />

            <Routes>

                {/* USER */}

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/products"
                    element={<Products />}
                />

                <Route
                    path="/cart"
                    element={<Cart />}
                />

                {/* ADMIN */}

                <Route
                    path="/admin"
                    element={<AdminDashboard />}
                />

                <Route
                    path="/admin/categories"
                    element={<Categories />}
                />

                <Route
                    path="/admin/subcategories"
                    element={<SubCategories />}
                />

                <Route
                    path="/admin/products"
                    element={<AdminProducts />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;