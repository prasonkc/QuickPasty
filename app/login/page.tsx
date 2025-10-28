"use client";
import React, { useState } from "react";
import { Github, Chrome } from "lucide-react";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-xl w-[400px] flex flex-col gap-5 p-8 rounded-2xl shadow-2xl text-white border border-white/10">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-center mb-2">
          {isLogin ? "Welcome Back" : "Welcome"}
        </h2>
        <p className="text-sm text-gray-400 text-center mb-4">
          Please log in to continue
        </p>

        {!isLogin && (
          /* Name */
          <div className="name">
            <input
              id="username"
              type="text"
              name="username"
              required
              placeholder="Enter your username"
              className="block w-full rounded-md bg-white/5 px-3 py-2 text-base text-white outline outline-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 focus:bg-white/10 transition-all"
            />
          </div>
        )}

        {/* Email */}
        <div className="email">
          <input
            id="email"
            type="email"
            name="email"
            required
            placeholder="Enter your email address"
            className="block w-full rounded-md bg-white/5 px-3 py-2 text-base text-white outline outline-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 focus:bg-white/10 transition-all"
          />
        </div>

        {/* Password */}
        <div className="password">
          <input
            id="password"
            type="password"
            name="password"
            required
            placeholder="Enter your password"
            className="block w-full rounded-md bg-white/5 px-3 py-2 text-base text-white outline outline-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 focus:bg-white/10 transition-all"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full rounded-md bg-indigo-600 py-2 text-sm font-semibold hover:bg-indigo-500 transition-all cursor-pointer shadow-md hover:shadow-indigo-500/30"
        >
          {isLogin ? "Login" : "Signup"}
        </button>

        {/* Divider */}
        <div className="flex items-center justify-center gap-2 text-gray-500 text-sm my-2">
          <div className="h-[1px] w-1/3 bg-white/10"></div>
          <span>or</span>
          <div className="h-[1px] w-1/3 bg-white/10"></div>
        </div>

        {/* Other auth providers */}
        <div className="flex items-center justify-center gap-3">
          <button className="flex items-center gap-2 rounded-md bg-white/5 px-4 py-2 hover:bg-white/10 transition cursor-pointer border border-white/10 hover:border-indigo-500/40">
            <Github className="w-5 h-5" />
            <span>GitHub</span>
          </button>
          <button className="flex items-center gap-2 rounded-md bg-white/5 px-4 py-2 hover:bg-white/10 transition cursor-pointer border border-white/10 hover:border-indigo-500/40">
            <Chrome className="w-5 h-5" />
            <span>Google</span>
          </button>
        </div>

        {/* Links */}
        <div className="mt-4 flex flex-col gap-2 text-center text-sm text-gray-400">
          <span className="hover:text-indigo-400 cursor-pointer hover:underline">
            Continue as guest
          </span>
          <span
            className="hover:text-indigo-400 cursor-pointer hover:underline"
            onClick={() => {
              setIsLogin(!isLogin);
            }}
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
