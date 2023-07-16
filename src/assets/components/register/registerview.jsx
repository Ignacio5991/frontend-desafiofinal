import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";

function Register() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Firstname, setName] = useState("");
  const navigate = useNavigate();
  const [Lastname, setLastName] = useState("");

  const registeruser = async () => {
    const res = await axios.post(
      "https://jazzy-crepe-b6ee51.netlify.app/api/session/register/",
      {
        firstName: Firstname,
        lastName: Lastname,
        email: Email,
        password: Password,
      }
    );
    const data = res.data;
    console.log(data);
    if (data) {
      Swal.fire({
        icon: "success",
        title: `Bienvenido ${
          data.firstName + " " + data.lastName
        }, ahora eres usuario de este sitio.`,
        showConfirmButton: true,
      });
      setTimeout(function () {
        navigate("/");
      }, 3000);
    }
  };
  return (
    <>
      <FloatingLabel
        controlId="floatingInput"
        label="First Name"
        className="mb-3"
      >
        <Form.Control
          value={Firstname}
          type="name"
          placeholder="Josue"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput"
        label="Last Name"
        className="mb-3"
      >
        <Form.Control
          value={Lastname}
          type="lastname"
          placeholder="Ramirez"
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
      </FloatingLabel>
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
      <Button onClick={registeruser} variant="primary">
        Registrarse
      </Button>
      <Link to="/" className="btn btn-primary">
        Logueate
      </Link>
    </>
  );
}
export default Register;
