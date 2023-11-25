import { Button, Flex, Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import FormSelect from "../../components/formComponents/FormSelect";
import { IInterViewSettings } from "../../interface/forms";
import {
  interviewDurationOptions,
  interviewLanguageOptions,
  interviewModeOptions,
} from "./constants";
import { useData } from "./DataProvider";

interface InterviewDetailsFormProps {
  setCurrentTab: (index: number) => void;
}


const InterviewDetailsForm: React.FC<InterviewDetailsFormProps> = ({setCurrentTab}:any) => {
  const { setState, state }: any = useData();

  const changeState = () =>{
    setState((prevState: any) => ({
      ...prevState,
      interviewSettings: values,
    }));
  }

  const {
    errors,
    touched,
    handleSubmit,
    values,
    setFieldTouched,
    setFieldValue,
  } = useFormik<IInterViewSettings>({
    initialValues: {
      interviewMode: "",
      interviewDuration: "",
      interviewLanguage: "",
    },
    validationSchema: Yup.object().shape({
      interviewMode: Yup.string().required("Interview Mode is required"),
      interviewDuration: Yup.string().required("Interview Duration is required"),
      interviewLanguage: Yup.string().required("Interview Language is required"),
    }),
    onSubmit: (values) => {
      changeState()
      alert("Form successfully submitted");
    },
  });

  useEffect(()=>{
    changeState()
  },[values, setState])

  useEffect(() => {
    // Pre-fill form fields with stored values
    setFieldValue("interviewMode", state.interviewSettings?.interviewMode);
    setFieldValue("interviewDuration", state.interviewSettings?.interviewDuration);
    setFieldValue("interviewLanguage", state.interviewSettings?.interviewLanguage);

    // Mark the fields as touched to trigger validation messages if needed
    setFieldTouched("interviewMode", true);
    setFieldTouched("interviewDuration", true);
    setFieldTouched("interviewLanguage", true);
  }, [state.interviewSettings, setFieldValue, setFieldTouched]);

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormSelect
          label="Interview Mode"
          placeholder="Select interview mode"
          name="interviewMode"
          options={interviewModeOptions}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          value={values?.interviewMode}
          error={errors?.interviewMode}
          touched={touched?.interviewMode}
        />
        <FormSelect
          label="Interview Duration"
          placeholder="Select interview duration"
          name="interviewDuration"
          options={interviewDurationOptions}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          value={values?.interviewDuration}
          error={errors?.interviewDuration}
          touched={touched?.interviewDuration}
        />
        <FormSelect
          label="Job Location"
          name="interviewLanguage"
          placeholder="Select interview language"
          options={interviewLanguageOptions}
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          error={errors.interviewLanguage}
          touched={touched.interviewLanguage}
          value={values.interviewLanguage}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button onClick={() => setCurrentTab((prev:any) => prev-1)} colorScheme="gray" type="button">
            Previous
          </Button>
          <Button colorScheme="red" type="submit">
            Submit
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default InterviewDetailsForm;
