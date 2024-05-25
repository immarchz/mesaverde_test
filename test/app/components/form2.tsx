import { TextField } from "@mui/material";
import React, { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormInput, stepProps } from "./stepper";

const Form2: React.FC<stepProps> = ({ register, errors }) => {
  const [empty, setEmpty] = useState("");
  const [inputError, setInputError] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const handleEmptyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmpty(e.target.value);
    if (e.target.validity.valid) {
      setInputError(false);
    } else {
      setInputError(true);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (e.target.validity.valid) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };
  return (
    <>
      <TextField
        variant="outlined"
        placeholder="Enter Your Name"
        fullWidth
        required
        {...register("name", { required: true })}
        margin="normal"
        name="name"
        onChange={handleEmptyChange}
        error={inputError}
        helperText={inputError ? "Please enter your name" : ""}
      />
      <TextField
        variant="outlined"
        placeholder="Enter Your Phone Number"
        fullWidth
        required
        {...register("phone", { required: true })}
        margin="normal"
        name="phone"
        onChange={handleEmptyChange}
        error={inputError}
        helperText={inputError ? "Please enter your phone number" : ""}
      />
      <TextField
        variant="outlined"
        required
        placeholder="Enter Your Email Address"
        fullWidth
        {...register("email", { required: true })}
        value={email}
        onChange={handleEmailChange}
        error={emailError}
        helperText={emailError ? "Please enter a valid email" : ""}
        margin="normal"
        name="email"
        inputProps={{
          type: "email",
        }}
      />
    </>
  );
};

export default Form2;
