import React, { createContext, useContext, useState } from "react";

export const initialValues = {
  requisitionDetails: {
    gender: "",
    noOfOpenings: 0,
    requisitionTitle: "",
    urgency: "",
  },
  jobDetails: {
    jobDetails: "",
    jobLocation: "",
    jobTitle: "",
  },
  interviewSettings: {
    interviewDuration: "",
    interviewLanguage: "",
    interviewMode: "",
  },
};

export const DataContext = createContext<{
  state: typeof initialValues;
  setState: React.Dispatch<React.SetStateAction<typeof initialValues>>;
} | null>(null);

const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState(initialValues);

  return (
    <DataContext.Provider value={{ state, setState }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext) as {
    state: {
      requisitionDetails: {
        gender: string;
        noOfOpenings: number;
        requisitionTitle: string;
        urgency: string;
      };
      jobDetails: {
        jobDetails: string;
        jobLocation: string;
        jobTitle: string;
      };
      interviewSettings: {
        interviewDuration: string;
        interviewLanguage: string;
        interviewMode: string;
      };
    };
    setState: React.Dispatch<React.SetStateAction<typeof initialValues>>;
  };
};

export default DataProvider;
