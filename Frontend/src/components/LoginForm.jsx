import React, { use, useState } from "react";
import { login } from "../apis/auth.api";
import { useSelector, useDispatch} from "react-redux";
import { login as loginAction } from "../store/slice/authSlice.js";
import { useNavigate } from "@tanstack/react-router";

const LoginForm = ({ state }) => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  console.log("Auth State:", auth);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(form.email, form.password);
      dispatch(loginAction(response));
      console.log("Login successful!");
      navigate({ to: "/dashboard" }); 
    } catch (err) {
      console.error("Login failed:", err);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email:
          </label>
          <input
            placeholder="samurl@example.com"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password:
          </label>
          <input
            placeholder="**********"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
        <div className="mt-4 text-center">
          <span className="text-gray-600 text-sm">
            Don't have an account?{" "}
            <span
              className="text-blue-500 hover:underline font-semibold cursor-pointer"
              onClick={() => state(false)}
            >
              Create New!
            </span>
          </span>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
