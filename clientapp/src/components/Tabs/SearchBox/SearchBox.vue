<script setup lang="ts">
import './SearchBox.css';

import MyInput from '../../UI/MyInput/MyInput.vue';

const emit = defineEmits(['update:modelValue']);

interface SearchBoxProps {
  modelValue: string;
  placeholder: string;
}

const props = defineProps<SearchBoxProps>();
const { placeholder } = toRefs(props);

const computedValue = computed({
  get: () => props.modelValue,
  set: (newValue: string) => emit('update:modelValue', newValue),
});
</script>

<template>
  <div class="search-box">
    <font-awesome-icon
      icon="fa-solid fa-magnifying-glass"
      class="search-box__icon"
    />
    <MyInput
      v-model="computedValue"
      type="text"
      name="search"
      :placeholder="placeholder"
      :error="null"
      class="search-box__input"
    />
  </div>
</template>
