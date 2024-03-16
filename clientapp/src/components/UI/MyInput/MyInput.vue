<script setup lang="ts">
import './MyInput.scss';

const emit = defineEmits(['update:modelValue']);

interface Props {
  type: string;
  modelValue?: string;
  placeholder: string;
  name: string;
  minLength?: number;
  maxLength?: number;
  handleInput?: (event: Event) => void;
  error?: string | null;
  icon?: string;
}

const inputFocus = ref(false);

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  minLength: 0,
  maxLength: Infinity,
  handleInput: () => {},
  icon: '',
  error: '',
});

const computedValue = computed({
  get: () => props.modelValue,
  set: (newValue: string) => emit('update:modelValue', newValue),
});
</script>

<template>
  <div class="input-block">
    <div
      :class="[
        'input-block__container',
        {
          'input-block__container_type_active': inputFocus,
          'input-block__container_type_error': error,
        },
      ]"
    >
      <font-awesome-icon
        :icon="`fa-solid ${icon}`"
        class="input-block__icon"
        v-if="icon"
      />
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
        @focus="inputFocus = true"
        @blur="inputFocus = false"
        :class="[
          'input-block__input',
          { 'input-block__input_type_error': error },
        ]"
      />
    </div>
    <p v-if="error !== null" class="input-block__error">
      {{ error }}
    </p>
  </div>
</template>
