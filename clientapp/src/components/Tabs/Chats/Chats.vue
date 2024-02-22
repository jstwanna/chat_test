<script setup lang="ts">
import './Chats.css';
import avatar from '../../../images/avatar-1.jpg';

import { Chat } from '../../../models/models';
import { useFilteredArray } from '../../../composables/useFilteredArray';
import { createTypeChecker } from '../../../utils/utils';

import ChatPreview from '../Chats/ChatPreview/ChatPreview.vue';
import FilteredList from '../FilteredList/FilteredList.vue';

const isChat = createTypeChecker<Chat>(['avatar', 'name', 'time', 'to']);

const searchQuery = ref<string>('');

const chats = ref<Chat[]>([
  {
    id: 1,
    to: '/chat1',
    avatar: avatar,
    name: 'Denis Vlaskin',
    time: '10:12',
  },
  {
    id: 2,
    to: '/chat2',
    avatar: avatar,
    name: 'Denis фф',
    time: '10:34',
  },
]);

const { isNotEmpty, filteredArray, isFilteredArrayNotEmpty } = useFilteredArray<
  Chat,
  'name'
>(chats, searchQuery, 'name');
</script>

<template>
  <FilteredList
    v-model="searchQuery"
    placeholder="Поиск чата или сообщения"
    :isChat="true"
    :isNotEmpty="isNotEmpty"
    emptyText="Пока нет чатов и сообщений. Начните новый разговор прямо сейчас!"
    :filteredArray="filteredArray"
    :isFilteredArray="isFilteredArrayNotEmpty"
  >
    <template #list-item="{ item }">
      <ChatPreview v-if="isChat(item)" :chats="item" />
    </template>
  </FilteredList>
</template>
