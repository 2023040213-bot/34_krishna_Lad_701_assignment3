import { Link, useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();


    const logout = () => {

        localStorage.removeItem("token");

        navigate("/");
    };


    return (

        <div className="container">

            <h1>Employee Home Page</h1>

            <p>Welcome to Employee Portal</p>


            <div className="menu">

                <Link to="/profile">
                    <button>
                        Employee Profile
                    </button>
                </Link>


                <Link to="/leave">
                    <button>
                        Apply Leave
                    </button>
                </Link>


                <button onClick={logout}>
                    Logout
                </button>

            </div>

        </div>
    );
}

export default Home;