"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN, LOGOUT } from "@/redux/features/authSlice";
import axios from "@/api/axios";




export default function LoginForm() {
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const [loggedIn, setLoggedIn] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const LOGIN_URL = "/api/login";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(LOGIN_URL, {
        email,
        password,
      });

      const { token } = response.data;
      // dispatch({ type: "LOGIN", payload: { token, email } });
      dispatch(LOGIN({token, email}))
      
      setTimeout(()=>{
        router.push("/dashboard");
      }, 3000)
      
      setLoggedIn(true);
      console.log(token);
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const userToken = useSelector((state) => state?.user?.auth?.token);
  useMemo(() => {
    console.log(userToken);
    userToken ? setLoggedIn(true) : setLoggedIn(false);
  }, []);

  const logOut = () => {
    // dispatch({ type: "LOGOUT" });
    dispatch(LOGOUT())

    setLoggedIn(false);
  };

  return (
    <section className=" max-w-md mx-auto rounded-xl md:max-w-2xl">
      <div className="relative flex flex-col items-center mt-32 justify-center  ">
        {loggedIn ? (
          <div className="w-full p-6 bg-white rounded-md shadow-2xl lg:max-w-xl"> 
            <h3 className="text-3xl font-bold text-center text-gray-700 mb-20 mt-10">You Are Logged In</h3>
            <button
              onClick={logOut}
              type="button"
              className=" w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Log out
            </button>
          </div>
        ) : (
          <div className="w-full p-6 bg-white rounded-md shadow-2xl lg:max-w-xl">
            <h1 className="text-3xl font-bold text-center text-gray-700">
              Hi, Please Login
            </h1>
            <form onSubmit={handleSubmit} className="mt-6">
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Email
                </label>
                <input
                  value={email}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Password
                </label>
                <input
                  value={password}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div className="mt-2">
                <button
                  type="submit"
                  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 mt-8"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
