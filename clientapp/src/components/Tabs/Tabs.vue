<script setup lang="ts">
import './Tabs.css';

defineProps({
  currentComponent: {
    type: Object as PropType<Component>,
    required: true,
  },
  currentTitle: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <section class="tabs">
    <h1 class="tabs__title">{{ currentTitle }}</h1>
    <component :is="currentComponent" />
  </section>
</template>
