<script setup lang="ts">
import './Preview.css';

interface PreviewProps {
  to: string;
}

const props = defineProps<PreviewProps>();
const { to } = toRefs(props);
</script>

<template>
  <RouterLink :to="to" class="preview" active-class="preview_active">
    <slot name="preview" />
  </RouterLink>
</template>
