import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Title from "../Components/Shared/Title";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getError } from "../utils";
import { Store } from "../Store";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const { search } = useLocation();
  const redirectUrl = new URLSearchParams(search);
  const redirectValue = redirectUrl.get("redirect");
  const redirect = redirectValue ? redirectValue : "/";
  useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/users/signin", {
        email: email,
        password: password,
      });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect);
    } catch (error) {
      toast.error(getError(error));
    }
  };
  return (
    <Container className="small-container">
      <Title title="SignIn Page"></Title>
      <h1 className="my-3">Sign-In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@example.com"
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
          ></Form.Control>
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Sign-In</Button>
        </div>
        <div className="mb-3">
          New Customer?
          <Link to={`/signUp?redirect=${redirect}`}>Create your Account</Link>
        </div>
        <div className="mb-3">
          Forgot your Password?
          <Link to="/reset">Reset Password</Link>
        </div>
      </Form>
    </Container>
  );
};

export default SignInPage;
