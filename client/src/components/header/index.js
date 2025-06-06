import "./styles.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import loggedInUser from "../../services/auth.service";

export default function Header() {
  const user = loggedInUser();
  const location = useLocation();
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("user");
    window.location.reload(false);
  }

  const isDarkHeader =
    location.pathname !== "/" && location.pathname !== "/donation-centers";

  const handleLoginClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      // If we're on the home page, trigger the login modal
      const loginModal = document.querySelector(".modal");
      if (loginModal) {
        loginModal.style.display = "flex";
        // Also hide the register modal if it's open
        const registerModal = document.querySelector(".modal:nth-child(2)");
        if (registerModal) {
          registerModal.style.display = "none";
        }
      }
    } else {
      // If we're on another page, navigate to home and trigger login
      navigate("/", { state: { showLogin: true } });
    }
  };

  return (
    <div
      className={isDarkHeader ? "header-container-dark" : "header-container"}
    >
      <Link to="/" className={isDarkHeader ? "logo-dark" : "logo"}>
        Charity
      </Link>
      <div className={isDarkHeader ? "links-dark" : "links"}>
        <Link to="/" className={isDarkHeader ? "link-dark" : "link"}>
          Home
        </Link>
        <Link to="/globe" className={isDarkHeader ? "link-dark" : "link"}>
          Explore
        </Link>
        <Link
          to="/donation-centers"
          className={isDarkHeader ? "link-dark" : "link"}
        >
          Donation Centers
        </Link>
      </div>
      {user ? (
        <div
          className={isDarkHeader ? "UserName-dark" : "UserName"}
          onClick={logout}
        >
          Logout
        </div>
      ) : (
        <button
          onClick={handleLoginClick}
          className={isDarkHeader ? "Login-dark" : "Login"}
        >
          Login
        </button>
      )}
    </div>
  );
}
