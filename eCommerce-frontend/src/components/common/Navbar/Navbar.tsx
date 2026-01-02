import { Link, NavLink } from "react-router-dom";
import {
  Navbar as BsNavbar,
  Container,
  Nav,
  NavDropdown,
} from "react-bootstrap";

import useNavbar from "./useNavbar";

const Navbar = () => {
  const {
    expanded,
    toggleNavbar,
    closeNavbar,
    accessToken,
    user,
    logoutHandler,
  } = useNavbar();

  return (
    <BsNavbar
      expand="lg"
      className="bg-body-tertiary"
      bg="dark"
      data-bs-theme="dark"
      expanded={expanded}
    >
      <Container>
        <BsNavbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={toggleNavbar}
        />
        <BsNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" onClick={closeNavbar}>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/categories" onClick={closeNavbar}>
              Categories
            </Nav.Link>
          </Nav>
          <Nav>
            {!accessToken ? (
              <>
                <Nav.Link as={NavLink} to="/register" onClick={closeNavbar}>
                  Register
                </Nav.Link>
                <Nav.Link as={NavLink} to="/login" onClick={closeNavbar}>
                  Login
                </Nav.Link>
              </>
            ) : (
              <NavDropdown
                title={`Welcome ${user?.firstName} ${user?.lastName}`}
              >
                <NavDropdown.Item
                  as={NavLink}
                  to={"/profile"}
                  end // exact
                  onClick={closeNavbar}
                >
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={NavLink}
                  to={"/profile/orders"}
                  end // exact
                  onClick={closeNavbar}
                >
                  Orders
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to={"/"} onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
};

export default Navbar;
