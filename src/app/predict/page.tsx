"use client";
import React from "react";
import PredictForm from "./form";
export default function Predict() {
  return (
    <section className="my-10">
      <h2 className="text-4xl text-center text-primary font-semibold">
        Predict the price of the laptop
      </h2>

      <PredictForm />
    </section>
  );
}
