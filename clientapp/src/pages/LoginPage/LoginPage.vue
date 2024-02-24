<script setup lang="ts">
import './LoginPage.css';

import router from '../../router/router';

import { useFormAndValidation } from '../../composables/useFormAndValidation';
import { AuthClient, jwtLsName, ApiException } from '../../api/api-generated';
import { addNotification } from '../../utils/utils';
import { Notification } from '../../models/models';

import Auth from '../../components/Auth/Auth.vue';
import MyInput from '../../components/UI/MyInput/MyInput.vue';
import MyNotification from '../../components/UI/MyNotification/MyNotification.vue';

const { values, handleChange, errors, isValid } = useFormAndValidation();

const notifications = ref<Notification[]>([]);

const auth = new AuthClient();

const handleSubmit = async () => {
  auth
    .login({ mail: values.email, password: values.password })
    .then((res) => {
      if (res) {
        localStorage.setItem(jwtLsName, res);
        router.push('/');
      }
    })
    .catch((error: ApiException) => {
      if (error.status === 401) {
        addNotification(notifications, 'Проверьте данные', 'error');
      } else {
        addNotification(notifications, 'Ошибка сервера', 'error');
      }
      console.error('Произошла ошибка входа', error.message);
    });
};
</script>

<template>
  <Auth
    name="login"
    title="Рады видеть!"
    textButton="Войти"
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

  <MyNotification :notifications="notifications" />
</template>
