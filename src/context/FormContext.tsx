"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";

/**
 * Interface defining the state structure for onboarding form
 */
export interface FormState {
  currentStep: number;
  projectType: string | null;
  selectedFeatures: string[];
  assets: {
    logo: 'READY' | 'NEEDS_CREATION' | 'UNSURE' | null;
    copywriting: 'READY' | 'NEEDS_CREATION' | 'UNSURE' | null;
    photography: 'READY' | 'NEEDS_CREATION' | 'UNSURE' | null;
  };
  budgetRange: string | null;
  timeline: string | null;
  contact: {
    name: string;
    whatsapp: string;
  };
  hasAgreedToTerms: boolean;
}

const initialState: FormState = {
  currentStep: 0,
  projectType: null,
  selectedFeatures: [],
  assets: {
    logo: null,
    copywriting: null,
    photography: null,
  },
  budgetRange: null,
  timeline: null,
  contact: {
    name: "",
    whatsapp: "",
  },
  hasAgreedToTerms: false,
};

type FormAction =
  | { type: "SET_STEP"; payload: number }
  | { type: "SET_PROJECT_TYPE"; payload: string }
  | { type: "TOGGLE_FEATURE"; payload: string }
  | { type: "SET_ASSET"; payload: { key: keyof FormState["assets"]; value: 'READY' | 'NEEDS_CREATION' | 'UNSURE' } }
  | { type: "SET_BUDGET"; payload: string }
  | { type: "SET_TIMELINE"; payload: string }
  | { type: "SET_CONTACT"; payload: { name?: string; whatsapp?: string } }
  | { type: "SET_AGREEMENT"; payload: boolean }
  | { type: "RESET_FORM" };

/**
 * Reducer function managing FormState updates
 */
function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, currentStep: action.payload };
    case "SET_PROJECT_TYPE":
      return { ...state, projectType: action.payload };
    case "TOGGLE_FEATURE":
      const exists = state.selectedFeatures.includes(action.payload);
      return {
        ...state,
        selectedFeatures: exists
          ? state.selectedFeatures.filter((id) => id !== action.payload)
          : [...state.selectedFeatures, action.payload],
      };
    case "SET_ASSET":
      return {
        ...state,
        assets: { ...state.assets, [action.payload.key]: action.payload.value },
      };
    case "SET_BUDGET":
      return { ...state, budgetRange: action.payload };
    case "SET_TIMELINE":
      return { ...state, timeline: action.payload };
    case "SET_CONTACT":
      return { ...state, contact: { ...state.contact, ...action.payload } };
    case "SET_AGREEMENT":
      return { ...state, hasAgreedToTerms: action.payload };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
}

interface FormContextType {
  state: FormState;
  dispatch: React.Dispatch<FormAction>;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

/**
 * FormProvider Component for wrapping the onboarding application
 */
export function FormProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(formReducer, initialState);

  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {children}
    </FormContext.Provider>
  );
}

/**
 * Custom hook to access FormContext
 */
export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
}
