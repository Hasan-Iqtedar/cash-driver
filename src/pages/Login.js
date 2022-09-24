import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth";
import { FaEnvelope } from "react-icons/fa";
import { GoEllipsis } from "react-icons/go";
import { IoIosEyeOff, IoIosEye } from "react-icons/io";
import InputField from "../components/InputField";
import Logo from "../components/Logo";
import "../styles/login.css";
import { useGlobalState } from "../contexts/globalState";

const Login = (props) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { adminCredentials } = useGlobalState();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const updateEmail = (e) => setEmail(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);

  const loginUser = (e) => {
    if (
      email === adminCredentials.email &&
      password === adminCredentials.password
    ) {
      login("admin");
      localStorage.setItem("user", "admin");
      navigate("/", { replace: true });
      setErr(false);
    } else {
      setErr(true);
    }
  };

  return (
    <div className="login">
      <div>
        <Logo style={{ width: "100%" }} />
        <div className="container">
          <InputField
            icon={FaEnvelope}
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            changeHandler={updateEmail}
          />
          <InputField
            icon={GoEllipsis}
            icon2={showPassword ? IoIosEye : IoIosEyeOff}
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            changeHandler={updatePassword}
            fieldStyle={{ width: "70%" }}
            icon2Handler={() => setShowPassword(!showPassword)}
          />
          {/* <span className="forgot-password">Forget Pasword?</span> */}
        </div>
        {err ? <p className="error">Invalid Credentials!</p> : ""}

        <div className="button-container">
          <button className="login-button" onClick={loginUser}>
            Login
          </button>
          <button className="create-account">Create Account</button>
        </div>
        {/* <p className="caption">
          Don't have an account? <span>Create</span>
        </p> */}
      </div>
    </div>
  );
};

export default Login;
