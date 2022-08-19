import React from "react";
import logo from "./logo.png";
import "./header.css";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const Header = () => {
  // Signs-in Friendly Chat.
  async function signIn() {
    // Sign in Firebase using popup auth and Google as the identity provider.
    var provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider);
  }

  console.log(!!getAuth().currentUser);
  function signOutUser() {
    // Sign out of Firebase.
    signOut(getAuth());
  }

  return (
    <div className="headerbar">
      <div className="row" id="headerrow">
        <div className="col-2" id="logosection">
          <div id="logo"></div>
          <p className="sitetitle">Third AI</p>
        </div>
        <div className="col-8" id="middlesection"></div>
        {!!getAuth().currentUser ? (
          <div className="col-2" id="loginsection">
            <img
              className="userpropic"
              src={getAuth().currentUser.photoURL}
              width="50px"
            />
          </div>
        ) : (
          <div className="col-2" id="loginsection">
            <button className="loginbutton" onClick={signIn}>
              Log In
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
