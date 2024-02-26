<script setup lang="ts">
import './Profile.css';

import { jwtLsName } from '../../../api/api-generated';
import { user } from '../../../auth/auth';
import { useFormAndValidation } from '../../../composables/useFormAndValidation';
import { usePopupWithForm } from '../../../composables/usePopupWithForm';
import router from '../../../router/router';

import MyCollapse from '../../UI/MyCollapse/MyCollapse.vue';
import MyButton from '../../UI/MyButton/MyButton.vue';
import PopupWithForm from '../../PopupWithForm/PopupWithForm.vue';
import MyInput from '../../UI/MyInput/MyInput.vue';

const {
  values: valuesAvatar,
  handleChange: handleChangeAvatar,
  errors: errorsAvatar,
  isValid: isValidAvatar,
  resetForm: resetFormAvatar,
} = useFormAndValidation();
const {
  values: valuesUser,
  handleChange: handleChangeUser,
  errors: errorsUser,
  isValid: isValidUser,
  resetForm: resetFormUser,
} = useFormAndValidation();

const { isPopup: isPopupAvatar, togglePopup: togglePopupAvatar } =
  usePopupWithForm(resetFormAvatar);
const { isPopup: isPopupUser, togglePopup: togglePopupUser } =
  usePopupWithForm(resetFormUser);

const profileInfo = ref([
  {
    id: 1,
    title: 'Имя',
    text: user.value.name,
  },
  {
    id: 2,
    title: 'Фамилия',
    text: user.value.surname,
  },
  {
    id: 3,
    title: 'Email',
    text: 'denis04la@rambler.ru',
  },
]);

const profileCollapse = ref<boolean>(true);

const avatar = ref<string>(
  'https://get.pxhere.com/photo/person-people-portrait-facial-expression-hairstyle-smile-emotion-portrait-photography-134689.jpg'
);
const status = ref<string>('1234567890123@5678901234567890');

const handleUpdateAvatar = () => {
  avatar.value = valuesAvatar.avatar;
  togglePopupAvatar();
};

const handleEditProfile = () => {
  user.value.name = valuesUser.name;
  user.value.surname = valuesUser.surName;
  status.value = valuesUser.status;
  togglePopupUser();
};

const handleLogout = () => {
  localStorage.removeItem(jwtLsName);
  router.push('/sign-in');
};
</script>

<template>
  <div class="profile">
    <div class="profile__user-info">
      <div class="profile__image-container">
        <img :src="avatar" alt="Фото аватара" class="profile__avatar" />
        <MyButton
          type="button"
          ariaLabel="Обновление аватара"
          class="profile__edit-button"
          @click="togglePopupAvatar"
        >
          <template #icon>
            <font-awesome-icon icon="fa-solid fa-pen" />
          </template>
        </MyButton>
      </div>
      <h3 class="profile__name">{{ user.name }}</h3>
      <div class="profile__activity">
        <font-awesome-icon
          icon="fa-solid fa-circle-dot"
          class="profile__circle"
        />
        <span class="profile__activity-text">Онлайн</span>
      </div>
    </div>

    <p class="profile__status">{{ status }}</p>

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
          <MyButton
            type="button"
            textButton="Edit"
            class="profile__collapse-edit"
            @click="togglePopupUser"
          >
            <template #icon>
              <font-awesome-icon icon="fa-solid fa-pen" />
            </template>
          </MyButton>
        </div>
      </template>
    </MyCollapse>

    <MyButton
      type="button"
      textButton="Выйти"
      @click="handleLogout"
      class="profile__logout"
    />
  </div>

  <PopupWithForm
    v-model="isPopupAvatar"
    title="Обновление аватара"
    name="update-avatar"
    textButton="Сохранить"
    :disabled="isValidAvatar"
    :closePopup="togglePopupAvatar"
    :onSubmit="handleUpdateAvatar"
  >
    <template #form>
      <MyInput
        v-model="valuesAvatar.avatar"
        :handleInput="handleChangeAvatar"
        type="url"
        name="avatar"
        placeholder="Введите ссылку"
        :error="errorsAvatar.avatar"
      />
    </template>
  </PopupWithForm>

  <PopupWithForm
    v-model="isPopupUser"
    title="Редактировать профиль"
    name="edit-user"
    textButton="Сохранить"
    :disabled="isValidUser"
    :closePopup="togglePopupUser"
    :onSubmit="handleEditProfile"
  >
    <template #form>
      <MyInput
        v-model="valuesUser.name"
        :handleInput="handleChangeUser"
        type="text"
        name="name"
        placeholder="Введите имя"
        :minLength="2"
        :maxLength="30"
        :error="errorsUser.name"
      />
      <MyInput
        v-model="valuesUser.surName"
        :handleInput="handleChangeUser"
        type="text"
        name="surName"
        placeholder="Введите фамилию"
        :minLength="2"
        :maxLength="30"
        :error="errorsUser.surName"
      />
      <MyInput
        v-model="valuesUser.status"
        :handleInput="handleChangeUser"
        type="text"
        name="status"
        placeholder="Введите статус"
        :minLength="2"
        :maxLength="30"
        :error="errorsUser.status"
      />
    </template>
  </PopupWithForm>
</template>
