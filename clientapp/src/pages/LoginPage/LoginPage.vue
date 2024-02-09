<script setup lang="ts">
import './LoginPage.css';

import { useFormAndValidation } from '../../validators/useFormAndValidation';

import Auth from '../../components/Auth/Auth.vue';
import MyInput from '../../components/UI/MyInput/MyInput.vue';

const { values, handleChange, errors, isValid } = useFormAndValidation();

const handleSubmit = () => {
  console.log('login');
};
</script>

<template>
  <Auth
    name="login"
    title="Рады видеть!"
    text="Ещё не зарегистрированы?"
    to="/sign-up"
    textLink="Регистрация"
    :disabled="isValid"
    :onSubmit="handleSubmit"
  >
    <template #form>
      <MyInput
        v-model="values.email"
        :handleInput="handleChange"
        type="email"
        name="email"
        placeholder="Email"
        :minLength="10"
        :maxLength="50"
        :error="errors.email"
      />
      <MyInput
        v-model="values.password"
        :handleInput="handleChange"
        type="password"
        name="password"
        placeholder="Пароль"
        :minLength="6"
        :maxLength="40"
        :error="errors.password"
      />
    </template>
  </Auth>
</template>
