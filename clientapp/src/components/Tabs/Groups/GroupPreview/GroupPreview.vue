<script setup lang="ts">
import './GroupPreview.scss';

import { GroupChat } from '../../../../models/models';
import Preview from '../../Preview/Preview.vue';

defineProps<{ groups: GroupChat }>();
</script>

<template>
  <Preview :to="`/group/${groups.id}`" class="group-preview">
    <template #preview>
      <img
        :src="groups.imageUrl"
        alt="Фото профиля"
        class="group-preview__image"
        v-if="groups.imageUrl"
      />
      <p class="group-preview__no-image" v-else>
        {{ groups.title[0].toUpperCase() }}
      </p>

      <div class="group-preview__info">
        <h3 class="group-preview__name">{{ groups.title }}</h3>
        <p class="group-preview__last-message">
          {{ groups.lastMessage }}
        </p>
      </div>
      <div class="group-preview__content">
        <p class="group-preview__time">{{ groups.lastMessageDate }}</p>
        <span class="group-preview__miss-message">100+</span>
      </div>
    </template>
  </Preview>
</template>
