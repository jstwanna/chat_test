<script setup lang="ts">
import './Groups.css';
import '../../../directives/TooltipDirective/TooltipDirective.css';

import { useFormAndValidation } from '../../../composables/useFormAndValidation';
import { useFilteredArray } from '../../../composables/useFilteredArray';
import { Group } from '../../../models/models';
import { createTypeChecker } from '../../../utils/utils';

import MyButton from '../../UI/MyButton/MyButton.vue';
import MyPopup from '../../UI/MyPopup/MyPopup.vue';
import MyInput from '../../UI/MyInput/MyInput.vue';
import GroupPreview from './GroupPreview/GroupPreview.vue';
import FilteredList from '../FilteredList/FilteredList.vue';

const isGroup = createTypeChecker<Group>(['title', 'to', 'description']);

const { values, handleChange, errors, isValid, resetForm } =
  useFormAndValidation();

const searchGroup = ref<string>('');
const isPopup = ref<boolean>(false);

const groups = ref<Group[]>([
  {
    id: 1,
    title: 'ввввввввввввввв',
    description: '',
    to: '/group1',
  },
]);

const { isNotEmpty, filteredArray, isFilteredArrayNotEmpty } = useFilteredArray<
  Group,
  'title'
>(groups, searchGroup, 'title');

const togglePopup = (): void => {
  isPopup.value = !isPopup.value;
};

const handleSubmit = (): void => {
  const newGroup: Group = {
    id: groups.value.length + 1,
    to: `/group${groups.value.length + 1}`,
    title: values.title,
    description: values.description,
  };

  groups.value.push(newGroup);
  togglePopup();
  console.log('create');
};

watch(isPopup, () => {
  isPopup.value ? resetForm() : null;
});
</script>

<template>
  <div class="groups">
    <FilteredList
      v-model="searchGroup"
      placeholder="Поиск групп..."
      :isNotEmpty="isNotEmpty"
      emptyText="Пока нету ни одной группы"
      :filteredArray="filteredArray"
      :isFilteredArray="isFilteredArrayNotEmpty"
      customClass="groups__list"
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
        <GroupPreview v-if="isGroup(item)" :groups="item" />
      </template>
    </FilteredList>
  </div>

  <MyPopup
    v-model="isPopup"
    title="Создать новую группу"
    @closePopup="togglePopup"
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
