<script setup lang="ts">
import './ChatPreview.css';

import { Chat } from '../../../../models/models';
import Preview from '../../Preview/Preview.vue';

interface ChatPreviewProps {
  chats: Chat;
}

const props = defineProps<ChatPreviewProps>();
const { chats } = toRefs(props);
</script>

<template>
  <Preview :to="chats.to" class="chat-preview">
    <template #preview>
      <div class="chat-preview__image-container">
        <img
          :src="chats.avatar"
          alt="Фото профиля"
          class="chat-preview__image"
        />
        <span class="chat-preview__activity"></span>
      </div>
      <div class="chat-preview__info">
        <h3 class="chat-preview__name">{{ chats.name }}</h3>
        <p class="chat-preview__last-message">
          Last message message message message message message
        </p>
      </div>
      <div class="chat-preview__content">
        <p class="chat-preview__time">{{ chats.time }}</p>
        <span class="chat-preview__miss-message">100+</span>
      </div>
    </template>
  </Preview>
</template>
../../../../models/models
