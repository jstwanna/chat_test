<script setup lang="ts">
import { PropType } from 'vue';
import './MyInput.css';

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
  },
  placeholder: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  minLength: {
    type: Number,
    default: undefined,
  },
  maxLength: {
    type: Number,
    default: undefined,
  },
  handleInput: {
    type: Function as PropType<(event: Event) => void>,
    default: undefined,
  },
  error: {
    type: String as PropType<string | null>,
  },
});

const computedValue = computed({
  get: () => props.modelValue,
  set: (newValue: string | undefined) => emit('update:modelValue', newValue),
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
