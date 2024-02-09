<script setup lang="ts">
import './MyInput.css';

interface InputProps {
  type: string;
  modelValue?: string;
  placeholder: string;
  name: string;
  minLength?: number;
  maxLength?: number;
  handleInput?: (event: Event) => void;
  error: string | undefined;
}

const props = defineProps<InputProps>();

const emit = defineEmits(['update:modelValue']);

const computedValue = computed({
  get: () => props.modelValue,
  set: (newValue) => emit('update:modelValue', newValue),
});
</script>

<template>
  <div class="input-block">
    <input
      v-model="computedValue"
      @input="props.handleInput"
      :type="props.type"
      :name="props.name"
      :placeholder="props.placeholder"
      :minlength="props.minLength"
      :maxlength="props.maxLength"
      autocomplete="off"
      required
      :class="[
        'input-block__input',
        {
          'input-block__input_type_error': props.error,
        },
      ]"
    />
    <p class="input-block__error">
      {{ props.error }}
    </p>
  </div>
</template>
