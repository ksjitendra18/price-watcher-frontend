"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import Cookies from "js-cookie";
import checkAuth from "../utils/checkAuth";

export default function Navbar() {
  const [openNav, setOpenNav] = useState(false);
  const { user, logout, setUser } = useAuthStore();

  useEffect(() => {
    console.log("use effect ran");
    async function setAuth() {
      const userData = await checkAuth();
      setUser(userData.data);
    }
    setAuth();
  }, []);

  return (
    <header className={`text-[18px] text-black h-[50px] md:h-[80px] sticky `}>
      <div className="header relative  py-2 md:py-4 px-5 md:px-11 flex justify-between items-center">
        {/* <h1 className={`${dmSans.className} font-bold text-3xl`}> */}
        <h1 className="font-bold text-2xl md:text-3xl">
          <Link href="/">Price Predictor</Link>
        </h1>

        <div className="hidden md:flex items-center gap-20 ">
          <ul className="text-[20px] flex items-center gap-5 ">
            <li>
              <Link href="/">Home</Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link href="/predict">Predict</Link>
                </li>
                <li>
                  <Link href="/watchlist">Watchlist</Link>
                </li>
              </>
            ) : null}
          </ul>

          {user ? (
            <div className="cta flex items-center flex-col md:flex-row justify-center gap-5 md:gap-7">
              <button
                onClick={() => logout()}
                className="bg-primary text-white font-semibold px-6 py-2 rounded-lg"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="cta flex items-center flex-col md:flex-row justify-center gap-5 md:gap-7">
              <Link
                href="/login"
                className="bg-primary text-white font-semibold px-6 py-2 rounded-lg"
              >
                Login
              </Link>
            </div>
          )}
        </div>
        <div
          className={`${
            openNav ? "active" : ""
          } hamburger  block md:hidden mt-1 cursor-pointer`}
          onClick={() => {
            setOpenNav((prev) => !prev);
          }}
        >
          <span className="bar block w-[30px] h-[4px] bg-black "></span>
          <span className="bar block w-[30px] mt-1 h-[4px] bg-black "></span>
          <span className="bar block w-[30px] mt-1 h-[4px] bg-black "></span>
        </div>
      </div>

      {openNav && (
        <nav className="top-10 right-0 py-5 shadow-md w-[100%] text-white absolute flex flex-col justify-center h-auto bg-primary items-center md:hidden">
          <ul className="flex flex-col items-center gap-5 ">
            <li onClick={() => setOpenNav(false)}>
              <Link href="/">Home</Link>
            </li>

            {user ? (
              <li onClick={() => setOpenNav(false)}>
                <Link href="/watchlist">Watchlist</Link>
              </li>
            ) : null}
          </ul>

          <div className="cta mt-10 flex flex-col items-center">
            {user ? (
              <div className="cta flex items-center flex-col md:flex-row justify-center gap-5 md:gap-7">
                <button
                  onClick={() => logout()}
                  className="bg-white text-primary font-bold px-6 py-2 rounded-lg"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="cta flex items-center flex-col md:flex-row justify-center gap-5 md:gap-7">
                <Link href="/login">
                  <p>Login</p>
                </Link>
                <Link href="/signup">
                  <button className="bg-white text-primary font-bold px-6 py-2 rounded-lg">
                    Signup
                  </button>
                </Link>
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
