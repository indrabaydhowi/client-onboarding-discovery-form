"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface FormContextType {
  selectedProject: string | null;
  setSelectedProject: (project: string | null) => void;
  step: number;
  setStep: (step: number) => void;
  selectedFeatures: string[];
  setSelectedFeatures: React.Dispatch<React.SetStateAction<string[]>>;
  toggleFeature: (featureId: string) => void;
  timeline: string;
  setTimeline: (timeline: string) => void;
  budget: string;
  setBudget: (budget: string) => void;
  name: string;
  setName: (name: string) => void;
  contact: string;
  setContact: (contact: string) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: ReactNode }) {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [step, setStep] = useState<number>(1);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [timeline, setTimeline] = useState<string>("");
  const [budget, setBudget] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [contact, setContact] = useState<string>("");

  const toggleFeature = (featureId: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureId)
        ? prev.filter((id) => id !== featureId)
        : [...prev, featureId]
    );
  };

  return (
    <FormContext.Provider
      value={{
        selectedProject,
        setSelectedProject,
        step,
        setStep,
        selectedFeatures,
        setSelectedFeatures,
        toggleFeature,
        timeline,
        setTimeline,
        budget,
        setBudget,
        name,
        setName,
        contact,
        setContact,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
}
