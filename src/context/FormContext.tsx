"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface FormContextType {
  selectedProject: string | null;
  setSelectedProject: (project: string | null) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: ReactNode }) {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  return (
    <FormContext.Provider value={{ selectedProject, setSelectedProject }}>
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
