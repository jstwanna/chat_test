<script setup lang="ts">
import './FilteredList.css';

import { Chat, Group } from '../../../models/models';

import MyInput from '../../UI/MyInput/MyInput.vue';

const emit = defineEmits(['update:modelValue']);

type CommunicationEntity = Chat | Group;

interface Props {
  modelValue: string;
  placeholder: string;
  isNotEmpty: boolean;
  emptyText: string;
  filteredArray: CommunicationEntity[];
  isFilteredArray: boolean;
  isChat?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isChat: false,
});

const computedValue = computed({
  get: () => props.modelValue,
  set: (newValue: string) => emit('update:modelValue', newValue),
});
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
    <div class="filtered-list__list" v-if="isFilteredArray">
      <div v-for="item in filteredArray" :key="item.id">
        <slot name="list-item" :item="item" />
      </div>
    </div>
    <p class="filtered-list__no-result" v-else>Ничего не найдено :(</p>
  </template>
  <p class="filtered-list__empty" v-else>{{ emptyText }}</p>
</template>
