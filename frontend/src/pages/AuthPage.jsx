import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext"; // Import contextul
import "../styles/Auth.css";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
} from "react-icons/fa";

const AuthPage = () => {
  const { loginUser, registerUser } = useContext(AuthContext); // Luam functiile din context

  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // State-uri pentru Login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // State-uri pentru Register
  const [regData, setRegData] = useState({
    email: "",
    password: "",
    password2: "", // Atentie: backend-ul cere password2 pentru confirmare
    first_name: "",
    last_name: "",
  });

  const togglePassword = () => setShowPassword(!showPassword);

  // Handle Register Submit
  const handleRegister = async (e) => {
    e.preventDefault();
    // Trimitem datele catre context -> backend
    const success = await registerUser(regData);
    if (success) {
      setIsSignUp(false); // Daca e ok, mergem la tab-ul de Login
    }
  };

  // Handle Login Submit
  const handleLogin = (e) => {
    e.preventDefault();
    loginUser(loginEmail, loginPassword);
  };

  return (
    <div className={`container ${isSignUp ? "right-panel-active" : ""}`}>
      
      {/* --- FORMULAR INREGISTRARE --- */}
      <div className="form-container sign-up-container">
        <form onSubmit={handleRegister}>
          <h1>Inregistreaza-te</h1>
          <p className="switch-text">
            Already have an account?{" "}
            <span onClick={() => setIsSignUp(false)}>Log in</span>
          </p>

          <div className="row">
            <div className="input-group">
              <label>Nume</label>
              <div className="input-wrapper">
                <input 
                  type="text" 
                  placeholder="Nume"
                  value={regData.last_name}
                  onChange={(e) => setRegData({...regData, last_name: e.target.value})} 
                />
              </div>
            </div>
            <div className="input-group">
              <label>Prenume</label>
              <div className="input-wrapper">
                <input 
                  type="text" 
                  placeholder="Prenume" 
                  value={regData.first_name}
                  onChange={(e) => setRegData({...regData, first_name: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="input-group">
            <label>E-mail</label>
            <div className="input-wrapper">
              <input 
                type="email" 
                placeholder="Enter your e-mail" 
                value={regData.email}
                onChange={(e) => setRegData({...regData, email: e.target.value})}
              />
              <FaEnvelope className="icon" />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={regData.password}
                onChange={(e) => setRegData({...regData, password: e.target.value})}
              />
              <div className="icon" onClick={togglePassword}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <div className="input-wrapper">
              <input 
                type="password" 
                placeholder="Confirm your password"
                value={regData.password2}
                onChange={(e) => setRegData({...regData, password2: e.target.value})}
               />
              <div className="icon">
                <FaLock />
              </div>
            </div>
          </div>

          <button className="btn-primary">Sign Up</button>
        </form>
      </div>

      {/* --- FORMULAR LOGIN --- */}
      <div className="form-container sign-in-container">
        <form onSubmit={handleLogin}>
          <h1>Bine ai revenit!</h1>
          <p className="switch-text">
            Don't have an account?{" "}
            <span onClick={() => setIsSignUp(true)}>Sign up</span>
          </p>

          <div className="input-group">
            <label>E-mail</label>
            <div className="input-wrapper">
              <input 
                type="email" 
                placeholder="Enter your e-mail" 
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              <FaEnvelope className="icon" />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              <div className="icon" onClick={togglePassword}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>

          <span className="forgot-password">Forgot Password?</span>

          <button className="btn-primary">Log in</button>

          <div style={{ margin: "15px 0", fontSize: "0.8rem", color: "#999" }}>
            OR
          </div>

          <button className="btn-google" type="button">
            <FaGoogle color="#DB4437" /> Continue with Google
          </button>
        </form>
      </div>

      {/* --- PANOUL MOV --- */}
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <div className="logo-text" style={{ position: "absolute", top: "30px", left: "30px" }}>
              UniEvent
            </div>
            <h1>UNIEVENT</h1>
            <p>Organizează, programează și coordonează evenimentele academice...</p>
          </div>
          <div className="overlay-panel overlay-right">
            <div className="logo-text" style={{ position: "absolute", top: "30px", right: "30px" }}>
              UniEvent
            </div>
            <h1>BINE AI VENIT!</h1>
            <p>Creează-ți un cont pentru a accesa toate funcționalitățile...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;