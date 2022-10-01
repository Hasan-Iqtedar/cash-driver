import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../contexts/globalState";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoSearchOutline, IoInformationCircleOutline } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import ProfilePicture from "../components/ProfilePicture";
import Footer from "../components/Footer";
import "../styles/users.css";
import "../styles/table.css";
import TableHeader from "../components/TableHeader";

const Users = (props) => {
  const { users, deleteUser } = useGlobalState();
  const [inputValue, setInputValue] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);
  const navigate = useNavigate();

  const updateUser = (user) => {
    navigate("/edit-user", { state: { user: user } });
  };

  const filterUsers = (name) => {
    if (name !== "") {
      const filtered = filteredUsers.filter((item) =>
        item.data.name.toLowerCase().includes(name.trim().toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  };

  return (
    <div className="users">
      <TableHeader title="Users" />
      <div className="search-bar">
        <IoSearchOutline className="icon" />
        <input
          placeholder="Search user by name or email..."
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            filterUsers(e.target.value);
          }}
        />
      </div>

      <div className="table">
        <table style={{ height: "auto" }}>
          <tr
            style={{
              backgroundColor: "transparent",
              borderBottom: "0.5px solid rgba(124, 124, 124, 0.27)",
            }}
          >
            <th>Profile Name</th>
            <th>Email</th>
            <th>Date Joined</th>
            <th>Total Tracked Distance</th>
          </tr>
          {filteredUsers.map((user) => {
            let distance = 0;
            user.rides.forEach((ride) => {
              distance += Number(ride.data.distance);
            });
            return (
              <tr key={user.id}>
                <td>
                  <div
                    className="name"
                    style={{ justifyContent: "flex-start" }}
                    onClick={() => {
                      navigate("/user-profile", { state: { user: user } });
                    }}
                  >
                    <ProfilePicture
                      imgStyle={{
                        width: "40px",
                        height: "40px",
                        marginRight: "23px",
                      }}
                    />
                    {user.data.name}
                  </div>
                </td>
                <td>{user.data.email}</td>
                <td>{user.data.dateJoined ? user.data.dateJoined : "None"}</td>
                <td>{distance} KM</td>
                <td>
                  <div className="dropdown details">
                    <HiDotsHorizontal />
                    <div className="dropdown-content">
                      <div
                        onClick={() => {
                          deleteUser(user.id);
                        }}
                      >
                        <FaTrash className="icon" /> Delete
                      </div>
                      <div onClick={() => updateUser(user)}>
                        <IoInformationCircleOutline className="icon" />
                        Edit
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
      {/* <Footer contentStyle={{ marginRight: "20px" }} /> */}
    </div>
  );
};

export default Users;
