import React from "react";
import "./InputBox.css";
const InputBox = ({
  label,
  register,
  name,
  inputType,
  palceholder,
  required,
  error,
}: {
  label: string;
  register?: any;
  name: string;
  inputType: string;
  palceholder?: string;
  required: boolean;
  error: any;
}) => {
  return (
    <div className="inputContainer">
      <label htmlFor="un">
        {label}
        {required && <span style={{ color: "red" }}>*</span>}
      </label>{" "}
      <br /> <br />
      <input
        {...register(name)}
        placeholder={palceholder}
        type={inputType}
      />{" "}
      <br />
      <span style={{ fontSize: "14px", color: "red" }}>
        {error?.[name ?? ""] && (
          <>*{error?.[name ?? ""]?.message?.toString()}</>
        )}
      </span>
    </div>
  );
};

export default InputBox;
