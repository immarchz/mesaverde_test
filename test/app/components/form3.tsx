import { TextField } from "@mui/material";
import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormInput, stepProps } from "./stepper";

const Form3: React.FC<stepProps> = ({ register, errors }) => {
  return (
    <>
      <TextField
        variant="outlined"
        placeholder="Enter Your ID Card"
        fullWidth
        {...register("id", { required: true })}
        margin="normal"
        name="id"
      />
      <TextField
        variant="outlined"
        placeholder="Enter Your Address"
        fullWidth
        {...register("address", { required: true })}
        margin="normal"
        name="address"
      />
    </>
  );
};

export default Form3;
