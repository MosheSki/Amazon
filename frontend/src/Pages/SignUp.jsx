// import axios from "axios";
// import { useContext, useState } from "react";
// import Container from "react-bootstrap/Container";
// import Title from "../Components/Shared/Title";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/esm/Button";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { getError } from "../utils";
// import { Store } from "../Store";

// const SignIn = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const { dispatch: ctxDispatch } = useContext(Store);

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post("/api/v1/users/signIn", {
//         email: email,
//         password: password,
//       });
//       ctxDispatch({ type: "USER_SIGNIN", payload: data });
//       localStorage.setItem("userInfo", JSON.stringify(data));
//       navigate("/");
//     } catch (error) {
//       toast.error(getError(error));
//     }
//   };
//   return (
//     <Container className="small-container">
//       <Title title="SignUp Page"></Title>
//       <h1 className="my-3">Sign-Up</h1>

//       <Form onSubmit={submitHandler}>
//         <Form.Group className="mb-3" controlId="name">
//           <Form.Label>name:</Form.Label>
//           <Form.Control
//             required
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="john"
//           ></Form.Control>
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="email">
//           <Form.Label>Email:</Form.Label>
//           <Form.Control
//             required
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="example@example.com"
//           ></Form.Control>
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="password">
//           <Form.Label>Password:</Form.Label>
//           <Form.Control
//             type="password"
//             required
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Enter Password"
//           ></Form.Control>
//         </Form.Group>
//         <Form.Group className="mb-3" controlId="confirm password">
//           <Form.Label>Confirm Password:</Form.Label>
//           <Form.Control
//             type="password"
//             required
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Enter Password"
//           ></Form.Control>
//         </Form.Group>
//         <div className="mb-3">
//           <Button type="submit">Sign-Up</Button>
//         </div>
//       </Form>
//     </Container>
//   );
// };

// export default SignIn;
