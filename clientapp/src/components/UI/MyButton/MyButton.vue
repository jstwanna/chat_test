<script setup lang="ts">
import './MyButton.css';

const emit = defineEmits(['click']);

interface ButtonProps {
  type: 'button' | 'submit' | 'reset';
  textButton?: string;
  disabled?: boolean;
  ariaLabel?: string;
}

const props = defineProps<ButtonProps>();
const { type, disabled, ariaLabel } = toRefs(props);

const handleClickButton = (): void => emit('click');
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
    <slot name="icon" />
  </button>
</template>
