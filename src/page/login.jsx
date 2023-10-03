import { React, useEffect, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import "../CSS/login.css";
import Icon from "@mdi/react";
import {
  mdiAccountCircleOutline,
  mdiEyeOutline,
  mdiEyeOffOutline,
} from "@mdi/js";
import { Link, useNavigate } from "react-router-dom";

// database
import { User } from "../database/user";

const LoginPage = () => {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();

  // handle error
  const [loginErr, setLoginErr] = useState([false, ""]);

  const switchPassword = () => {
    setVisible(!visible);
  };
  const usenavigate = useNavigate();
  const navigasiLogin = () => {
    if (username) {
      usenavigate("/Welcome");
      console.log(username);
    }
  };
  useEffect(() => {
    navigasiLogin();
  }, [username, usenavigate]);

  const onLogin = async () => {
    let Email = email;
    let Password = password;

    if (!Email || !Password) {
      setLoginErr([true, "tolong isi password dan email dengan lengkap"]);
    } else {
      const isUser = User.filter(
        (item) => item.email === Email && item.password === Password
      ).map(({ password, ...user }) => user);

      if (isUser.length === 0) {
        setLoginErr([true, "password atau email Anda salah"]);
      } else {
        localStorage.setItem("idUser", isUser[0].id);
        setUsername(isUser[0].username);
      }
    }
  };
  return (
    <div className="loginPage">
      <div className="MainLogin">
        <h1>Mohon login untuk akses data</h1>
        <Form.Label htmlFor="basic-url">Your Email</Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">
            <Icon path={mdiAccountCircleOutline} size={1} />
          </InputGroup.Text>
          <Form.Control
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </InputGroup>
        <Form.Label htmlFor="basic-url">Your Password</Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1" onClick={switchPassword}>
            {visible ? (
              <Icon path={mdiEyeOutline} size={1} />
            ) : (
              <Icon path={mdiEyeOffOutline} size={1} />
            )}
          </InputGroup.Text>
          <Form.Control
            placeholder="Password"
            type={visible ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </InputGroup>

        <Button variant="danger" onClick={onLogin}>
          Login
        </Button>
        <p>
          Jika belum memiliki akun click{" "}
          <Link to="/RegisterPage">Register</Link>
        </p>
      </div>
      <Modal show={loginErr[0]} className="dalmod">
        <Modal.Header>
          <Modal.Title>error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{loginErr[1]}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="dark"
            onClick={() => setLoginErr([false, ""])}
            className="ButtonMod"
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LoginPage;
