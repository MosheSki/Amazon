import NavBar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import SearchBox from "./SearchBox";
import NavDropDown from "react-bootstrap/NavDropdown";
import { useContext } from "react";
import { Store } from "../../Store";

const Header = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const navigate = useNavigate();
  const { userInfo } = state;
  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    navigate("/signin");
  };
  return (
    <header>
      <NavBar bg="dark" variant="dark">
        <Container>
          <LinkContainer to="/">
            <NavBar.Brand>
              <img
                src="https://companieslogo.com/img/orig/AMZN_BIG.D-8fb0be81.png?t=1632523695"
                width={80}
                alt="Amazon logo"
              ></img>
            </NavBar.Brand>
          </LinkContainer>
          <SearchBox></SearchBox>
          <nav className="d-flex align-items-center justify-contect-end me-2 ms-4">
            <Link to="/cart" className="nav-link">
              <i className="fas fa-shopping-cart text-white"></i>
            </Link>
          </nav>
          {userInfo ? (
            <NavDropDown className="text-white" title={userInfo.name}>
              <NavDropDown.Divider></NavDropDown.Divider>
              <Link
                to="#signOut"
                onClick={signoutHandler}
                className="dropdown item"
              >
                Sign Out
              </Link>
            </NavDropDown>
          ) : (
            <Link to="/signIn" className="text-white nav-link">
              Sign In
            </Link>
          )}
        </Container>
      </NavBar>
    </header>
  );
};

export default Header;
