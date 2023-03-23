import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

export default function FormInput({
  value,
  title,
  register,
}: {
  value: string | number;
  title: string;
  register?: UseFormRegister<FieldValues>;
}) {
  return (
    <option value={value} className="px-2 py-2">
      {title}
    </option>
  );
}
