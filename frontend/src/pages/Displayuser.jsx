import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";


const DisplayUser = () => {
  const [users, setUsers] = useState([]);
  

  // Function to delete a user
  const handleDelete = async (userid) => {
    try {
      const result = await axios.delete(`http://localhost:8000/users/delete/${userid}`);
      
      if (result.status === 200) {  // Check if the deletion was successful
        console.log('User deleted successfully');
        toast.success(result.data.message,{autoClose:1500});
        
        // Update the local state by filtering out the deleted user
        setUsers(prevUsers => prevUsers.filter(user => user._id !== userid));
      } else {
        console.log("Error in deleting user");
      }
    } catch (error) {
      console.log("Error deleting user:", error);
    }
  };

  // Function to fetch all users
  const getAllusers = async () => {
    try {
      const result = await axios.get("http://localhost:8000/users/all");
      setUsers(result.data?.users ?? []); // Update the state with the fetched users
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  // Fetch all users on component mount
  useEffect(() => {
    getAllusers();
  }, []);

  return (
    <>
    <div className="container">
      <h1 className="text-center py-4">Registered Users</h1>
      <div className="mb-3">
        <Link to="/register" className="btn btn-primary">Add user</Link>
      </div>
      <table className="table table-bordered table-striped table-hover">
        <thead>
          <tr className="table-dark text-center">
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            <>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{user?.name ?? "N/A"}</td>
                  <td>{user?.email ?? "N/A"}</td>
                  <td>{user?.password ?? "N/A"}</td>
                  <td>
                    <Link to={`/update/${user._id}`} className="btn btn-secondary me-2">Edit</Link>
                    <button className="btn btn-danger" 
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
    </>
  );
};

export default DisplayUser;
