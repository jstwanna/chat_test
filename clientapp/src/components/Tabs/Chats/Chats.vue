<script setup lang="ts">
import './Chats.css';
import avatar from '../../../images/avatar-1.jpg';

import { Chat } from '../../../models/models';
import { useFilteredArray } from '../../../composables/useFilteredArray';

import ChatPreview from '../Chats/ChatPreview/ChatPreview.vue';
import SearchBox from '../SearchBox/SearchBox.vue';

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
  <div class="chats">
    <SearchBox v-model="searchQuery" placeholder="Поиск чата или сообщения" />
    <div class="" v-if="isNotEmpty">
      <p class="chats__text">Недавние</p>
      <ul class="chats__list" v-if="isFilteredArrayNotEmpty">
        <li v-for="item in filteredArray" :key="item.id">
          <ChatPreview :chats="item" />
        </li>
      </ul>
      <p class="chats__no-result" v-else>Ничего не найдено :(</p>
    </div>
    <p class="chats__empty" v-else>
      Пока нет чатов и сообщений. Начните новый разговор прямо сейчас!
    </p>
  </div>
</template>
../../../models/models ../../../composables/useFilteredArray
