<script setup lang="ts">
import './Preview.css';

defineProps({
  to: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <RouterLink :to="to" class="preview" active-class="preview_active">
    <slot name="preview" />
  </RouterLink>
</template>
