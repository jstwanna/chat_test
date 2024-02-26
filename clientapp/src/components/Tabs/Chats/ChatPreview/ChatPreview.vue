<script setup lang="ts">
import './ChatPreview.css';

import { P2PChat } from '../../../../models/models';

import Preview from '../../Preview/Preview.vue';

defineProps<{ chats: P2PChat }>();
</script>

<template>
  <Preview :to="`/chat/${chats.person.id}`" class="chat-preview">
    <template #preview>
      <div class="chat-preview__image-container">
        <template v-if="chats.person.imageUrl">
          <img
            :src="chats.person.imageUrl"
            alt="Фото профиля"
            class="chat-preview__image"
          />
          <span class="chat-preview__activity"></span>
        </template>
        <p class="chat-preview__no-image" v-else>
          {{ chats.person.name[0].toUpperCase() }}
        </p>
      </div>
      <div class="chat-preview__info">
        <h3 class="chat-preview__name">{{ chats.person.name }}</h3>
        <p class="chat-preview__last-message">
          {{ chats.lastMessage }}
        </p>
      </div>
      <div class="chat-preview__content">
        <p class="chat-preview__time">{{ chats.lastMessageDate }}</p>
        <span class="chat-preview__miss-message">100+</span>
      </div>
    </template>
  </Preview>
</template>
