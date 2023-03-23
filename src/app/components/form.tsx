"use client";

import Image from "next/image";
import { FormEvent, useRef, useState } from "react";
import useSWR from "swr";
import Loading from "./loadingSpinner";
import { URL } from "../utils/url";
import Product from "../types/Product";
import ScrapeResponseData from "../types/ScrapeResponseData";
import Cookies from "js-cookie";
import Link from "next/link";

export default function Form() {
  const productUrlRef = useRef<HTMLInputElement>(null);

  const [productData, setProductData] = useState<Product | null>();

  const [productDataProvider, setProductDataProvider] = useState<
    string | null
  >();
  const [productSavedId, setProductSavedId] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const cookie = Cookies.get("auth-token");
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setProductData(null);
    setProductDataProvider(null);
    setProductSavedId("");

    setLoading(true);
    const userInput = productUrlRef.current!.value;
    console.log("cookie are", cookie);
    if (userInput.includes("amazon")) {
      const res = await fetch(`${URL}/scrape/amazon`, {
        method: "post",
        headers: { "Content-Type": " application/json", authtoken: cookie! },

        body: JSON.stringify({ url: userInput }),
      });

      const resData: ScrapeResponseData = await res.json();
      setProductData(resData.productData);
      setProductDataProvider(resData.provider);
      setProductSavedId(resData.savedItemId.itemId);
    } else if (userInput.includes("flipkart")) {
      const res = await fetch(`${URL}/scrape/flipkart`, {
        method: "post",
        headers: { "Content-Type": " application/json", authtoken: cookie! },
        body: JSON.stringify({ url: userInput }),
      });

      const resData: ScrapeResponseData = await res.json();
      setProductDataProvider(resData.provider);
      setProductData(resData.productData);
      setProductSavedId(resData.savedItemId.itemId);
    } else {
      setLoading(false);
      return;
    }

    setLoading(false);
  }

  console.log("product data is", productSavedId);
  return (
    <>
      <form
        className=" items-center flex-col md:flex-row mt-5 flex gap-5"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="block" htmlFor="productUrl">
            Enter product url
          </label>

          <input
            type="text"
            className="border-solid md:w-[700px] border-2 border-black px-4 py-2 rounded-lg "
            id="productUrl"
            name="productUrl"
            ref={productUrlRef}
          />
        </div>

        {!loading ? (
          <>
            <button className="md:mt-5 px-5 py-2 rounded-lg bg-slate-900 text-white">
              Search
            </button>
          </>
        ) : (
          <>
            <div className="flex gap-2 items-center md:mt-5 px-5 py-2 rounded-lg bg-slate-900 text-white">
              <Loading color="white" w={6} />
              <p>Searching...</p>
            </div>
          </>
        )}
      </form>

      {/* {loading ? (
        <>
          <div className="flex w-full mt-10 items-center justify-center">
            <Loading />
          </div>
        </>
      ) : null} */}
      {productData ? (
        <div className="mt-10 md:mt-16 w-full flex flex-col md:flex-row items-center  gap-10">
          <div>
            {productData.imageUrl ? (
              <Image
                src={productData.imageUrl}
                alt=""
                width={600}
                height={600}
              />
            ) : null}
          </div>
          <div>
            <p className="text-xl">
              <span className="font-semibold text-xl">Name: </span>{" "}
              {productData?.name}
            </p>
            <p className="text-xl mt-3">
              <span className="font-semibold">Price: </span>{" "}
              {/* {productData?.price} */}
              &#8377;
              {new Intl.NumberFormat("en-IN").format(productData?.price)}
            </p>

            <div className="mt-10 flex flex-col md:flex-row gap-5 items-center md:justify-start justify-between">
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
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

// {productData ? (
//   <div className="w-full flex flex-col md:flex-row items-center  gap-10">
//     <div>
//       {productData.imageUrl ? (
//         <Image
//           src={productData.imageUrl}
//           alt=""
//           width={600}
//           height={600}
//         />
//       ) : null}
//     </div>
//     <div>
//       <p className="text-xl">
//         <span className="font-semibold text-xl">Name: </span>{" "}
//         {productData?.name}
//       </p>
//       <p className="text-xl mt-3">
//         <span className="font-semibold">Price: </span>{" "}
//         {productData?.price}
//       </p>
//     </div>
//   </div>
// ) : null}

{
  /* <div className="mt-5 rounded-xl px-5 drop-shadow-md  md:w-[600px] md:mx-auto border-2 border-primary flex flex-col  items-center  gap-10">
<div>
  {productData.imageUrl ? (
    <Image
      src={productData.imageUrl}
      alt=""
      width={300}
      height={300}
    />
  ) : null}
</div>
<div>
  <p className="text-xl">
    <span className="font-semibold text-xl">Name: </span>{" "}
    {productData?.name}
  </p>
  <p className="text-xl mt-3">
    <span className="font-semibold">Price: </span>{" "}
    {productData?.price}
  </p>
</div>
</div> */
}
