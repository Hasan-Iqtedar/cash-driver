import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useGlobalState } from "../contexts/globalState";

import "../styles/settings.css";
import Modal from "../components/Modal";

const Settings = (props) => {
  const { adminCredentials, updateAdminPassword, updateAdminWalletKey } =
    useGlobalState();
  const [oldField, setOldField] = useState("");
  const [newField, setNewField] = useState("");
  const [confirmNewField, setConfirmNewField] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [field, setField] = useState("password");
  const navigate = useNavigate();

  const modalContent = (field) => {
    return (
      <div className="model-content">
        <input
          className="model-input"
          placeholder={`Old ${field}`}
          value={oldField}
          onChange={(e) => setOldField(e.target.value)}
        />
        <input
          className="model-input"
          placeholder={`New ${field}`}
          value={newField}
          onChange={(e) => setNewField(e.target.value)}
        />
        <input
          className="model-input"
          placeholder={`Confirm New ${field}`}
          value={confirmNewField}
          onChange={(e) => setConfirmNewField(e.target.value)}
        />
        <button onClick={field === "Password" ? updatePassword : updateKey}>
          Update
        </button>
      </div>
    );
  };

  const updatePassword = async () => {
    if (oldField !== "" && newField !== "" && confirmNewField !== "") {
      if (
        oldField === adminCredentials.password &&
        newField === confirmNewField
      ) {
        const adminRef = doc(db, "admin", adminCredentials.id);
        try {
          await updateDoc(adminRef, {
            password: newField,
          });
          setShowModal(false);
          updateAdminPassword(newField);
          navigate("/dashboard", { replace: true });
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  const updateKey = async () => {
    console.log("Update key");
    if (oldField !== "" && newField !== "" && confirmNewField !== "") {
      if (
        oldField === adminCredentials.adminWalletKey &&
        newField === confirmNewField
      ) {
        const adminRef = doc(db, "admin", adminCredentials.id);
        try {
          await updateDoc(adminRef, {
            walletKey: newField,
          });
          setShowModal(false);
          updateAdminWalletKey(newField);
          navigate("/dashboard", { replace: true });
        } catch (err) {
          console.log(err);
        }
      }
    }
    // if (adminKey !== "") {
    //   const adminRef = doc(db, "admin", adminCredentials.id);
    //   try {
    //     await updateDoc(adminRef, {
    //       walletKey: adminKey,
    //     });
    //     updateAdminWalletKey(adminKey);
    //     navigate("/dashboard", { replace: true });
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
  };

  return (
    <div className="settings">
      <Modal
        show={showModal}
        hideModal={() => {
          setShowModal(false);
          setOldField("");
          setNewField("");
          setConfirmNewField("");
        }}
      >
        {modalContent(field)}
      </Modal>
      <h2 className="settings-title">Settings</h2>
      <div>
        <h3>Security</h3>
        <div className="settings-fields-container">
          <div className="field">
            <div className="center-container">Update Password</div>
            <button
              className="update-btn"
              onClick={() => {
                setShowModal(true);
                setField("Password");
              }}
            >
              Update
            </button>
          </div>
          <div className="field" style={{ borderBottom: "none" }}>
            <div className="center-container">Update Admin Wallet Key</div>
            <button
              className="update-btn"
              onClick={() => {
                setShowModal(true);
                setField("Wallet Key");
              }}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
