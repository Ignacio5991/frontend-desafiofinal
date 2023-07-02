import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

// Components
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// Styles
import styles from "./login.module.css";

function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();
  const loginuser = async () => {
    const res = await axios.post(
      "https://ecomercebackend-production.up.railway.app/api/session/login/",
      {
        email: Email,
        password: Password,
      },
      {
        withCredentials: true,
      }
    );
    const data = res.data;
    console.log(data);
    if (data) {
      Swal.fire({
        icon: "success",
        title: `Bienvenido ${data.firstName + "" + data.lastName}`,
        showConfirmButton: false,
      });
      setTimeout(function () {
        localStorage.setItem("usuarios", JSON.stringify(data));
        navigate("/home");
      }, 3000);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops! Something went wrong",
      });
    }
  };
  return (
    <div className={styles.main}>
      <FloatingLabel
        controlId="floatingInput"
        label="Email address"
        className="mb-3"
      >
        <Form.Control
          value={Email}
          type="email"
          placeholder="name@example.com"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Password">
        <Form.Control
          value={Password}
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </FloatingLabel>
      <div className={styles.actions}>
        <Button onClick={loginuser} variant="primary">
          Login
        </Button>
        <Link to="/register" className="btn btn-primary">
          Regístrate Aquí
        </Link>
        <Link to="/forgot" className="btn btn-primary">
          Olvide Contraseña
        </Link>
      </div>
    </div>
  );
}
export default Login;
