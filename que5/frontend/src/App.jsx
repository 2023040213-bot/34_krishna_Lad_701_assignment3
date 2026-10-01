import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Leave from "./pages/Leave";


function PrivateRoute({ children }) {

    const token =
        localStorage.getItem("token");

    if (!token) {

        return <Navigate to="/" />;
    }

    return children;
}


function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* Login */}

                <Route
                    path="/"
                    element={<Login />}
                />


                {/* Home */}

                <Route
                    path="/home"
                    element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    }
                />


                {/* Profile */}

                <Route
                    path="/profile"
                    element={
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    }
                />


                {/* Leave */}

                <Route
                    path="/leave"
                    element={
                        <PrivateRoute>
                            <Leave />
                        </PrivateRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;