<script setup lang="ts">
import './Auth.css';
import logo from '../../images/logo.svg';

import MyButton from '../UI/MyButton/MyButton.vue';

defineProps({
  title: {
    type: String,
    required: true,
  },
  textButton: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  textLink: {
    type: String,
    required: true,
  },
  onSubmit: {
    type: Function as PropType<(event: Event) => void>,
    required: true,
  },
});
</script>

<template>
  <main class="auth">
    <img :src="logo" alt="Лого" class="auth__logo" />
    <h1 class="auth__title">{{ title }}</h1>
    <form :name="name" novalidate @submit.prevent="onSubmit" class="auth__form">
      <slot name="form" />
      <MyButton
        type="submit"
        :disabled="!disabled"
        :textButton="textButton"
        class="auth__button"
      />
    </form>
    <p class="auth__text">
      {{ text }}
      <RouterLink :to="to" class="auth__link">{{ textLink }}</RouterLink>
    </p>
  </main>
</template>
