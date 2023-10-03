import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../database/user";

const WelcomePage = () => {
  const navigate = useNavigate();

  const protectPage = () => {
    const idUser = localStorage.getItem("idUser");
    const RoleUser = User.filter((item) => item.id === +idUser).map(
      ({ password, ...user }) => user
    );
    if (RoleUser.length === 0 || RoleUser[0].role !== "admin") {
      navigate("/LoginPage");
    }
  };

  useEffect(() => {
    protectPage();
  }, []);

  return (
    <div>
      <div>
        <h1>Hello, sudah login bos!</h1>
      </div>
    </div>
  );
};

export default WelcomePage;
