import "./login.scss";
import loginLogo from "../../images/login-logo.png";
import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "../firebase/firebase-config.js";
import { Navigate } from "react-router-dom";
const Login = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginWithGoogle, setLoginWithGoogle] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const register = async (event) => {
    event.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
      setLoggedIn(true);
    } catch (error) {
      alert("Invalid email or password");
    }
  };

  const login = async (event) => {
    event.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
      setLoggedIn(true);
    } catch (error) {
      alert("Invalid email or password");
    }
  };

  const loginGoogle = async (event) => {
    event.preventDefault();
    try {
      const result = await signInWithPopup(auth, provider);
      setLoginWithGoogle(result.user.email);
      localStorage.setItem("email", result.user.email);
      setLoggedIn(true);
    } catch (error) {
      alert("Invalid email or password");
    }
  };

  // const loginGoogle = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, provider);
  //     setLoginWithGoogle(result.user.email);
  //     localStorage.setItem("email", result.user.email);
  //     setLoggedIn(true);
  //   } catch (error) {
  //     alert("Invalid email or password");
  //   }
  // };

  useEffect((event) => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setLoginWithGoogle(storedEmail);
    }
  }, []);

  if (user) {
    return <Navigate to="/home" user={user} setUser={setUser} />;
  }
  return (
    <div className="login">
      <div className="container">
        <img src={loginLogo} alt="logo" />
        <div className="container-content">
          <div className="description">
            <p>
              Do you forget where you have placed important items regularly?
              Lafih has a solution. Lafih is designed to help users keep track
              of the items they have placed in their house. Users can easily
              create an inventory of their belongings by adding the name of the
              item and its location in the house. Lafih is a valuable tool for
              users who want to keep their home organized and ensure that they
              can easily locate important items when they need them.
            </p>
          </div>
          <div className="sign-up">
            <div className="register-user">
              <form>
                <h3>Create User</h3>
                <input
                  placeholder="Email..."
                  onChange={(event) => {
                    setRegisterEmail(event.target.value);
                  }}
                />
                <input
                  placeholder="Password..."
                  onChange={(event) => {
                    setRegisterPassword(event.target.value);
                  }}
                />
                <button type="submit" onClick={register}>
                  Create
                </button>
              </form>
            </div>
            <div className="login-user">
              <form>
                <h3>Login User</h3>
                <input
                  placeholder="Email..."
                  onChange={(event) => {
                    setLoginEmail(event.target.value);
                  }}
                />
                <input
                  placeholder="Password..."
                  onChange={(event) => {
                    setLoginPassword(event.target.value);
                  }}
                />
                <button onClick={login}>Login</button>

                <button
                  type="submit"
                  onClick={loginGoogle}
                  className="signin-google"
                >
                  <i className="fa fa-google fa-fw"></i>
                  Sign in with Google
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
