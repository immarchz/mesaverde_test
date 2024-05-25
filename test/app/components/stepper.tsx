"use client";

import {
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Form1 from "./form1";
import Form2 from "./form2";
import Form3 from "./form3";
import {
  FieldErrors,
  SubmitHandler,
  UseFormRegister,
  useForm,
} from "react-hook-form";
export interface FormInput {
  petName: string;
  petId: string;
  petAge: number;
  petPic: string;
  name: string;
  phone: string;
  email: string;
  id: string;
  address: string;
}

export interface stepProps {
  register: UseFormRegister<FormInput>;
  errors: FieldErrors<FormInput>;
  handleFileChange?: (base64: string) => void;
}

const StepperComponent = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormInput>();
  const [activeStep, setActiveStep] = useState(0);
  const [fileBase64, setFileBase64] = useState<string | null>(null);
  const handleFileChange = (base64: string) => {
    setFileBase64(base64);
  };
  const [formData, setFormData] = useState<FormInput>({
    petName: "",
    petId: "",
    petAge: 0,
    petPic: "",
    name: "",
    phone: "",
    email: "",
    id: "",
    address: "",
  });
  const steps = [
    {
      label: "Step 1",
      component: (
        <Form1
          register={register}
          errors={errors}
          handleFileChange={handleFileChange}
        />
      ),
    },
    {
      label: "Step 2",
      component: <Form2 register={register} errors={errors} />,
    },
    {
      label: "Step 3",
      component: <Form3 register={register} errors={errors} />,
    },
  ];
  const handleNext = () => {
    const currentValues = getValues();
    console.log("currentValues", currentValues);
    setFormData({ ...formData, ...currentValues });
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    const currentValues = getValues();
    setFormData({ ...formData, ...currentValues });
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    try {
      if (fileBase64) {
        data.petPic = fileBase64;
      }
      const response = await fetch("http://localhost:5050/api/form", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <form onSubmit={handleSubmit(onSubmit)}>
        {steps[activeStep].component}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button type="submit">Finish</Button>
          ) : (
            <Button onClick={handleNext}>Next</Button>
          )}
        </Box>
      </form>
    </div>
  );
};

export default StepperComponent;
