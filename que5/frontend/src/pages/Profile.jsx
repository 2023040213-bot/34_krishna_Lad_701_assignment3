import { useEffect, useState } from "react";

function Profile() {

    const [employee, setEmployee] = useState(null);


    useEffect(() => {

        const getProfile = async () => {

            const token =
                localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:5000/api/employee/profile",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            setEmployee(data);
        };

        getProfile();

    }, []);


    if (!employee) {

        return <h2>Loading...</h2>;
    }


    return (

        <div className="container">

            <h1>Employee Profile</h1>

            <div className="profile">

                <p>
                    <b>Employee ID:</b>
                    {employee.empid}
                </p>

                <p>
                    <b>Name:</b>
                    {employee.name}
                </p>

                <p>
                    <b>Email:</b>
                    {employee.email}
                </p>

                <p>
                    <b>Department:</b>
                    {employee.department}
                </p>

                <p>
                    <b>Salary:</b>
                    ₹{employee.salary}
                </p>

            </div>

        </div>
    );
}

export default Profile;