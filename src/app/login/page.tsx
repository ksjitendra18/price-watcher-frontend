"use client";

import Head from "next/head";
import Link from "next/link";
import { FormEvent, useRef } from "react";
import { URL } from "../utils/url";

import Cookies from "js-cookie";
import useAuthStore from "../store/authStore";
import { useRouter } from "next/navigation";
export default function Login() {
  const router = useRouter();

  const userEmailRef = useRef<HTMLInputElement>(null);
  const userPasswordRef = useRef<HTMLInputElement>(null);

  const { setUser } = useAuthStore();

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    const res = await fetch(`${URL}/auth/login`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: userEmailRef.current?.value,
        password: userPasswordRef.current?.value,
      }),
    });

    const resData = await res.json();

    if (resData.success === true) {
      const token = res.headers.get("x-auth-token");
      console.log("token is", res.headers);
      Cookies.set("auth-token", token!, {
        expires: 1,
        sameSite: "lax",
      });

      setUser(resData.data);
      router.push("/");
    }
  }
  return (
    <section className="flex flex-col mt-20 items-center justify-center">
      <Head>
        <title>Login | Price Watcher</title>
      </Head>
      <h2 className="text-5xl font-semibold">Login</h2>

      <form className="md:w-[500px] mt-10 md:mx-auto" onSubmit={handleLogin}>
        <div className="w-full ">
          <label htmlFor="email" className="block">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            id="email"
            name="email"
            ref={userEmailRef}
            className="border border-primary w-full focus-within:bg-gray-100 rounded-lg px-3 py-2 text-black"
            required
          />
        </div>
        <div className="w-full mt-3 ">
          <label htmlFor="password" className="block">
            Password
          </label>
          <input
            type="password"
            placeholder="6+ characters"
            id="password"
            name="password"
            ref={userPasswordRef}
            className="border border-primary w-full focus-within:bg-gray-100 rounded-lg px-3 py-2 text-black"
            required
          />
        </div>

        <div className="flex justify-end mt-5">
          <button className="px-5 py-2 rounded-lg bg-primary text-white">
            Login
          </button>
        </div>

        <p className="mt-5">
          Don&apos;t have an account?{" "}
          <span className="font-semibold">
            <Link href="/signup">Signup</Link>
          </span>
        </p>
      </form>
    </section>
  );
}
