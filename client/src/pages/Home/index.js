import React, { useState, useEffect } from "react";
import Header from "../../components/header/index.js";
import axios from "axios";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./styles.css";
import { Link, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import cap from "../../images/cap.png";
import loggedInUser from "../../services/auth.service";
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import "aos/dist/aos.css";

let images = require.context("../../images", true);

/*****************************************************************************/

export default function Home() {
  const location = useLocation();
  const [currIndex, setCurrIndex] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [registerName, setRegisterName] = useState("Name");
  const [registerEmail, setRegisterEmail] = useState("Name");
  const [registerPassword, setRegisterPassword] = useState("Name");
  const [loginEmail, setLoginEmail] = useState("Name");
  const [loginPassword, setLoginPassword] = useState("Name");
  const [isLoading, setIsLoading] = useState(false);
  const user = loggedInUser();

  useEffect(() => {
    // Check if we should show login modal when navigating from other pages
    if (location.state?.showLogin) {
      setShowLogin(true);
      setShowRegister(false);
    }
  }, [location]);

  function handleImageHover(index) {
    setCurrIndex(index);
  }

  function openLoginModal() {
    setShowRegister(false);
    setShowLogin(true);
  }

  function openRegisterModal() {
    setShowLogin(false);
    setShowRegister(true);
  }

  async function onLoginSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const loginObject = {
        email: loginEmail,
        password: loginPassword,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/login`,
        loginObject
      );
      if (response.status === 200) {
        toast.success(response.data.msg);
        setShowLogin(false);
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: response.data.fullname,
            id: response.data._id,
            token: response.data.token,
          })
        );
        window.location.reload(false);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.msg || "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function onRegisterSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const registerObject = {
        fullname: registerName,
        email: registerEmail,
        password: registerPassword,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/register`,
        registerObject
      );
      if (response.status === 200) {
        toast.success(response.data.msg);
        setShowRegister(false);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.msg || "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  function closeModal() {
    setShowLogin(false);
    setShowRegister(false);
  }

  const content = [
    {
      title: "This Diwali...",
      description:
        "Spread the light of joy 🪔 Gift a smile by donating your gently used clothes for someone in need. Every piece of clothing can bring warmth and dignity to someone's life.",
      image: "diwali.jpg",
    },
    {
      title: "Connect & Share",
      description:
        "Register and share your pre-loved clothes - from summer wear to winter essentials, formal attire to casual outfits. Every donation counts in making a difference.",
      image: "holi.jpg",
    },
    {
      title: "Find Donation Centers",
      description:
        "Connect with various Donation Centers across the globe. Whether you want to donate or receive clothes, we make it easy to spread kindness and support those in need.",
      image: "christmas.jpg",
    },
  ];
  return (
    <div className="root">
      <Header />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="home-container">
        <div className="explore-container">
          <div className="content-wrapper">
            <TransitionGroup>
              <CSSTransition key={currIndex} timeout={800} classNames="content">
                <div className="content-slide">
                  <h1 className="explore-title">{content[currIndex].title}</h1>
                  <p className="explore-description">
                    {content[currIndex].description}
                  </p>
                </div>
              </CSSTransition>
            </TransitionGroup>
          </div>

          {user ? (
            <Link
              to="/globe"
              className="explore-button"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Explore
            </Link>
          ) : (
            <button
              className="explore-button"
              data-aos="fade-up"
              data-aos-delay="200"
              onClick={openRegisterModal}
            >
              Register
            </button>
          )}
        </div>
        <div className="explore-slider">
          <div className="images">
            {content.map((item, index) => (
              <div
                key={index}
                className="image-container"
                onMouseEnter={() => handleImageHover(index)}
              >
                <img
                  className={
                    index === currIndex ? "active-image" : "nonActive-image"
                  }
                  src={images(`./${item.image}`)}
                  alt={item.title}
                />
                <div className="image-overlay">
                  <span className="image-title">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CSSTransition
        in={showLogin}
        timeout={300}
        classNames="modal"
        unmountOnExit
      >
        <div className="modal" style={{ display: showLogin ? "flex" : "none" }}>
          <div className="form">
            <h2 className="form-title">Welcome Back! 🪔</h2>
            <form onSubmit={onLoginSubmit} className="form-content">
              <div>
                <label htmlFor="login-email">Email</label>
                <input
                  id="login-email"
                  type="email"
                  placeholder="Enter your email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="login-password">Password</label>
                <input
                  id="login-password"
                  type="password"
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>
              <div className="buttons">
                <button
                  type="submit"
                  className="explore-button"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </button>
                <button
                  type="button"
                  className="explore-button close"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </form>
            <p className="extra-line" onClick={openRegisterModal}>
              New to Charity? Sign Up
            </p>
          </div>
        </div>
      </CSSTransition>

      <CSSTransition
        in={showRegister}
        timeout={300}
        classNames="modal"
        unmountOnExit
      >
        <div
          className="modal"
          style={{ display: showRegister ? "flex" : "none" }}
        >
          <div className="form">
            <h2 className="form-title">Welcome to Charity 🪔</h2>
            <p className="extra-line">
              Share the light of kindness through your donations :)
            </p>
            <form onSubmit={onRegisterSubmit} className="form-content">
              <div>
                <label htmlFor="register-name">Name</label>
                <input
                  id="register-name"
                  type="text"
                  placeholder="Enter your full name"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="register-email">Email</label>
                <input
                  id="register-email"
                  type="email"
                  placeholder="Enter your email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="register-password">Password</label>
                <input
                  id="register-password"
                  type="password"
                  placeholder="Create a password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  required
                />
              </div>
              <div className="buttons">
                <button
                  type="submit"
                  className="explore-button"
                  disabled={isLoading}
                >
                  {isLoading ? "Registering..." : "Register"}
                </button>
                <button
                  type="button"
                  className="explore-button close"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </form>
            <p className="extra-line" onClick={openLoginModal}>
              Already a member? Log in
            </p>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
}
