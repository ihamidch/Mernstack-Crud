import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Use useNavigate instead of Navigate
import { toast } from "react-toastify";

const UpdateUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { userid } = useParams();
    const navigate = useNavigate(); // Use useNavigate to get the navigate function

    const getsingleuserByID = async (userid) => {
        try {
            const result = await axios.get(`http://localhost:8000/users/user/${userid}`, { headers: { "Content-Type": "application/json" } });
            console.log("Successfully fetched user", result);
            if (result?.data?.user) {
                setName(result?.data?.user.name);
                setEmail(result?.data?.user.email);
                setPassword(result?.data?.user.password);
            }
        } catch (error) {
            console.log("Error fetching user", error);
            toast.error("Failed to fetch user data");
        }
    };

    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.put(`http://localhost:8000/users/update/${userid}`, { name, email, password }, { headers: { "Content-Type": "application/json" } });
            console.log("Successfully updated user", result);
            toast.success(result.data.message, { autoClose: 1500 });
            setName("");
            setEmail("");
            setPassword("");
            navigate('/'); // Navigate to home after successful update
        } catch (error) {
            console.log("Error updating user", error);
            toast.error(error?.response?.data?.message || "Failed to update user");
        }
    };

    useEffect(() => {
        getsingleuserByID(userid);
    }, [userid]);

    return (
        <>
            <div className="card"
                style={{
                    width: "400px",
                    position: "absolute",
                    transform: "translate(-50%, -50%)",
                    top: "50%",
                    left: "50%",
                }} >
                <div className="card-header bg-primary text-white">
                    Update user information
                </div>
                <div className="card-body">
                    <form onSubmit={handlesubmit}>
                        <div className="mb-3">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control" value={name} onChange={(e) => { setName(e.target.value) }} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                        </div>
                        <div className="mb-3">
                            <button className="btn btn-primary">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default UpdateUser;
