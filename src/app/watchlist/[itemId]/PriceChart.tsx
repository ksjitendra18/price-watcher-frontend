import React, { useState } from "react";
import { UserData } from "./Data";
import LineChart from "./LineChart";
import { useRouter } from "next/router";
import PricesData from "@/app/types/PricesData";
export default function PriceChart({
  itemId,
  pricesData,
}: {
  itemId: string;
  pricesData: PricesData[];
}) {
  console.log("pricesData is", pricesData);

  const formatDate = (date: string | Date) => {
    const parseDate = new Date(date);
    const display = parseDate.getDay();

    // console.log("I got", date);
    // console.log("I parsed", parseDate);
    // console.log("display", display);

    return display;
  };

  const formattedDates = pricesData?.forEach((data) => console.log(data));

  // const formattedDate = new Date(pricesData[0].updated_at).toLocaleString(
  //   "en-US",
  //   {
  //     year: "numeric",
  //     month: "2-digit",
  //     day: "2-digit",
  //     hour: "2-digit",
  //     minute: "2-digit",
  //   }
  // );
  const formattedDate = new Date(pricesData[0].updated_at).toLocaleString(
    "en-IN",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      // hour: "2-digit",
      // minute: "2-digit",
    }
  );

  console.log("formatted", formattedDate);

  // console.log("formattedDate", formatDate, typeof pricesData[0].updated_at);
  const [userData, setUserData] = useState({
    // labels: UserData.map((data) => data.year),
    // labels: pricesData.map((data) => new Date(data.updated_at)),
    labels: pricesData.map((data) =>
      new Date(data.updated_at).toLocaleString("en-IN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
    ),
    datasets: [
      {
        label: "Users Gained",
        // data: UserData.map((data) => data.userGain),
        data: pricesData.map((data) => data.price),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });
  return (
    <section className="mt-5">
      <div style={{ width: 700 }}>
        <LineChart chartData={userData} />
      </div>
    </section>
  );
}
