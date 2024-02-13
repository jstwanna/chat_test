<script setup lang="ts">
import './Tabs.css';

interface TabsProps {
  currentComponent: Component;
  currentTitle: string;
}

const props = defineProps<TabsProps>();
const { currentComponent, currentTitle } = toRefs(props);
</script>

<template>
  <section class="tabs">
    <h1 class="tabs__title">{{ currentTitle }}</h1>
    <component :is="currentComponent" />
  </section>
</template>
