import NavBar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchBox from "./SearchBox";
import NavDropDown from "react-bootstrap/NavDropdown";
import { useContext } from "react";
import { Store } from "../../Store";
import Badge from "react-bootstrap/Badge";

const Header = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    userInfo,
    cart: { cartItems },
  } = state;
  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    navigate("/signin"); //not working. to do: when user is not signed in dont let him add items to cart!
  };
  return (
    <header>
      <NavBar bg="dark" variant="dark">
        <Container>
          <Link onClick={() => navigate(-1)}>
            {location.pathname !== "/" && (
              <i className="fa fa-arrow-left text-white align-arrow-right">
                {" "}
                Back
              </i>
            )}
          </Link>
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
              {cartItems.length > 0 && (
                <Badge pill bg="danger">
                  {cartItems.reduce((a, c) => a + c.quantity, 0)}
                </Badge>
              )}
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
