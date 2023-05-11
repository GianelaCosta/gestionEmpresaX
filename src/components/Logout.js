import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../reducers/authReducer";
import { Link } from "react-router-dom";

const Logout = () => {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    dispatch(logoutSuccess({ username }));
  };
  return (
    <Link to="/" onClick={handleLogout}>
      Logout
    </Link>
  );
};

export default Logout;
