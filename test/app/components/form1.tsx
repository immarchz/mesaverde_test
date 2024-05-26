import { TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormInput, StepProps } from "./stepper";

const Form1: React.FC<StepProps> = ({ register, errors, handleFileChange }) => {
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result && handleFileChange) {
          handleFileChange(reader.result as string);
          setFileBase64(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const [fileBase64, setFileBase64] = useState<string | null>(null);
  const [empty, setEmpty] = useState("");
  const [inputError, setInputError] = useState(false);

  const handleEmptyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmpty(e.target.value);
    if (e.target.validity.valid) {
      setInputError(false);
    } else {
      setInputError(true);
    }
  };

  const ALPHA_NUMERIC_DASH_REGEX = /^[a-zA-Z-]+$/;

  return (
    <>
      <TextField
        variant="outlined"
        placeholder="Enter Your Pet Name"
        fullWidth
        {...register("petName", { required: "Pet Name is required" })}
        margin="normal"
        name="petName"
        onChange={handleEmptyChange}
        error={inputError}
        helperText={inputError ? "Please enter your pet name" : ""}
        onKeyDown={(event) => {
          if (!ALPHA_NUMERIC_DASH_REGEX.test(event.key)) {
            event.preventDefault();
          }
        }}
      />

      <TextField
        variant="outlined"
        placeholder="Enter Your Pet Id"
        fullWidth
        required
        {...register("petId", { required: "Pet Id is required" })}
        margin="normal"
        name="petId"
        onChange={handleEmptyChange}
        error={inputError}
        helperText={inputError ? "Please enter your pet id" : ""}
      />

      <TextField
        type="number"
        variant="outlined"
        placeholder="Enter Your Pet Age"
        fullWidth
        required
        {...register("petAge", { required: "Pet Age is required" })}
        margin="normal"
        name="petAge"
        onChange={handleEmptyChange}
        error={inputError}
        helperText={inputError ? "Please enter your pet age" : ""}
      />

      <div className="mt-1">
        <label>Pet Picture</label>
        <TextField
          type="file"
          variant="outlined"
          fullWidth
          required
          {...register("petPic", { required: "Pet Picture is required" })}
          margin="normal"
          name="petPic"
          onChange={onFileChange}
          error={!!errors.petPic}
          helperText={errors.petPic ? errors.petPic.message : ""}
        />
        {fileBase64 && (
          <img
            src={fileBase64}
            alt="Selected Pet"
            style={{ maxWidth: "100%", marginTop: 10 }}
          />
        )}
      </div>
    </>
  );
};

export default Form1;
