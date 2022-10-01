import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { useGlobalState } from "../contexts/globalState";
import "../styles/userForm.css";

const UserForm = (props) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { addUser, editUser } = useGlobalState();

  const [name, setName] = useState(state ? state.user.data.name : "");
  const [email, setEmail] = useState(state ? state.user.data.email : "");
  const [address, setAddress] = useState(state ? state.user.data.address : "");
  const [contact, setContact] = useState(
    state ? state.user.data.phoneNumber : ""
  );
  const [walletKey, setWalletKey] = useState(
    state ? state.user.data.cryptoWalletKey : ""
  );
  const [password, setPassword] = useState(
    state ? state.user.data.password : ""
  );
  const [confirmPassword, setConfirmPassword] = useState(
    state ? state.user.data.password : ""
  );
  const [error, setError] = useState(false);

  const submitUser = async () => {
    if (password !== confirmPassword) {
      setError(true);
      return;
    }
    if (
      name !== "" &&
      email !== "" &&
      address !== "" &&
      contact !== "" &&
      walletKey !== "" &&
      password !== ""
    ) {
      const newUser = {
        name: name.trim(),
        email: email.trim(),
        address: address.trim(),
        phoneNumber: contact.trim(),
        cryptoWalletKey: walletKey.trim(),
        password: password.trim(),
        age: "",
        profilePic: "",
        dateJoined: new Date().toDateString().slice(4),
      };
      try {
        if (state) {
          //Update
          const userRef = doc(db, "users", state.user.id);
          await updateDoc(userRef, newUser);
          editUser({
            data: newUser,
            id: state.user.id,
          });
        } else {
          //Add new
          const user = await addDoc(collection(db, "users"), newUser);
          addUser({
            data: newUser,
            id: user.id,
          });
        }
        navigate("/users");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="user-form">
      <form>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        ></input>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        ></input>
        <label htmlFor="address">Address</label>
        <input
          type="text"
          name="address"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        ></input>
        <label htmlFor="contact-no">Contact No</label>
        <input
          type="text"
          name="contactNo"
          id="contact-no"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        ></input>
        <label htmlFor="crypto-wallet-key">Crypto Wallet Key</label>
        <input
          type="text"
          name="cryptoWalletKey"
          id="crypto-wallet-key"
          value={walletKey}
          onChange={(e) => setWalletKey(e.target.value)}
          required
        ></input>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        ></input>
        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        ></input>
      </form>
      <button type="submit" className="submit-btn" onClick={submitUser}>
        Submit
      </button>
    </div>
  );
};

export default UserForm;
