<script setup lang="ts">
import './Tabs.css';

interface Props {
  currentComponent: Component;
  currentTitle: string;
}

defineProps<Props>();
</script>

<template>
  <section class="tabs">
    <h1 class="tabs__title">{{ currentTitle }}</h1>
    <component :is="currentComponent" />
  </section>
</template>
