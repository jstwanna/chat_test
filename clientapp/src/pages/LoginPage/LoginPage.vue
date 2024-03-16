<script setup lang="ts">
import './LoginPage.scss';

import router from '../../router/router';

import { useFormAndValidation } from '../../composables/useFormAndValidation';
import { handleApiError } from '../../utils/errorService';
import { AuthClient, jwtLsName, ApiException } from '../../api/api-generated';
import { LOGIN_ERROR_MESSAGE } from '../../utils/constants';

import Auth from '../../components/Auth/Auth.vue';
import MyInput from '../../components/UI/MyInput/MyInput.vue';

const { values, handleChange, errors, isValid } = useFormAndValidation();

const auth = new AuthClient();
let abort = new AbortController();

const handleSubmit = async () => {
  abort.abort();
  abort = new AbortController();

  auth
    .login({ mail: values.email, password: values.password }, abort.signal)
    .then((res) => {
      if (res) {
        localStorage.setItem(jwtLsName, res);
        router.push('/');
      }
    })
    .catch((error: ApiException) => {
      handleApiError(error, 'error');
      console.error(LOGIN_ERROR_MESSAGE, error.message);
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
</template>
