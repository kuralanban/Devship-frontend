import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers, deleteuserService, updateUser } from "../../services/apiservice";
import toastr from "toastr";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import InputField from "../inputFeilds/inputField";

function Dashboard() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5); // New state for items per page
  const [showInactive, setShowInactive] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    getAllUsers();
  }, [currentPage, itemsPerPage]); // Added itemsPerPage to the dependency array

  // To get all active users
  const getAllUsers = () => {
    getUsers(currentPage, itemsPerPage) // Pass itemsPerPage as an argument
      .then((res) => {
        setUserDetails(res.data.data);
        setTotalPages(res.data.totalPages);
      })
      .catch(() => {
        toastr.error("Error fetching user details");
      });
  };

  // To delete the user
  const deleteUser = (id) => {
    deleteuserService(id)
      .then(() => {
        toastr.success("User deleted successfully");
        getAllUsers(); // Refresh the user list
      })
      .catch(() => {
        toastr.error("Error in deleting user");
      });
  };

  const updateExistingDetails = (user) => {
    setFormData({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      password: "",
      confirmPassword: "",
    });
    setIsPopupOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(formData.id, formData)
      .then(() => {
        toastr.success("User updated successfully");
        getAllUsers(); // Refresh the user list
      })
      .catch(() => {
        toastr.error("Error in updating user");
      });
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page when items per page changes
  };

  const greet = () => {
    const date = new Date();
    const hours = date.getHours();
    let greeting;
    if (hours < 12) {
      greeting = "Good morning!";
    } else if (hours < 18) {
      greeting = "Good afternoon!";
    } else {
      greeting = "Good evening!";
    }
    return greeting;
  };

  const getUserName = () => {
    const user = JSON.parse(localStorage.getItem("authToken"));
    return user.firstName;
  };

  const signOut = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const filteredUsers = userDetails.filter(user => showInactive || user.activeStatus);

  return (
    <>
      {greet()}, {getUserName()}!
      <button
        onClick={signOut}
        className="signOut"
        style={{
          backgroundColor: "red",
          color: "white",
          border: "none",
          padding: "7px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Sign out
      </button>
      <div className="DashboardContainer">
        <div className="table">
          <button onClick={() => setShowInactive(!showInactive)}>
            {showInactive ? "Show Active Users" : "Show All Users"}
          </button>
          <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
            {[1, 2, 3, 4, 5].map(num => (
              <option key={num} value={num}>{num} per page</option>
            ))}
          </select>
          {filteredUsers.length === 0 ? (
            <div>No users available</div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Active status</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user._id}</td>
                    <td>{user.username}</td>
                    <td>{user.activeStatus ? "Active" : "Inactive"}</td>
                    <td>
                      <span className="material-symbols-outlined" onClick={() => updateExistingDetails(user)}>
                        edit
                      </span>
                    </td>
                    <td>
                      <Popup trigger={<span className="material-symbols-outlined">delete</span>} position="center">
                        <div>
                          Are you sure you want to delete this user?
                          <span className="material-symbols-outlined" style={{ color: "red" }} onClick={() => deleteUser(user._id)}>
                            delete
                          </span>
                        </div>
                      </Popup>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div>
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous Page
            </button>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next Page
            </button>
          </div>
        </div>
      </div>
      <Popup open={isPopupOpen} onClose={() => setIsPopupOpen(false)} position="center">
        <div className="registerForm">
          <div className="box1">
            <form onSubmit={handleSubmit}>
              <div className="form">
                <div className="signUp">
                  <h4 className="title">Update Details</h4>
                </div>
                <div className="formDivBox1">
                  <div>
                    <InputField
                      label="First Name"
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <InputField
                      label="Last Name"
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="formDivBox2">
                  <div>
                    <InputField
                      label="Email"
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <InputField
                      label="Username"
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="formDivBox3">
                  <div>
                    <InputField
                      label="Password"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <InputField
                      label="Confirm Password"
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="btn">
                  <button type="submit">Update Details</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Popup>
    </>
  );
}

export default Dashboard;
