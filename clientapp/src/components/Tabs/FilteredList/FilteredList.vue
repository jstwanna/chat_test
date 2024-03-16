<script setup lang="ts">
import './FilteredList.scss';

import MyInput from '../../UI/MyInput/MyInput.vue';

const emit = defineEmits(['update:modelValue']);

interface Props {
  modelValue: string;
  placeholder: string;
  emptyText: string;
  filteredArray: any[];
  isChat?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isChat: false,
});

const computedValue = computed({
  get: () => props.modelValue,
  set: (newValue: string) => emit('update:modelValue', newValue),
});

const isNotEmpty = computed(() => props.filteredArray.length > 0);
</script>

<template>
  <slot name="header" />

  <MyInput
    v-model="computedValue"
    type="text"
    name="search"
    :placeholder="placeholder"
    :error="null"
    icon="fa-magnifying-glass"
    class="filtered-list__search-box"
  />

  <template v-if="isNotEmpty">
    <p v-if="isChat" class="filtered-list__text">Недавние</p>
    <div class="filtered-list__list">
      <div v-for="(item, index) in filteredArray" :key="index">
        <slot name="list-item" :item="item" />
      </div>
    </div>
  </template>
  <p class="filtered-list__no-result" v-else>{{ emptyText }}</p>
</template>
