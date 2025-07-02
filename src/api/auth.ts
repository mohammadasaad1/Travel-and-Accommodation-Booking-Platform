import { api } from "./client";
import { useNavigate } from "react-router-dom";

export function login(username: string, password: string) {
  return api.post("/api/auth/authenticate", { username, password });
}

const Logout = () => {
  const navigate = useNavigate();
  localStorage.removeItem("token");
  localStorage.removeItem("userType");
  navigate("/login");
};
