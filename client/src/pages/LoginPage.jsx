import { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  loginUser,
} from "../services/authService";

export default function LoginPage() {
  const [email, setEmail] =
    useState("admin@example.com");

  const [password, setPassword] =
    useState("password123");

  const [loading, setLoading] =
    useState(false);

  const navigate = useNavigate();

 
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response =
        await loginUser(
          email,
          password
        );

      const { token, user } =
        response.data.data;

        localStorage.setItem(
        "token",
        token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      
      navigate("/");
    } catch (error) {
      console.error(
        "Login failed:",
        error
      );

      if (
        error.response?.data?.message
      ) {
        alert(
          error.response.data.message
        );
      } else {
        alert("Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">

       
        <div className="flex justify-center mb-6">

          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
            C
          </div>
        </div>

        
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Candidate Dashboard
        </h1>

        <p className="text-gray-500 text-center mt-2 mb-8">
          Sign in to continue
        </p>

        
        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            placeholder="Email address"
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none"
          />

       
          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            placeholder="Password"
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none"
          />

      
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl transition disabled:opacity-50"
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}