<script setup lang="ts">
import './RegisterPage.css';

import router from '../../router/router';

import { useFormAndValidation } from '../../composables/useFormAndValidation';
import { addNotification } from '../../utils/utils';
import { Notification } from '../../models/models';
import { AuthClient, ApiException, jwtLsName } from '../../api/api-generated';

import Auth from '../../components/Auth/Auth.vue';
import MyInput from '../../components/UI/MyInput/MyInput.vue';
import MyNotification from '../../components/UI/MyNotification/MyNotification.vue';

const { values, handleChange, errors, isValid } = useFormAndValidation();

const notifications = ref<Notification[]>([]);

const auth = new AuthClient();

const handleSubmit = (): void => {
  auth
    .registration({
      mail: values.email,
      password: values.password,
      name: values.name,
      surname: values.surName,
    })
    .then((res) => {
      if (res) {
        localStorage.setItem(jwtLsName, res);
        router.push('/');
      }
    })
    .catch((error: ApiException) => {
      if (error.status === 400) {
        addNotification(
          notifications,
          'Такой пользователь уже существует',
          'error'
        );
      } else {
        addNotification(notifications, 'Ошибка сервера!', 'error');
      }
      console.log('Произошла ошибка регистрации', error.response);
    });
};
</script>

<template>
  <Auth
    name="register"
    title="Добро пожаловать!"
    textButton="Зарегистрироваться"
    text="Уже зарегистрированы?"
    to="sign-in"
    textLink="Войти"
    :disabled="isValid"
    :onSubmit="handleSubmit"
  >
    <template #form>
      <MyInput
        v-model="values.name"
        :handleInput="handleChange"
        type="text"
        name="name"
        placeholder="Введите имя"
        :minLength="2"
        :maxLength="30"
        :error="errors.name"
      />
      <MyInput
        v-model="values.surName"
        :handleInput="handleChange"
        type="text"
        name="surName"
        placeholder="Введите фамилию"
        :minLength="2"
        :maxLength="30"
        :error="errors.surName"
      />
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
