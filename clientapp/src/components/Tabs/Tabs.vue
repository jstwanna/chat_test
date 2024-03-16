<script setup lang="ts">
import './Tabs.scss';

interface Props {
  currentComponent: Component;
  currentTitle: string;
}

defineProps<Props>();
</script>

<template>
  <section class="tabs filtered-list">
    <h1 class="tabs__title">{{ currentTitle }}</h1>
    <component :is="currentComponent" />
  </section>
</template>
