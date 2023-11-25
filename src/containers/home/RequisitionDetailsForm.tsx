import { Button, Flex, Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import FormInput from "../../components/formComponents/FormInput";
import FormSelect from "../../components/formComponents/FormSelect";
import { IRequisitionDetails } from "../../interface/forms";
import { genderOptions, urgencyOptions } from "./constants";
import { useData } from "./DataProvider";

const RequisitionDetailsForm: React.FC = ({setCurrentTab}: any) => {

  const { setState, state }: any = useData();

  const changeState = () =>{
    setState((prevState: any) => ({
      ...prevState,
      requisitionDetails: values,
    }));
  }
  
  const {
    handleChange,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    values,
    setFieldTouched,
    setFieldValue,
  } = useFormik<IRequisitionDetails>({
    initialValues: {
      requisitionTitle: "",
      noOfOpenings: 0,
      urgency: "",
      gender: "",
    },
    validationSchema: Yup.object().shape({
      requisitionTitle: Yup.string().required("Requisition title is required"),
      noOfOpenings: Yup.number()
        .typeError("Enter a valid number")
        .required("Number of openings is required")
        .positive("Enter a valid number")
        .min(1, "Enter a valid number"),
      urgency: Yup.string().required("Urgency is required"),
      gender: Yup.string().required("Gender is required"),
    }),
    onSubmit: (formValues) => {
      changeState()
      setCurrentTab(1);
    },
  });

  useEffect(() => {
    changeState()
  }, [values, setState]);

  useEffect(() => {
    // Pre-fill form fields with stored values
    setFieldValue("requisitionTitle", state.requisitionDetails?.requisitionTitle);
    setFieldValue("noOfOpenings", state.requisitionDetails?.noOfOpenings);
    setFieldValue("urgency", state.requisitionDetails?.urgency);
    setFieldValue("gender", state.requisitionDetails?.gender);

    // Mark the fields as touched to trigger validation messages if needed
    setFieldTouched("requisitionTitle", true);
    setFieldTouched("noOfOpenings", true);
    setFieldTouched("urgency", true);
    setFieldTouched("gender", true);
  }, [state.requisitionDetails, setFieldValue, setFieldTouched]);
  
  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormInput
          label="Requisition Title"
          placeholder="Enter requisition title"
          name="requisitionTitle"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.requisitionTitle}
          error={errors?.requisitionTitle}
          touched={touched?.requisitionTitle}
        />
        <FormInput
          label="Number of openings"
          placeholder="Enter number of openings"
          name="noOfOpenings"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.noOfOpenings}
          error={errors?.noOfOpenings}
          touched={touched?.noOfOpenings}
        />
        <FormSelect
          label="Gender"
          name="gender"
          placeholder="Select gender"
          options={genderOptions}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          error={errors?.gender}
          touched={touched?.gender}
          value={values?.gender}
        />
        <FormSelect
          label="Urgency"
          name="urgency"
          placeholder="Select urgency"
          options={urgencyOptions}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          error={errors?.urgency}
          touched={touched?.urgency}
          value={values?.urgency}
        />
        <Flex w="100%" justify="flex-end" mt="4rem">
          <Button onClick={()=>setCurrentTab((prev:any)=>{prev+1})} colorScheme="red" type="submit">
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default RequisitionDetailsForm;