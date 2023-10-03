import LoginPage from "./login";
import RegisterPage from "./register";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div>
      <div>
        <Button variant="danger" as={Link} to="/LoginPage">
          Login
        </Button>
        <Button variant="primary" as={Link} to="/RegisterPage">
          Register
        </Button>
      </div>
    </div>
  );
};

export default Home;
