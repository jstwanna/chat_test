<script setup lang="ts">
import './MyButton.css';

interface ButtonProps {
  type: 'button' | 'submit' | 'reset';
  textButton: string;
  disabled?: boolean;
  ariaLabel?: string;
}

const props = defineProps<ButtonProps>();
const { type, textButton, disabled, ariaLabel } = toRefs(props);

const emit = defineEmits(['click']);

const handleClickButton = () => emit('click');
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :aria-label="ariaLabel"
    @click="handleClickButton"
    class="button"
  >
    {{ textButton }}
  </button>
</template>
