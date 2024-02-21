<script setup lang="ts">
import './MyButton.css';

const emit = defineEmits(['click']);

interface Props {
  type: 'button' | 'submit' | 'reset';
  textButton?: string;
  disabled?: boolean;
  ariaLabel?: string;
}

withDefaults(defineProps<Props>(), {
  textButton: '',
  disabled: false,
  ariaLabel: '',
});

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
    <slot name="icon" />
  </button>
</template>
