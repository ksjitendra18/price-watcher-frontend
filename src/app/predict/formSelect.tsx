import React from "react";
import FormInput from "./formInput";
import { FieldValues, UseFormRegister } from "react-hook-form";

export default function FormSelect({
  labelName,
  labelFor,
  iterator,
  register,
}: {
  labelName: string;
  labelFor: string;
  iterator: { title: string; value: string | number }[];
  register: UseFormRegister<FieldValues>;
}) {
  return (
    <div>
      <label htmlFor={labelFor} className="block">
        {labelName}
      </label>
      <select
        id={labelFor}
        {...register(labelFor)}
        className="bg-gray-200 w-full rounded-xl px-2 py-2"
      >
        {iterator.map((it, index) => (
          <>
            <FormInput
              title={it.title}
              value={it.value}
              key={it.title + index}
            />
          </>
        ))}
      </select>
    </div>
  );
}
