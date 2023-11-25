import { Button, Flex, Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import FormInput from "../../components/formComponents/FormInput";
import { IJobDetails } from "../../interface/forms";
import { useData } from "./DataProvider";

interface JobDetailsFormProps {
  setCurrentTab: (index: number) => void;
}

const JobDetailsForm: React.FC<JobDetailsFormProps> = ({setCurrentTab}: any) => {

  const { setState, state }: any = useData();

  const changeState = () =>{
    setState((prevState: any) => ({
      ...prevState,
      jobDetails: values,
    }));
  }

  const { handleChange, errors, touched, handleBlur, handleSubmit, values, setFieldValue, setFieldTouched } =
    useFormik<IJobDetails>({
      initialValues: {
        jobTitle: "",
        jobDetails: "",
        jobLocation: "",
      },
      validationSchema: Yup.object().shape({
        jobTitle: Yup.string().required("Job Title is required"),
        jobDetails: Yup.string().required("Job Details is required"),
        jobLocation: Yup.string().required("Job Location is required"),
        jobPosition: Yup.string().required("Job position is required"),
      }),
      onSubmit: (values) => {
        changeState()
        setCurrentTab(2);
      },
    });

    useEffect(() => {
      changeState()
    }, [values, setState]);

    useEffect(() => {
      // Pre-fill form fields with stored values
      setFieldValue("jobTitle", state.jobDetails?.jobTitle);
      setFieldValue("jobDetails", state.jobDetails?.jobDetails);
      setFieldValue("jobLocation", state.jobDetails?.jobLocation);
  
      // Mark the fields as touched to trigger validation messages if needed
      setFieldTouched("jobTitle", true);
      setFieldTouched("jobDetails", true);
      setFieldTouched("jobLocation", true);
    }, [state.jobDetails, setFieldValue, setFieldTouched]);

  return (

    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormInput
          label="Job Title"
          placeholder="Enter job title"
          name="jobTitle"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.jobTitle}
          error={errors?.jobTitle}
          touched={touched?.jobTitle}
        />
        <FormInput
          label="Job Details"
          placeholder="Enter job details"
          name="jobDetails"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.jobDetails}
          error={errors?.jobDetails}
          touched={touched?.jobDetails}
        />
        <FormInput
          label="Job Location"
          name="jobLocation"
          placeholder="Enter job location"
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.jobLocation}
          touched={touched.jobLocation}
          value={values.jobLocation}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button onClick={() => setCurrentTab((prev:any) => prev-1)} colorScheme="gray" type="button">
            Previous
          </Button>
          <Button onClick={() => setCurrentTab((prev:any)=>{prev+1})} colorScheme="red" type="submit">
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default JobDetailsForm;
