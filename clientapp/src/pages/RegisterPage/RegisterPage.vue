<script setup lang="ts">
import './RegisterPage.css';

import router from '../../router/router';

import { useFormAndValidation } from '../../composables/useFormAndValidation';
import { handleApiError } from '../../utils/errorService';
import { AuthClient, ApiException, jwtLsName } from '../../api/api-generated';
import { REGISTER_ERROR_MESSAGE } from '../../utils/constants';

import Auth from '../../components/Auth/Auth.vue';
import MyInput from '../../components/UI/MyInput/MyInput.vue';
import MyNotification from '../../components/UI/MyNotification/MyNotification.vue';

const { values, handleChange, errors, isValid } = useFormAndValidation();

const auth = new AuthClient();

let abort = new AbortController();

const handleSubmit = async () => {
  abort.abort();
  abort = new AbortController();

  auth
    .registration(
      {
        mail: values.email,
        password: values.password,
        name: values.name,
        surname: values.surName,
      },
      abort.signal
    )
    .then((res) => {
      if (res) {
        localStorage.setItem(jwtLsName, res);
        router.push('/');
      }
    })
    .catch((error: ApiException) => {
      handleApiError(error, 'error');
      console.error(REGISTER_ERROR_MESSAGE, error.message);
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

  <MyNotification />
</template>
