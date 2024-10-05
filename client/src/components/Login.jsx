import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";

const quotes = {
  institution:
    "Your work is making a real and lasting impact on our communities.",
  shopkeeper: "Thank you for being a part of our community.",
  donor: "Your generosity changes lives. Thank you!",
};

const LoginComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const userType = localStorage.getItem("userType");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    data.role = userType;
    setLoading(true);
    const res = await dispatch(login(data));
    console.log(res);

    if (res.type === "login/fulfilled") {
      navigate(`/${userType}-dashboard`);
      setLoading(false);
    }
    setLoading(false);
  };
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg ">
        <h2 className="text-2xl font-bold mb-4 text-center capitalize">
          {userType} Login
        </h2>
        <p className="text-center text-gray-600 mb-6 italic">
          {quotes[userType]}
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
