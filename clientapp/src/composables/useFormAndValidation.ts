import { EMAIL_REGEX, INVALID_EMAIL_MESSAGE } from '../utils/constants';

type FormFields = Record<string, string>;

interface FormAndValidation {
  values: FormFields;
  handleChange: (event: Event) => void;
  errors: FormFields;
  isValid: Ref<boolean>;
  resetForm: () => void;
}

export const useFormAndValidation = (): FormAndValidation => {
  const values = reactive<FormFields>({});
  const errors = reactive<FormFields>({});
  const isValid: Ref<boolean> = ref(false);

  const handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const { name, value } = target;
    values[name] = value;
    errors[name] = target.validationMessage;
    isValid.value = (target.closest('form') as HTMLFormElement).checkValidity();

    if (name === 'email') {
      if (!EMAIL_REGEX.test(value)) {
        errors[name] = INVALID_EMAIL_MESSAGE;
      }
    }
  };

  const resetForm = () => {
    Object.keys(values).forEach((key) => {
      values[key] = '';
    });
    Object.keys(errors).forEach((key) => {
      errors[key] = '';
    });
    isValid.value = false;
  };

  return {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
  };
};
