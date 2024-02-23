<script setup lang="ts">
import './Groups.css';
import '../../../directives/TooltipDirective/TooltipDirective.css';

import { useFormAndValidation } from '../../../composables/useFormAndValidation';
import { GroupChat } from '../../../models/models';

import MyButton from '../../UI/MyButton/MyButton.vue';
import MyPopup from '../../UI/MyPopup/MyPopup.vue';
import MyInput from '../../UI/MyInput/MyInput.vue';
import GroupPreview from './GroupPreview/GroupPreview.vue';
import FilteredList from '../FilteredList/FilteredList.vue';

const { values, handleChange, errors, isValid, resetForm } =
  useFormAndValidation();

const searchGroup = ref<string>('');
const isPopup = ref<boolean>(false);

const groups = ref<GroupChat[]>([
  {
    id: 1,
    title: 'ввввввввввввввв',
    imageUrl: '',
    lastMessage: 'adadadadadada',
    lastMessageDate: 200,
  },
]);

const togglePopup = (): void => {
  isPopup.value = !isPopup.value;
};

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

watch(isPopup, () => {
  isPopup.value ? resetForm() : null;
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
        class="groups__icon"
        ariaLabel="Поиск группы"
        v-tooltip="{ text: 'Создать группу', position: 'bottom' }"
        @click="togglePopup"
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

  <MyPopup
    v-model="isPopup"
    title="Создать новую группу"
    @closePopup="togglePopup"
    class="groups"
  >
    <template #body>
      <form name="create-group" novalidate @submit.prevent="handleSubmit">
        <MyInput
          v-model="values.title"
          :handleInput="handleChange"
          type="text"
          name="title"
          placeholder="Введите название группы"
          :minLength="3"
          :maxLength="15"
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
        <div class="groups__button-container">
          <MyButton
            type="submit"
            textButton="Создать группу"
            :disabled="!isValid"
            class="groups__button"
          />
        </div>
      </form>
    </template>
  </MyPopup>
</template>
