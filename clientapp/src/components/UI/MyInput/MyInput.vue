<script setup lang="ts">
import './MyInput.css';

const emit = defineEmits(['update:modelValue']);

interface Props {
  type: string;
  modelValue?: string;
  placeholder: string;
  name: string;
  minLength?: number;
  maxLength?: number;
  handleInput?: (event: Event) => void;
  error: string | null;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  minLength: undefined,
  maxLength: undefined,
  handleInput: undefined,
});

const computedValue = computed({
  get: () => props.modelValue,
  set: (newValue: string) => emit('update:modelValue', newValue),
});
</script>

<template>
  <div class="input-block">
    <input
      v-model="computedValue"
      @input="handleInput"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :minlength="minLength"
      :maxlength="maxLength"
      autocomplete="off"
      required
      :class="[
        'input-block__input',
        {
          'input-block__input_type_error': error,
        },
      ]"
    />
    <p v-if="error !== null" class="input-block__error">
      {{ error }}
    </p>
  </div>
</template>
