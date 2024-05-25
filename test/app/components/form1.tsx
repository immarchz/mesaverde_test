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
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (e.target.validity.valid) {
      setNameError(false);
    } else {
      setNameError(true);
    }
  };

  const [age, setAge] = useState("");
  const [ageError, setAgeError] = useState(false);
  const handleAgeChange = (e) => {
    setAge(e.target.value);
    console.log("e.target.value", e.target.value);
    if (e.target.value >= 18) {
      setAgeError(false);
    } else {
      setAgeError(true);
    }
  };

  return (
    <>
      <TextField
        variant="outlined"
        placeholder="Enter Your Pet Name"
        fullWidth
        {...register("petName", { required: "Pet Name is required" })}
        margin="normal"
        name="petName"
        error={!!errors.petName}
        helperText={errors.petName ? errors.petName.message : ""}
      />

      <TextField
        variant="outlined"
        placeholder="Enter Your Pet Id"
        fullWidth
        {...register("petId", {
          required: "Pet ID is required",
          pattern: {
            value: /^\d{8}$/,
            message: "Pet ID must be exactly 8 digits",
          },
          validate: (value) =>
            value.length === 8 || "Pet ID must be exactly 8 digits",
        })}
        margin="normal"
        name="petId"
        error={!!errors.petId}
        helperText={errors.petId ? errors.petId.message : ""}
      />
      <TextField
        label="Age"
        value={age}
        onChange={handleAgeChange}
        error={ageError}
        helperText={ageError ? "You must be at least 18 years old" : ""}
      />

      <TextField
        type="number"
        variant="outlined"
        placeholder="Enter Your Pet Age"
        fullWidth
        {...register("petAge", { required: "Pet Age is required" })}
        margin="normal"
        name="petAge"
        error={!!errors.petAge}
        helperText={errors.petAge ? errors.petAge.message : ""}
      />

      <div className="mt-1">
        <label>Pet Picture</label>
        <TextField
          type="file"
          variant="outlined"
          fullWidth
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
