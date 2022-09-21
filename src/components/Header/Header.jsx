import { useContext } from "react";
import { JwtContext } from "../../contexts/jwtContext";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Buttons/Button";
import "./Header.css";

const Header = () => {
  const { user, logout } = useContext(JwtContext);
  let navigate = useNavigate();

  return (
    <header>
      <nav>
        <div className="upperside">
          <div className="logo_container"></div>
          <div className="upperside_title">
            <Link to="/">
              <h1>ArtistHub</h1>
            </Link>
          </div>
        </div>
        <ul className="header_ul">
          <li>
            <Link to="/">
              <Button buttonStyle="headerbutton" buttonSize="small">
                Home
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/artists">
              <Button buttonStyle="headerbutton" buttonSize="small">
                Artists
              </Button>
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link to="/profile">
                  <Button buttonStyle="headerbutton" buttonSize="small">
                    Profile
                  </Button>
                </Link>
              </li>
              <li>
                <Button
                  buttonStyle="headerbutton"
                  buttonSize="small"
                  onClick={() => logout() & navigate("/login")}
                >
                  Logout
                </Button>
              </li>
              <li>
                <div className="username_avatar_container">
                  <p>{user.username}</p>
                  {user.avatar !== undefined ? (
                    <div className="avatar_container">
                      <img src={user?.avatar} alt="Avatar" />
                    </div>
                  ) : null}
                </div>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">
                  <Button buttonStyle="headerbutton" buttonSize="small">
                    Log in
                  </Button>
                </Link>
              </li>
              <li>
                <Link to="/register">
                  <Button buttonStyle="headerbutton" buttonSize="small">
                    Register
                  </Button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
