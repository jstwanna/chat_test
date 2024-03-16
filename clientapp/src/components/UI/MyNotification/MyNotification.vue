<script setup lang="ts">
import './MyNotification.scss';

import { notifications } from '../../../utils/errorService';
</script>

<template>
  <div class="notification">
    <TransitionGroup name="slide-fade">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        :class="`notification__box notification__box_type_${notification.type}`"
      >
        {{ notification.message }}
      </div>
    </TransitionGroup>
  </div>
</template>
