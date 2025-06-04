import { Label } from "./ui/label";
import { Input } from "./ui/input";
import type { ComponentPropsWithoutRef } from "react";

type CustomInputWithLabelProps = {
  label: string;
  id: string;
  errorMsg?: string;
} & ComponentPropsWithoutRef<"input">;

export default function CustomInputWithLabel({
  label,
  id,
  errorMsg = "",
  ...otherProps
}: CustomInputWithLabelProps) {
  return (
    <>
      <Label className="text-2xl" htmlFor={id}>
        {label}
      </Label>
      {errorMsg && <small className="text-red-500 text-sm text-right">{errorMsg}</small>}
      <Input id={id} placeholder={id} {...otherProps} className="focus-visible:ring-1 " />
    </>
  );
}
