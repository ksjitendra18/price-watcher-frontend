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
      className=" bg-primary text-white rounded-lg px-4 py-2 flex items-center flex-col gap-5 md:flex-row md:justify-between"
    >
      <p>{watchlist.itemName.substring(0, 60) + "..."}</p>

      <div className="flex items-center gap-5">
        {watchlist.itemPrice < watchlist.itemPreviousPrice ? (
          <p className="bg-green-300 rounded-md text-sm text-gray-700 font-bold px-2 ">
            Price Dropped
          </p>
        ) : null}
        {watchlist.itemPrice > watchlist.itemPreviousPrice ? (
          <p className="bg-red-300 rounded-md text-sm text-gray-700 font-bold px-2 ">
            Price Increased
          </p>
        ) : null}
        <p>
          &#8377;{new Intl.NumberFormat("en-IN").format(watchlist.itemPrice)}
        </p>
      </div>
    </Link>
  );
}
