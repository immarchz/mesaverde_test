import { TextField } from "@mui/material";
import React, { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormInput, stepProps } from "./stepper";

const Form1: React.FC<stepProps> = ({ register, errors, handleFileChange }) => {
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result && handleFileChange) {
          handleFileChange(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <TextField
        variant="outlined"
        placeholder="Enter Your Pet Name"
        fullWidth
        {...register("petName", { required: true })}
        margin="normal"
        name="petName"
      />
      <TextField
        variant="outlined"
        placeholder="Enter Your Pet Id"
        fullWidth
        {...register("petId", { required: true })}
        margin="normal"
        name="petId"
      />
      <TextField
        type="number"
        variant="outlined"
        placeholder="Enter Your Pet Age"
        fullWidth
        {...register("petAge", { required: true })}
        margin="normal"
        name="petAge"
      />
      <div className="mt-1 ">
        <label> Pet Picture</label>
        <TextField
          type="file"
          variant="outlined"
          fullWidth
          {...register("petPic")}
          margin="normal"
          name="petPic"
          onChange={onFileChange}
        />
      </div>
    </>
  );
};

export default Form1;
