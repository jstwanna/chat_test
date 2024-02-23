<script setup lang="ts">
import './Profile.css';
import avatar from '../../../images/avatar-1.jpg';

import { profileInfo } from '../../../utils/constants';

import MyCollapse from '../../UI/MyCollapse/MyCollapse.vue';

const profileCollapse = ref<boolean>(true);
</script>

<template>
  <div class="profile">
    <div class="profile__user-info">
      <img :src="avatar" alt="Фото аватара" class="profile__avatar" />
      <h3 class="profile__name">Денис</h3>
      <div class="profile__activity">
        <font-awesome-icon
          icon="fa-solid fa-circle-dot"
          class="profile__circle"
        />
        <span class="profile__activity-text">Онлайн</span>
      </div>
    </div>
    <p class="profile__status">Статус или описание о себе на 200 букв</p>
    <MyCollapse v-model="profileCollapse">
      <template #header>
        <h4 class="profile__collapse-title">
          <font-awesome-icon icon="fa-solid fa-user" />
          О пользователе
        </h4>
      </template>
      <template #body>
        <div class="profile__collapse-content">
          <div
            v-for="item in profileInfo"
            :key="item.id"
            class="profile__collapse-body"
          >
            <h5 class="profile__collapse-subtitle">{{ item.title }}</h5>
            <p class="profile__collapse-text">{{ item.text }}</p>
          </div>
        </div>
      </template>
    </MyCollapse>
  </div>
</template>
