import { useState } from "react";
import axios from "axios";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Link, useNavigate } from "react-router-dom";
// import Swal from 'sweetalert2';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import Register from '../register/registerview';
function Logout() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();
  const logoutnuser = async () => {
    const res = await axios.post(
      "https://jazzy-crepe-b6ee51.netlify.app/api/session/logout/",
      {
        email: Email,
        password: Password,
      }
    );
    const data = res.data;
    console.log(data);
    if (data) {
      console.log(data);
      navigate("/login");
    }
  };

  return (
    <>
      <Button onClick={logoutnuser} variant="primary">
        Login
      </Button>
    </>
  );
}
export default Logout;
