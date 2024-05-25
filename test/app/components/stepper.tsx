"use client";
import { Button, Step, StepLabel, Stepper, Box } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
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

export interface StepProps {
  register: UseFormRegister<FormInput>;
  errors: FieldErrors<FormInput>;
  handleFileChange?: (base64: string) => void;
}

const StepperComponent: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
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

  const savedData = localStorage.getItem("formData");
  useEffect(() => {
    if (savedData) {
      const parsedData: FormInput = JSON.parse(savedData);
      setFormData(parsedData);
      for (const [key, value] of Object.entries(parsedData)) {
        setValue(key as keyof FormInput, value);
      }
    }

    const savedStep = localStorage.getItem("activeStep");
    if (savedStep) {
      setActiveStep(Number(savedStep));
    }

    const savedFileBase64 = localStorage.getItem("fileBase64");
    if (savedFileBase64) {
      setFileBase64(savedFileBase64);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem("activeStep", String(activeStep));
  }, [activeStep]);

  useEffect(() => {
    if (fileBase64) {
      localStorage.setItem("fileBase64", fileBase64);
    }
  }, [fileBase64]);

  const handleNext = () => {
    const currentValues = getValues();
    setFormData({ ...formData, ...currentValues });
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    const currentValues = getValues();
    setFormData({ ...formData, ...currentValues });
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSave = () => {
    const currentValues = getValues();
    setFormData({ ...formData, ...currentValues });

    localStorage.setItem(
      "formData",
      JSON.stringify({ ...formData, ...currentValues })
    );
    localStorage.setItem("activeStep", String(activeStep));
    if (fileBase64) {
      localStorage.setItem("fileBase64", fileBase64);
    }
    alert("Form data saved!");
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

      // Clear local storage and reset form
      localStorage.removeItem("formData");
      localStorage.removeItem("activeStep");
      localStorage.removeItem("fileBase64");
      reset();
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
            <Button type="submit">Submit</Button>
          ) : (
            <Button onClick={handleNext}>Next</Button>
          )}
        </Box>
      </form>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Button onClick={handleSave}>Save</Button>
      </Box>
    </div>
  );
};

export default StepperComponent;
