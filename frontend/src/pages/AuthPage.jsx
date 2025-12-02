// src/pages/AuthPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importăm hook-ul de navigare
import "../styles/Auth.css";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
} from "react-icons/fa";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Inițializăm navigarea

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <div className={`container ${isSignUp ? "right-panel-active" : ""}`}>
      {/* --- FORMULAR INREGISTRARE (Stânga când e activ) --- */}
      <div className="form-container sign-up-container">
        <form>
          <h1>Înregistrează-te</h1>
          <p className="switch-text">
            Already have an account?{" "}
            <span onClick={() => setIsSignUp(false)}>Log in</span>
          </p>

          <div className="row">
            <div className="input-group">
              <label>Nume</label>
              <div className="input-wrapper">
                <input type="text" placeholder="Nume" />
              </div>
            </div>
            <div className="input-group">
              <label>Prenume</label>
              <div className="input-wrapper">
                <input type="text" placeholder="Prenume" />
              </div>
            </div>
          </div>

          <div className="input-group">
            <label>E-mail</label>
            <div className="input-wrapper">
              <input type="email" placeholder="Enter your e-mail" />
              <FaEnvelope className="icon" />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
              />
              <div className="icon" onClick={togglePassword}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <div className="input-wrapper">
              <input type="password" placeholder="Confirm your password" />
              <div className="icon">
                <FaLock />
              </div>
            </div>
          </div>

          <button className="btn-primary">Sign Up</button>
        </form>
      </div>

      {/* --- FORMULAR LOGIN (Dreapta când e activ) --- */}
      <div className="form-container sign-in-container">
        <form>
          <h1>Bine ai revenit!</h1>
          <p className="switch-text">
            Don't have an account?{" "}
            <span onClick={() => setIsSignUp(true)}>Sign up</span>
          </p>

          <div className="input-group">
            <label>E-mail</label>
            <div className="input-wrapper">
              <input type="email" placeholder="Enter your e-mail" />
              <FaEnvelope className="icon" />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
              />
              <div className="icon" onClick={togglePassword}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>

          <span className="forgot-password">Forgot Password?</span>

          {/* --- AICI ESTE MODIFICAREA PENTRU LOGIN --- */}
          <button
            className="btn-primary"
            onClick={(e) => {
              e.preventDefault(); // Oprește reîncărcarea paginii
              navigate("/home"); // Te duce la pagina Home
            }}
          >
            Log in
          </button>

          <div style={{ margin: "15px 0", fontSize: "0.8rem", color: "#999" }}>
            OR
          </div>

          <button className="btn-google">
            <FaGoogle color="#DB4437" /> Continue with Google
          </button>
        </form>
      </div>

      {/* --- PANOUL MOV (OVERLAY) --- */}
      <div className="overlay-container">
        <div className="overlay">
          {/* Panou Stânga - Vizibil la LOGIN */}
          <div className="overlay-panel overlay-left">
            <div
              className="logo-text"
              style={{ position: "absolute", top: "30px", left: "30px" }}
            >
              UniEvent
            </div>
            <h1>UNIEVENT</h1>
            <p>
              Organizează, programează și coordonează evenimentele academice
              într-un singur loc. Conectează-te pentru a continua.
            </p>
          </div>

          {/* Panou Dreapta - Vizibil la REGISTER */}
          <div className="overlay-panel overlay-right">
            <div
              className="logo-text"
              style={{ position: "absolute", top: "30px", right: "30px" }}
            >
              UniEvent
            </div>
            <h1>BINE AI VENIT!</h1>
            <p>
              Creează-ți un cont pentru a accesa toate funcționalitățile
              platformei. Deja ai cont? Autentifică-te aici.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
