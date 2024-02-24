<script setup lang="ts">
import './PopupWithForm.css';

import MyPopup from '../UI/MyPopup/MyPopup.vue';
import MyButton from '../UI/MyButton/MyButton.vue';

const emit = defineEmits(['update:modelValue']);

interface Props {
  modelValue: boolean;
  title: string;
  closePopup: () => void;
  name: string;
  textButton: string;
  disabled: boolean;
  onSubmit: () => void;
}

const props = defineProps<Props>();

const modelUpdate = computed({
  get: () => props.modelValue,
  set: (newValue) => emit('update:modelValue', newValue),
});
</script>

<template>
  <MyPopup
    v-model="modelUpdate"
    :title="title"
    @closePopup="closePopup"
    class="popup-form"
  >
    <template #body>
      <form :name="name" novalidate @submit.prevent="onSubmit">
        <slot name="form" />
        <div class="popup-form__footer">
          <MyButton
            type="submit"
            :textButton="textButton"
            :disabled="!disabled"
            class="popup-form__button"
          />
        </div>
      </form>
    </template>
  </MyPopup>
</template>
