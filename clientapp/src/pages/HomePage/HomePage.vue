<script setup lang="ts">
import './HomePage.css';

import { Tab } from '../../models/models';

import Navigation from '../../components/Navigation/Navigation.vue';
import Profile from '../../components/Tabs/Profile/Profile.vue';
import Chats from '../../components/Tabs/Chats/Chats.vue';
import Groups from '../../components/Tabs/Groups/Groups.vue';
import Contacts from '../../components/Tabs/Contacts/Contacts.vue';
import Settings from '../../components/Tabs/Settings/Settings.vue';
import Tabs from '../../components/Tabs/Tabs.vue';

const currentTitle = ref<string>('Чаты');
const currentComponent = shallowRef<Component>(Chats);

const links = shallowRef<Tab[]>([
  {
    id: 1,
    icon: 'fa-user',
    component: Profile,
    toolTip: 'Профиль',
  },
  {
    id: 2,
    icon: 'fa-comment-dots',
    component: Chats,
    toolTip: 'Чаты',
  },
  {
    id: 3,
    icon: 'fa-user-group',
    component: Groups,
    toolTip: 'Группы',
  },
  {
    id: 4,
    icon: 'fa-address-book',
    component: Contacts,
    toolTip: 'Контакты',
  },
  {
    id: 5,
    icon: 'fa-gear',
    component: Settings,
    toolTip: 'Настройки',
  },
]);

const onSwitch = (tabTitle: string, component: Component): void => {
  currentTitle.value = tabTitle;
  currentComponent.value = component;
};
</script>

<template>
  <main class="home">
    <Navigation :links="links" :tabTitle="currentTitle" :onSwitch="onSwitch" />
    <Tabs :currentTitle="currentTitle" :currentComponent="currentComponent" />
  </main>
</template>
