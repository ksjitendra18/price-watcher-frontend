import React from "react";
import { WatchlistType } from "../types/Watchlist";
import Link from "next/link";

export default function WatchListCard({
  watchlist,
}: {
  watchlist: WatchlistType;
}) {
  return (
    <Link
      href={`/watchlist/${watchlist.itemId}`}
      className=" bg-primary text-white rounded-lg px-4 py-2 flex items-center md:justify-between"
    >
      <p>{watchlist.itemName.substring(0, 60) + "..."}</p>
      <p>&#8377;{new Intl.NumberFormat("en-IN").format(watchlist.itemPrice)}</p>
    </Link>
  );
}
