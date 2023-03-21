"use client";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useAuthStore from "../store/authStore";

export default function Watchlist() {
  const router = useRouter();
  const { user } = useAuthStore();

  if (!user) {
    router.replace("/");
  }
  return (
    <section>
      <Head>
        <title>Watchlist | Price Watcher</title>
      </Head>
      <div className="flex items-center flex-col md:flex-row justify-between md:justify-start gap-5 mt-5 ">
        <h2 className="text-4xl text-primary font-semibold ">
          Your watchlists
        </h2>
        <Link
          className="bg-primary px-5 py-2 text-white rounded-lg"
          href="/watchlist/new"
        >
          Add new item to watchlist
        </Link>
      </div>
    </section>
  );
}
