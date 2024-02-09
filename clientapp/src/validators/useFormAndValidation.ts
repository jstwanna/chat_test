export interface FormFields {
  [key: string]: string;
}

export interface ValidationFields {
  [key: string]: boolean;
}

export const useFormAndValidation = () => {
  const values = reactive<FormFields>({});
  const errors = reactive<FormFields>({});
  const isValid: Ref<boolean> = ref(false);

  const handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const { name, value } = target;
    values[name] = value;
    errors[name] = target.validationMessage;
    isValid.value = (target.closest('form') as HTMLFormElement).checkValidity();
  };

  // const resetForm = () => {
  //   Object.keys(values).forEach((key) => {
  //     values[key] = '';
  //   });
  //   Object.keys(errors).forEach((key) => {
  //     errors[key] = '';
  //   });
  //   isValid.value = false;
  // };

  return {
    values,
    handleChange,
    errors,
    isValid,
    // resetForm,
  };
};
