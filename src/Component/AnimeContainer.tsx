import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./AnimeContainer.css";
import { yupResolver } from "@hookform/resolvers/yup";
import InputBox from "./SmallParts/InputBox";
import { EmailValidation } from "./utills";
import { postApiData } from "./ApiRequests/apiRequests";
import AnimeData from "./AnimeData";
const AnimeContainer = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const defaultValues = { email: "" };
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<any>({
    mode: "onSubmit",
    defaultValues: defaultValues,
    resolver: yupResolver(EmailValidation),
  });
  const getToken = async (data: any) => {
    try {
      let res = await postApiData(data);
      localStorage.setItem("token", res?.data?.token);
      setToken(res?.data?.token);
    } catch (err) {
      console.error(err);
    }
  };
  const getEmailData = (data: any) => {
    getToken(data);
  };
  return (
    <div className="ParentContaier">
      <div className="FormContainer">
        {!token && (
          <>
            <InputBox
              label="Enter Your Email To Continue"
              register={register}
              name="email"
              palceholder={"Please Enter Your Email"}
              inputType="email"
              required={true}
              error={errors}
            />
            <button
              className="SubmitButton"
              onClick={handleSubmit(getEmailData)}
            >
              Submit
            </button>
          </>
        )}
        {token && (
          <>
            {" "}
            <AnimeData token={token} />
          </>
        )}
      </div>
    </div>
  );
};

export default AnimeContainer;
