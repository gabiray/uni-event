import { createContext, useState } from "react"; // Nu mai avem nevoie de useEffect aici
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // --- 1. INITIALIZARE DIRECTA (LAZY) ---
  // Citim token-ul din localStorage IMEDIAT cand se incarca pagina,
  // nu asteptam sa se randeze componenta prima data.
  
  const [authTokens, setAuthTokens] = useState(() => {
    const savedTokens = localStorage.getItem("authTokens");
    return savedTokens ? JSON.parse(savedTokens) : null;
  });

  const [user, setUser] = useState(() => {
    const savedTokens = localStorage.getItem("authTokens");
    return savedTokens ? jwtDecode(JSON.parse(savedTokens).access) : null;
  });

  // Nu mai avem nevoie de loading, pentru ca datele sunt citite instant
  const [loading , /* setLoading */] = useState(false);

  // --- 2. FUNCTIILE DE LOGIN / REGISTER ---

  const loginUser = async (email, password) => {
    try {
      const response = await api.post("token/", {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        setAuthTokens(response.data);
        setUser(jwtDecode(response.data.access));
        
        localStorage.setItem("authTokens", JSON.stringify(response.data));
        
        navigate("/home");
      } else {
        alert("Ceva nu a mers bine!");
      }
    } catch (error) {
      alert("Email sau parola gresita!");
      console.error("Login error:", error);
    }
  };

  const registerUser = async (userData) => {
    try {
      await api.post("users/register/", userData);
      alert("Cont creat cu succes! Acum te poti loga.");
      return true; 
    } catch (error) {
      console.error("Register error:", error.response?.data);
      // Afisam un mesaj de eroare mai clar
      const errorMsg = error.response?.data?.email 
        ? "Acest email exista deja." 
        : "Eroare la inregistrare. Verifica datele.";
      alert(errorMsg);
      return false;
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/");
  };

  // --- 3. CONTEXT DATA ---
  const contextData = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
    registerUser: registerUser,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};