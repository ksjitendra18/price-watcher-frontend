"use client";

import Head from "next/head";
import Link from "next/link";
import { FormEvent, useRef } from "react";
import { URL } from "../utils/url";
import { useRouter } from "next/navigation";
export default function Signup() {
  const userNameRef = useRef<HTMLInputElement>(null);
  const userEmailRef = useRef<HTMLInputElement>(null);
  const userPasswordRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  async function handleSignup(event: FormEvent) {
    event.preventDefault();
    try {
      const res = await fetch(`${URL}/auth/signup`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userNameRef.current?.value,
          email: userEmailRef.current?.value,
          password: userPasswordRef.current?.value,
        }),
      });

      const resData = await res.json();

      if (resData.success === true) {
        router.push("/");
      }
    } catch (e: any) {
      throw new Error("Error in signup", e);
    }
  }

  return (
    <section className="flex flex-col mt-20 items-center justify-center">
      <Head>
        <title>Signup | Price Watcher</title>
      </Head>
      <h2 className="text-5xl font-semibold">Signup</h2>

      <form className="md:w-[500px] mt-10 md:mx-auto" onSubmit={handleSignup}>
        <div className="w-full ">
          <label htmlFor="name" className="block">
            Name
          </label>
          <input
            type="name"
            placeholder="Enter your name"
            id="name"
            name="name"
            className="border border-primary w-full focus-within:bg-gray-100 rounded-lg px-3 py-2 text-black"
            ref={userNameRef}
            required
          />
        </div>
        <div className="w-full mt-3">
          <label htmlFor="email" className="block">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            id="email"
            name="email"
            className="border border-primary w-full focus-within:bg-gray-100 rounded-lg px-3 py-2 text-black"
            ref={userEmailRef}
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
            Signup
          </button>
        </div>

        <p className="mt-5">
          Already have an account?{" "}
          <span className="font-semibold">
            <Link href="/login">Login</Link>
          </span>
        </p>
      </form>
    </section>
  );
}
