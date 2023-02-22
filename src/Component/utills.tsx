import * as yup from "yup";
export const EmailValidation = yup.object().shape({
  email: yup
    .string()
    .required("Email is Required")
    .email("Please enter a valid email")
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email"
    ),
});

export const htmlData = (data: any) => {
  let arr = data?.split("\n");
  let output = [];
  for (let i = 0; i < arr?.length; i++) {
    if (arr[i] == "<p>") output.push(arr[i + 1]);
  }
  return output;
};
