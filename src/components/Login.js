import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL, USER_AVATAR } from "../utils/constants";

export const Login = () => {
  const [isSigninForm, setisSigninForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message)
    if (message) return;

    if (!isSigninForm) {
      // Sign Up Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      // Sign In Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setisSigninForm(!isSigninForm);
  };

  return (
    <div className="absolute to h-screen w-screen">
      <Header />
      {/* Background image */}
      <img
        className="absolute w-full h-full object-cover -z-10"
        src={BG_URL}
        alt="background"
      />

      {/* Dark overlay */}
      <div className="absolute w-full h-full bg-black bg-opacity-60 -z-10"></div>

      {/* Sign In Form */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="max-w-md mx-auto my-36 bg-black bg-opacity-75 p-12 rounded-lg text-white"
      >
        <h1 className="text-3xl font-bold mb-6">
          {isSigninForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSigninForm && (
          <input
          ref={name} 
            type="Name"
            placeholder="Full Name"
            className="w-full p-3 mb-6 rounded bg-gray-700 placeholder-gray-400 focus:outline-none"
          />
        )}

        {!isSigninForm && (
          <input
            type="Mobile Number"
            placeholder="Mobile Number"
            className="w-full p-3 mb-6 rounded bg-gray-700 placeholder-gray-400 focus:outline-none"
          />
        )}

        <input
          ref={email}
          type="text"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded bg-gray-700 placeholder-gray-400 focus:outline-none"
        />

        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 rounded bg-gray-700 placeholder-gray-400 focus:outline-none"
        />
        <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
        <button
          className="w-full bg-red-600 hover:bg-red-700 p-3 rounded font-semibold"
          onClick={handleButtonClick}
        >
          {isSigninForm ? "Sign In" : "Sign Up"}
        </button>

        <div className="flex items-center justify-between mt-4 text-sm text-gray-400">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Remember me
          </label>
        </div>

        {/* Sign Up Form */}
        {isSigninForm && (
          <p className="mt-8 text-gray-400 text-sm">
            New to Netflix?{" "}
            <span
              className="text-white hover:underline cursor-pointer"
              onClick={toggleSignInForm}
            >
              Sign up now.
            </span>
          </p>
        )}
        {!isSigninForm && (
          <p className="mt-8 text-gray-400 text-sm">
            Already registered?{" "}
            <span
              className="text-white hover:underline cursor-pointer"
              onClick={toggleSignInForm}
            >
              Sign In now.
            </span>
          </p>
        )}
      </form>
    </div>
  );
};
