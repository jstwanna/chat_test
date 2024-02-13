<script setup lang="ts">
import './MyInput.css';

const emit = defineEmits(['update:modelValue']);

interface InputProps {
  type: string;
  modelValue: string | undefined;
  placeholder: string;
  name: string;
  minLength?: number;
  maxLength?: number;
  handleInput?: (event: Event) => void;
  error?: string | null;
}

const props = defineProps<InputProps>();

const computedValue = computed({
  get: () => props.modelValue,
  set: (newValue: string | undefined) => emit('update:modelValue', newValue),
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
    <p v-if="props.error !== null" class="input-block__error">
      {{ props.error }}
    </p>
  </div>
</template>
