import { TextField } from "@mui/material";
import React, { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormInput, stepProps } from "./stepper";

const Form3: React.FC<stepProps> = ({ register, errors }) => {
  const [id, setId] = useState("");
  const [idError, setIdError] = useState<string | boolean>(false);
  const [empty, setEmpty] = useState("");
  const [inputError, setInputError] = useState(false);

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
    if (e.target.value.length != 13) {
      setIdError("Id must have 13 characters long");
    } else {
      setIdError(false);
    }
    if (e.target.value.length > 13) {
      e.target.value = e.target.value.slice(0, 13); // Ensure maximum length of 13
    }
  };

  const handleEmptyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmpty(e.target.value);
    if (e.target.validity.valid) {
      setInputError(false);
    } else {
      setInputError(true);
    }
  };

  return (
    <>
      <TextField
        variant="outlined"
        type="number"
        placeholder="Enter Your ID Card"
        fullWidth
        {...register("id", { required: true })}
        onChange={handleIdChange}
        error={idError}
        helperText={idError ? "Id must have 13 characters long" : ""}
        margin="normal"
        name="id"
        onInput = {handleIdChange}
      />
      <TextField
        variant="outlined"
      
        placeholder="Enter Your Address"
        fullWidth
        {...register("address", { required: true })}
        onChange={handleEmptyChange}
        error={inputError}
        helperText={inputError ? "Please enter your address" : ""}
        margin="normal"
        name="address"
      />
    </>
  );
};

export default Form3;
