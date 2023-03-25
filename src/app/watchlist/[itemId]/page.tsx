"use client";
import Loading from "@/app/components/loadingSpinner";
import { WatchlistType } from "@/app/types/Watchlist";
import { URL } from "@/app/utils/url";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function IndividualItem({
  params,
}: {
  params: { itemId: string };
}) {
  const [watchListData, setWatchListData] = useState<WatchlistType>();
  const [isLoading, setisLoading] = useState(true);
  const fetchWatchlist = async () => {
    const authToken = Cookies.get("auth-token");

    console.log("check auth", authToken);
    const res = await fetch(`${URL}/watchlist/${params.itemId}`, {
      headers: { "auth-token": authToken! },
    });
    const resData = await res.json();
    console.log(resData);

    setWatchListData(resData.data);
    setisLoading(false);
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);
  console.log("slug is", watchListData);

  if (isLoading) {
    return (
      <div className="flex mt-20 items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!watchListData) {
    return (
      <div className="mt-32 flex items-center flex-col justify-center">
        <h2 className="text-center text-5xl font-semibold">404 Not found!</h2>
        <p className="text-center text-xl mt-5">Please check the link!</p>
        <Link
          href="/"
          className="mt-8 bg-primary text-white px-7 py-2 rounded-lg"
        >
          Go to homepage
        </Link>
      </div>
    );
  }
  return (
    <section>
      <div className="mt-10 md:mt-16 w-full flex flex-col md:flex-row items-center  gap-10">
        <div>
          {watchListData?.itemImage ? (
            <Image
              src={watchListData.itemImage}
              alt=""
              width={600}
              height={600}
            />
          ) : null}
        </div>
        <div>
          <p className="text-xl">
            <span className="font-semibold text-xl">Name: </span>{" "}
            {watchListData?.itemName}
          </p>

          <div className="flex gap-5 items-center">
            <p className="text-xl mt-3">
              <span className="font-semibold">Price: </span>{" "}
              {/* {productData?.price} */}
              &#8377;
              {new Intl.NumberFormat("en-IN").format(watchListData?.itemPrice!)}
            </p>
            {watchListData.itemPrice < watchListData.itemPreviousPrice ? (
              <>
                <p className="text-xl mt-3 line-through">
                  (&#8377;
                  {new Intl.NumberFormat("en-IN").format(
                    watchListData?.itemPreviousPrice!
                  )}
                  )
                </p>

                <p className="text-xl font-semibold mt-3 text-green-500">
                  {(
                    100 -
                    (watchListData.itemPrice /
                      watchListData.itemPreviousPrice) *
                      100
                  ).toFixed(2) + "% Reduced"}
                </p>
              </>
            ) : null}
          </div>

          <div className="mt-8">
            <a
              href={watchListData?.itemUrl}
              className=" bg-primary text-white rounded-lg px-5 py-2"
            >
              Buy Now from {watchListData?.itemProvider}
            </a>
          </div>

          {/* <div className="mt-10 flex flex-col md:flex-row gap-5 items-center md:justify-start justify-between">
            <Link
              href={`/watchlist/${productSavedId}`}
              className="bg-primary text-white rounded-lg px-5 py-2"
            >
              Go to this watchlist
            </Link>
            <a
              href={productData.link}
              className="ml-5 bg-primary text-white rounded-lg px-5 py-2"
            >
              Buy Now from {productDataProvider}
            </a>
          </div> */}
        </div>
      </div>
    </section>
  );
}
