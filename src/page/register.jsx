import React, { useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiEyeOutline, mdiEyeOffOutline } from "@mdi/js";
import Axios from "axios";
import { API_Dummy_users } from "../API/allAPI";

const RegisterPage = () => {
  let initialInputValue = "";
  // handle error
  const [namaErr, setNamaErr] = useState([false, ""]);
  const [emailErr, setEmailErr] = useState([false, ""]);
  const [passwordErr, setPasswordErr] = useState([false, ""]);
  const [ValpasswordErr, setValPasswordErr] = useState([false, ""]);
  const [registerErr, setRegisterErr] = useState([false, ""]);
  // state
  const [nama, setNama] = useState(initialInputValue);
  const [email, setEmail] = useState(initialInputValue);
  const [password, setPassword] = useState(initialInputValue);
  const [valPassword, setValPassword] = useState(initialInputValue);

  // visible password
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleKonfirPassword, setVisibleKonfirPassword] = useState(false);
  const switchPassword = () => {
    setVisiblePassword(!visiblePassword);
  };
  const switchValPassword = () => {
    setVisibleKonfirPassword(!visibleKonfirPassword);
  };

  const validasiNama = (e) => {
    let symb = /[!@#$%^&1234567890*]/;
    let valuenama = e.target.value;

    if (valuenama.length === 0) {
      setNamaErr([false, ""]);
    } else if (symb.test(valuenama) || valuenama.length < 5) {
      setNamaErr([true, "Tolong isi Nama Anda dengan benar!"]);
    } else {
      setNamaErr([false, ""]);
    }
    setNama(valuenama);
  };

  const validasiEmail = (e) => {
    let regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    let valueEmail = e.target.value;

    if (valueEmail.length === 0) {
      setEmailErr([false, ""]);
    } else if (!regex.test(valueEmail)) {
      setEmailErr([true, "Tolong periksa email Anda"]);
    } else {
      setEmailErr([false, ""]);
    }
    setEmail(valueEmail);
  };

  const validasiPassword = (e) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;

    const valuePassword = e.target.value;

    if (valuePassword.length === 0) {
      setPasswordErr([false, ""]);
    } else if (!passwordRegex.test(valuePassword)) {
      setPasswordErr([
        true,
        "Password harus mengandung huruf kecil, huruf besar, angka, dan minimal 6 karakter",
      ]);
    } else {
      setPasswordErr([false, ""]);
    }
    setPassword(valuePassword);
  };

  const validasiKonfirPassword = (e) => {
    let valueKonfirPassword = e.target.value;
    if (valueKonfirPassword.length === 0) {
      setValPasswordErr([false, ""]);
    } else if (valueKonfirPassword !== password) {
      setValPasswordErr([true, "periksa kembali password Anda"]);
    } else {
      setValPasswordErr([false, ""]);
    }
    setValPassword(valueKonfirPassword);
  };
  const OnRegister = () => {
    let Username = nama;
    let Password = password;
    let Email = email;
    let KomfirmasiPassword = valPassword;

    if (!Username || !Password || !Email || !KomfirmasiPassword) {
      setRegisterErr([true, "Tolong isi data diri Anda dengan lengkap !!"]);
    } else if (
      namaErr[0] ||
      passwordErr[0] ||
      emailErr[0] ||
      ValpasswordErr[0]
    ) {
      setRegisterErr([true, "Pastikan data diri Anda Valid !!"]);
    } else {
      let data = {
        username: Username,
        password: Password,
        email: Email,
        role: "default",
        photo_profile: ".jpg",
      };
      Axios.post(`${API_Dummy_users}/regist`, data).then(() => {
        setNama(initialInputValue);
        setEmail(initialInputValue);
        setPassword(initialInputValue);
        setValPassword(initialInputValue);
      });

      // setRegisterErr([true, "register sukses"]);
    }
  };
  return (
    <div className="loginPage">
      <div className="MainLogin">
        <h1>Mohon login untuk akses data</h1>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              onChange={(e) => validasiNama(e)}
              value={nama}
            />
            <Form.Text className="text-muted">
              {namaErr[0] ? namaErr[1] : initialInputValue}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => validasiEmail(e)}
              value={email}
            />
            <Form.Text className="text-muted">
              {emailErr[0] ? emailErr[1] : initialInputValue}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label htmlFor="basic-url">Your Password</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1" onClick={switchPassword}>
                {visiblePassword ? (
                  <Icon path={mdiEyeOutline} size={1} />
                ) : (
                  <Icon path={mdiEyeOffOutline} size={1} />
                )}
              </InputGroup.Text>
              <Form.Control
                placeholder="Password"
                type={visiblePassword ? "text" : "password"}
                onChange={(e) => validasiPassword(e)}
                value={password}
                // ref={refPassword}
              />
            </InputGroup>
            <Form.Text className="text-muted">
              {passwordErr[0] ? passwordErr[1] : initialInputValue}
            </Form.Text>
          </Form.Group>

          <Form.Label htmlFor="basic">Konfirmasi password</Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1" onClick={switchValPassword}>
              {visibleKonfirPassword ? (
                <Icon path={mdiEyeOutline} size={1} />
              ) : (
                <Icon path={mdiEyeOffOutline} size={1} />
              )}
            </InputGroup.Text>
            <Form.Control
              placeholder="Konfirmasi password"
              type={visibleKonfirPassword ? "text" : "password"}
              onChange={(e) => validasiKonfirPassword(e)}
              value={valPassword}
              // ref={refValPassword}
            />
          </InputGroup>
          <Form.Text className="text-muted">
            {ValpasswordErr[0] ? ValpasswordErr[1] : initialInputValue}
          </Form.Text>
        </Form>
        <Button variant="danger" type="submit" onClick={() => OnRegister()}>
          Submit
        </Button>
        <p>
          Jika sudah mendaftar click <Link to="/LoginPage">Login</Link>
        </p>
      </div>

      <Modal show={registerErr[0]} className="dalmod">
        <Modal.Header>
          <Modal.Title>error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{registerErr[1]}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="dark"
            onClick={() => setRegisterErr([false, ""])}
            className="ButtonMod"
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RegisterPage;
