<script setup lang="ts">
import './Preview.css';

interface Props {
  to: string;
}

defineProps<Props>();
</script>

<template>
  <RouterLink :to="to" class="preview" active-class="preview_active">
    <slot name="preview" />
  </RouterLink>
</template>
