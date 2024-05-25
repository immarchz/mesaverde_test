import { TextField } from "@mui/material";
import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormInput, stepProps } from "./stepper";

const Form2: React.FC<stepProps> = ({ register, errors }) => {
  return (
    <>
      <TextField
        variant="outlined"
        placeholder="Enter Your Name"
        fullWidth
        {...register("name", { required: true })}
        margin="normal"
        name="name"
      />
      <TextField
        variant="outlined"
        placeholder="Enter Your Phone Number"
        fullWidth
        {...register("phone", { required: true })}
        margin="normal"
        name="phone"
      />
      <TextField
        variant="outlined"
        placeholder="Enter Your Email Address"
        fullWidth
        {...register("email", {
          pattern: {
            value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            message: "Invalid Email Format",
          },
        })}
        margin="normal"
        name="email"
      />
    </>
  );
};

export default Form2;
