import { createContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

export const AuthContext = createContext();

AuthProvider.propTypes = {
  children: PropTypes.any,
};

function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubcribed = auth.onIdTokenChanged((user) => {
      if (user?.uid) {
        setUser(user);
        if (user.accessToken !== localStorage.getItem("accessToken")) {
          localStorage.setItem("accessToken", user.accessToken);
          // window.location.reload();
        }

        setLoading(false);
        return;
      }

      setLoading(false);
      setUser({});
      localStorage.clear();
      navigate("/login");
    });

    return () => unsubcribed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {loading ? <CircularProgress /> : children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
