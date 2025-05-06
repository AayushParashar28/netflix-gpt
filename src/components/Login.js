import React, { useState } from "react";
import Header from "./Header";

export const Login = () => {
  const [isSigninForm, setisSigninForm] = useState(true);

  const toggleSignInForm = () => {
    setisSigninForm(!isSigninForm);
  };
  return (
    <div className="absolute to h-screen w-screen">
      <Header />
      {/* Background image */}
      <img
        className="absolute w-full h-full object-cover -z-10"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        alt="background"
      />

      {/* Dark overlay */}
      <div className="absolute w-full h-full bg-black bg-opacity-60 -z-10"></div>

      {/* Sign In Form */}
      <form className="max-w-md mx-auto my-36 bg-black bg-opacity-75 p-12 rounded-lg text-white">
        <h1 className="text-3xl font-bold mb-6">
          {isSigninForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSigninForm && (
          <input
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
          type="text"
          placeholder="Email or mobile number"
          className="w-full p-3 mb-4 rounded bg-gray-700 placeholder-gray-400 focus:outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 rounded bg-gray-700 placeholder-gray-400 focus:outline-none"
        />

        <button className="w-full bg-red-600 hover:bg-red-700 p-3 rounded font-semibold">
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
