import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { HomePage } from "./Pages/HomePage.jsx";
import Footer from "./Components/Shared/Footer.jsx";
import Header from "./Components/Shared/Header.jsx";
import SignIn from "./Pages/SignInPage.jsx";
import SignUp from "./Pages/SignUpPage.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column side-allPage min-width">
        <ToastContainer position="bottom-center" limit={1}></ToastContainer>
        <Header />
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/signin" element={<SignIn />}></Route>
              <Route path="/signup" element={<SignUp />}></Route>
            </Routes>
          </Container>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
