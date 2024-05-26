import { TextField } from "@mui/material";
import React, { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormInput, stepProps } from "./stepper";

const Form2: React.FC<stepProps> = ({ register, errors }) => {
  const [empty, setEmpty] = useState("");
  const [inputError, setInputError] = useState<string | boolean>(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | boolean>(false);

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

  const ALPHA_NUMERIC_DASH_REGEX = /^[a-zA-Z-]+$/;
  return (
    <>
      <TextField
        variant="outlined"
        placeholder="Enter Your Name"
        fullWidth
        {...register("name", { required: true })}
        margin="normal"
        name="name"
        onChange={handleEmptyChange}
        error={inputError}
        helperText={inputError ? "Please enter your name" : ""}
        onKeyDown={(event) => {
          if (!ALPHA_NUMERIC_DASH_REGEX.test(event.key)) {
            event.preventDefault();
          }
        }}
      />
      <TextField
        variant="outlined"
        placeholder="Enter Your Phone Number"
        fullWidth
        {...register("phone", { required: true })}
        margin="normal"
        onChange={handleEmptyChange}
        error={inputError}
        helperText={inputError ? "Please enter your phone number" : ""}
        name="phone"
      />
      <TextField
        variant="outlined"
        placeholder="Enter Your Email Address"
       
        fullWidth
        {...register("email", { required: true })}
        
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
