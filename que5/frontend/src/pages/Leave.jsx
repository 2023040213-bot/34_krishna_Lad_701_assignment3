import { useEffect, useState } from "react";

function Leave() {

    const [date, setDate] = useState("");
    const [reason, setReason] = useState("");
    const [grant, setGrant] = useState("No");

    const [leaves, setLeaves] = useState([]);


    const token =
        localStorage.getItem("token");


    // Get Leave List
    const getLeaves = async () => {

        const response = await fetch(
            "http://localhost:5000/api/leave",
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        setLeaves(data);
    };


    useEffect(() => {

        getLeaves();

    }, []);


    // Add Leave
    const addLeave = async (e) => {

        e.preventDefault();

        const response = await fetch(
            "http://localhost:5000/api/leave",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",

                    Authorization:
                        `Bearer ${token}`
                },

                body: JSON.stringify({
                    date,
                    reason,
                    grant
                })
            }
        );

        const data = await response.json();

        alert(data.message);

        setDate("");
        setReason("");
        setGrant("No");

        getLeaves();
    };


    return (

        <div className="container">

            <h1>Leave Application</h1>


            {/* Add Leave */}

            <div className="leave-form">

                <h2>Apply for Leave</h2>

                <form onSubmit={addLeave}>

                    <label>
                        Date
                    </label>

                    <input
                        type="date"
                        value={date}
                        onChange={(e) =>
                            setDate(e.target.value)
                        }
                        required
                    />


                    <label>
                        Reason
                    </label>

                    <textarea
                        placeholder="Enter reason"
                        value={reason}
                        onChange={(e) =>
                            setReason(e.target.value)
                        }
                        required
                    />


                    <label>
                        Grant
                    </label>

                    <select
                        value={grant}
                        onChange={(e) =>
                            setGrant(e.target.value)
                        }
                    >

                        <option value="Yes">
                            Yes
                        </option>

                        <option value="No">
                            No
                        </option>

                    </select>


                    <button type="submit">
                        Apply Leave
                    </button>

                </form>

            </div>


            {/* Leave List */}

            <div>

                <h2>My Leave Applications</h2>

                <table>

                    <thead>

                        <tr>

                            <th>Date</th>

                            <th>Reason</th>

                            <th>Grant</th>

                        </tr>

                    </thead>


                    <tbody>

                        {leaves.map((leave) => (

                            <tr key={leave._id}>

                                <td>
                                    {leave.date}
                                </td>

                                <td>
                                    {leave.reason}
                                </td>

                                <td>
                                    {leave.grant}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default Leave;