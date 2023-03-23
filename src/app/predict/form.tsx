import React, { FormEvent, useReducer, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  companies,
  cpuType,
  gpuType,
  hdd,
  laptopType,
  osType,
  ram,
  screenResolution,
  screenSize,
  ssd,
  weight,
} from "./info";
import FormInput from "./formInput";
import FormSelect from "./formSelect";
import Loading from "../components/loadingSpinner";

interface FormFields {
  company: string;
  type: string;
  ram: number;
  weight: number;
  touchScreen: string;
  ips: string;
  screenSize: number;
  screenResolution: string;
  cpu: string;
  hdd: number;
  ssd: number;
  gpu: string;
  os: string;
}
export default function PredictForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [predictedPrice, setPredictedPrice] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPricing, setShowPricing] = useState(false);

  const onSubmit: any = async (data: FormFields) => {
    // setPredictedPrice(null);
    setIsLoading(true);
    const formData = {
      ...data,
      ssd: +data.ssd,
      weight: +data.weight,
      ram: +data.ram,
      hdd: +data.hdd,
      screenSize: +data.screenSize,
    };

    try {
      const res = await fetch("http://localhost:8080/api/prediction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const resData = await res.json();
      setPredictedPrice(resData.predictedValue);
      setShowPricing(true);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw new Error("Their is error in predicting the value" + error);
    }
  };

  return (
    <section className="max-w-[800px] mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 flex gap-4 flex-col"
      >
        <FormSelect
          labelFor="company"
          labelName="Company Name"
          iterator={companies}
          register={register}
        />
        <FormSelect
          labelFor="type"
          labelName="Laptop Type"
          iterator={laptopType}
          register={register}
        />
        <FormSelect
          labelFor="os"
          labelName="Select OS Type"
          iterator={osType}
          register={register}
        />
        <FormSelect
          labelFor="cpu"
          labelName="CPU"
          iterator={cpuType}
          register={register}
        />
        <FormSelect
          labelFor="gpu"
          labelName="GPU"
          iterator={gpuType}
          register={register}
        />
        <FormSelect
          labelFor="ram"
          labelName="Ram Size"
          iterator={ram}
          register={register}
        />
        <FormSelect
          labelFor="hdd"
          labelName="HDD Size"
          iterator={hdd}
          register={register}
        />
        <FormSelect
          labelFor="ssd"
          labelName="SSD Size"
          iterator={ssd}
          register={register}
        />
        <FormSelect
          labelFor="weight"
          labelName="Weight"
          iterator={weight}
          register={register}
        />
        <FormSelect
          labelFor="screenSize"
          labelName="Screen Size"
          iterator={screenSize}
          register={register}
        />
        <FormSelect
          labelFor="screenResolution"
          labelName="Screen Type"
          iterator={screenResolution}
          register={register}
        />

        <div>
          <p>Do you want IPS Screen?</p>
          <div className="flex items-center gap-2 text-base">
            <input
              type="radio"
              {...register("ips")}
              value="yes"
              className="h-4 w-4"
              defaultChecked
            />
            <label htmlFor="yes">Yes</label>
          </div>
          <div className="flex items-center gap-2 text-base">
            <input
              type="radio"
              {...register("ips")}
              value="no"
              className="h-4 w-4"
            />
            <label htmlFor="no">No</label>
          </div>
        </div>
        <div>
          <p>Do you want Touch Screen?</p>
          <div className="flex items-center gap-2 text-base">
            <input
              type="radio"
              {...register("touchScreen")}
              id="touchscreen"
              value="yes"
              className="h-4 w-4"
            />
            <label htmlFor="yes">Yes</label>
          </div>
          <div className="flex items-center gap-2 text-base">
            <input
              type="radio"
              id="touchscreen"
              {...register("touchScreen")}
              value="no"
              defaultChecked
              className="h-4 w-4"
            />
            <label htmlFor="no">No</label>
          </div>
        </div>

        <div className="flex justify-end">
          {/* <button className="px-5 py-2 rounded-lg bg-primary text-white mt-5">
            Predict the price
          </button> */}

          {!isLoading ? (
            <>
              <button className="px-5 py-2 rounded-lg bg-primary text-white mt-5">
                Predict the price
              </button>
            </>
          ) : (
            <>
              <div className="flex gap-2 items-center md:mt-5 px-5 py-2 rounded-lg bg-primary text-white">
                <Loading color="white" w={6} />
                <p>Predicting...</p>
              </div>
            </>
          )}
        </div>
      </form>

      {showPricing ? (
        <div className="mt-3 ">
          <p>
            Predicted price is{" "}
            {isLoading ? (
              <span className="font-semibold">Predicting...</span>
            ) : (
              <span className="font-semibold">
                {new Intl.NumberFormat("en-IN").format(predictedPrice!)}
              </span>
            )}
          </p>
        </div>
      ) : null}
    </section>
  );
}
