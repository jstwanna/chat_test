<script setup lang="ts">
import './Groups.css';
import '../../../directives/TooltipDirective/TooltipDirective.css';

import { useFormAndValidation } from '../../../composables/useFormAndValidation';
import { usePopupWithForm } from '../../../composables/usePopupWithForm';
import { GroupChat } from '../../../models/models';

import MyButton from '../../UI/MyButton/MyButton.vue';
import MyInput from '../../UI/MyInput/MyInput.vue';
import GroupPreview from './GroupPreview/GroupPreview.vue';
import FilteredList from '../FilteredList/FilteredList.vue';

const { values, handleChange, errors, isValid, resetForm } =
  useFormAndValidation();

const { isPopup, togglePopup } = usePopupWithForm(resetForm);

const searchGroup = ref<string>('');

const groups = ref<GroupChat[]>([
  {
    id: 1,
    title: 'ввввввввввввввв',
    imageUrl: '',
    lastMessage: 'adadadadadada',
    lastMessageDate: 200,
  },
]);

const handleSubmit = (): void => {
  const newGroup: GroupChat = {
    id: groups.value.length + 1,
    imageUrl: `https://catherineasquithgallery.com/uploads/posts/2021-03/1614612233_137-p-fon-dlya-fotoshopa-priroda-209.jpg`,
    title: values.title,
    lastMessage: 'asddadaa',
    lastMessageDate: 10,
  };

  groups.value.push(newGroup);
  togglePopup();
};

const filteredArray = computed(() => {
  return groups.value.filter((chat) => {
    return chat.title.toLowerCase().includes(searchGroup.value.toLowerCase());
  });
});
</script>

<template>
  <FilteredList
    v-model="searchGroup"
    placeholder="Поиск групп..."
    emptyText="Нет доступных групп"
    :filteredArray="filteredArray"
  >
    <template #header>
      <MyButton
        type="button"
        ariaLabel="Поиск группы"
        v-tooltip="{ text: 'Создать группу', position: 'bottom' }"
        @click="togglePopup"
        class="groups"
      >
        <template #icon>
          <font-awesome-icon icon="fa-solid fa-user-group" />
        </template>
      </MyButton>
    </template>
    <template #list-item="{ item }">
      <GroupPreview :groups="item" />
    </template>
  </FilteredList>

  <PopupWithForm
    v-model="isPopup"
    title="Создать новую группу"
    name="create-group"
    textButton="Создать группу"
    :disabled="isValid"
    :closePopup="togglePopup"
    :onSubmit="handleSubmit"
  >
    <template #form>
      <MyInput
        v-model="values.title"
        :handleInput="handleChange"
        type="text"
        name="title"
        placeholder="Введите название группы"
        :minLength="3"
        :maxLength="25"
        :error="errors.title"
      />
      <MyInput
        v-model="values.description"
        :handleInput="handleChange"
        type="text"
        name="description"
        placeholder="Введите описание"
        :minLength="5"
        :maxLength="40"
        :error="errors.description"
      />
    </template>
  </PopupWithForm>
</template>
