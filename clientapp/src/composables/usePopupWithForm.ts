export const usePopupWithForm = (resetForm: () => void) => {
  const isPopup = ref(false);

  const togglePopup = () => {
    isPopup.value = !isPopup.value;
  };

  watch(isPopup, () => {
    if (isPopup.value) resetForm();
  });

  return { isPopup, togglePopup };
};
