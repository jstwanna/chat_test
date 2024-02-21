<script setup lang="ts">
import './FilteredList.css';

import { Chat, Group, Contact } from '../../../models/models';

import MyInput from '../../UI/MyInput/MyInput.vue';

const emit = defineEmits(['update:modelValue']);

type CommunicationEntity = Chat | Group | Contact;

interface Props {
  modelValue: string;
  placeholder: string;
  isNotEmpty: boolean;
  emptyText: string;
  filteredArray: CommunicationEntity[];
  isFilteredArray: boolean;
  isChat?: boolean;
  customClass: string;
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
  <div class="filtered-list">
    <slot name="header" />

    <div class="filtered-list__search-box">
      <font-awesome-icon
        icon="fa-solid fa-magnifying-glass"
        class="filtered-list__icon"
      />
      <MyInput
        v-model="computedValue"
        type="text"
        name="search"
        :placeholder="placeholder"
        :error="null"
        class="filtered-list__input"
      />
    </div>

    <div v-if="isNotEmpty">
      <p v-if="isChat" class="filtered-list__text">Недавние</p>
      <div :class="`filtered-list__list ${customClass}`" v-if="isFilteredArray">
        <div v-for="(item, index) in filteredArray" :key="item.id">
          <slot name="list-item" :item="item" :index="index" />
        </div>
      </div>
      <p class="filtered-list__no-result" v-else>Ничего не найдено :(</p>
    </div>
    <p class="filtered-list__empty" v-else>{{ emptyText }}</p>
  </div>
</template>
