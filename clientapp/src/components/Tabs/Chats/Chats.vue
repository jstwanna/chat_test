<script setup lang="ts">
import './Chats.css';

import { P2PChat } from '../../../models/models';

import ChatPreview from '../Chats/ChatPreview/ChatPreview.vue';
import FilteredList from '../FilteredList/FilteredList.vue';

const searchChat = ref<string>('');

const chats = ref<P2PChat[]>([
  {
    person: {
      id: 1,
      name: 'asdaasddaasasddasddasdasdasds',
      imageUrl:
        'https://catherineasquithgallery.com/uploads/posts/2021-03/1614612233_137-p-fon-dlya-fotoshopa-priroda-209.jpg',
    },
    lastMessage: 'asasdsadadsadasdassdadassdasadasdassadsaddasdassaaas',
    isOnline: false,
    lastMessageDate: new Date().getDate(),
  },
]);

const filteredArray = computed(() => {
  return chats.value.filter((chat) => {
    return chat.person.name
      .toLowerCase()
      .includes(searchChat.value.toLowerCase());
  });
});
</script>

<template>
  <FilteredList
    v-model="searchChat"
    placeholder="Поиск чата или сообщения"
    :isChat="true"
    emptyText="Нет доступных чатов"
    :filteredArray="filteredArray"
  >
    <template #list-item="{ item }">
      <ChatPreview :chats="item" />
    </template>
  </FilteredList>
</template>
