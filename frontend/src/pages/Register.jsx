import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Register = () => {
    const [name,setName]= useState('')
    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')
    const navigate = useNavigate();
    const handlesubmit = async (e) =>
    {
        e.preventDefault();
        try {
            const result = await axios.post("http://localhost:8000/users/new",{name,email,password},{headers:{"Content-Type":"application/json"}})
            console.log("Successfully user register",result);
            toast.success(result.data.message, {autoClose:1500});
            setName("");
            setEmail("");
            setPassword("");
            navigate('/');
            
        } catch (error) {
            // console.log("Error is register user",error);
            toast.error(error?.response?.data?.message);
            
        }

    }
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
                    Registration Form
                </div>
                <div
                    className="card-body">
                    <form onSubmit={handlesubmit}>
                        <div className="mb-3">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control" value={name} onChange={(e)=>{setName(e.target.value)}} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" value={email} onChange={(e)=>{setEmail(e.target.value)}}  />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" value={password} onChange={(e)=>{setPassword(e.target.value)}}  />
                        </div>
                        <div className="mb-3">
                            <button className="btn btn-primary">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Register;
