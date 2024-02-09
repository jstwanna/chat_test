<script setup lang="ts">
import './Auth.css';
import logo from '../../images/logo.svg';

import MyButton from '../UI/MyButton/MyButton.vue';

interface AuthProps {
  title: string;
  name: string;
  disabled: boolean;
  text: string;
  to: string;
  textLink: string;
  onSubmit: () => void;
}

const props = defineProps<AuthProps>();
const { title, name, disabled, onSubmit, text, to, textLink } = toRefs(props);
</script>

<template>
  <main class="auth">
    <img :src="logo" alt="Лого" class="auth__logo" />
    <h1 class="auth__title">{{ title }}</h1>
    <form :name="name" novalidate @submit.prevent="onSubmit" class="auth__form">
      <slot name="form"></slot>
      <MyButton
        type="submit"
        textButton="Войти"
        :disabled="!disabled"
        class="auth__button"
      />
    </form>
    <p class="auth__text">
      {{ text }}
      <RouterLink :to="to" class="auth__link">{{ textLink }}</RouterLink>
    </p>
  </main>
</template>
