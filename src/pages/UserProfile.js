import { useLocation } from "react-router-dom";
import { FaCarSide } from "react-icons/fa";
import Card from "../components/Card";
import "../styles/userProfile.css";

const UserProfile = (props) => {
  const { state } = useLocation();

  return (
    <div className="user-profile">
      <h2> {state.user.data.name} </h2>
      <div className="center-container">
        <span className="label">Email:</span> {state.user.data.email}
        <span className="label">Address:</span> {state.user.data.address}
        <span className="label">Contact:</span> {state.user.data.phoneNumber}
      </div>
      <h2>Activity</h2>
      <div className="center-container">
        {state.user.rides.map((ride) => {
          return (
            <Card style={style.activityCard} key={ride.id}>
              <FaCarSide className="icon" />
              <span style={style.highlighted}> {ride.data.distance} Km</span>
              <span> {ride.data.points} Point(s)</span>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default UserProfile;

const style = {
  activityCard: {
    width: "300px",
    height: "50px",
    marginBottom: "15px",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  highlighted: {
    color: "var(--secondaryColor)",
  },
};
