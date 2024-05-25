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
  return (
    <>
      <TextField
        variant="outlined"
        placeholder="Enter Your Pet Name"
        fullWidth
        {...register("petName")}
        margin="normal"
        name="petName"
      />

      <TextField
        variant="outlined"
        placeholder="Enter Your Pet Id"
        fullWidth
        {...register("petId", {
          required: "Pet ID is required",
        })}
        margin="normal"
        error={!!errors.petId}
        helperText={errors.petId?.message}
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
          {...register("petPic", { required: true })}
          margin="normal"
          name="petPic"
          onChange={onFileChange}
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
