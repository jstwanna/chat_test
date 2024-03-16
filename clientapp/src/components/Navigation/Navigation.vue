<script setup lang="ts">
import './Navigation.scss';
import '../../directives/TooltipDirective/TooltipDirective.scss';
import logo from '../../images/logo.svg';
import avatar from '../../images/avatar-1.jpg';

import { Tab } from '../../models/models';

import MyButton from '../UI/MyButton/MyButton.vue';

interface Props {
  links: Tab[];
  onSwitch: (tabTitle: string, component: Component) => void;
  tabTitle: string;
}

const props = defineProps<Props>();

const handleSwitchComponent = (tabTitle: string, component: Component) => {
  props.onSwitch(tabTitle, component);
};
</script>

<template>
  <section class="navigation">
    <img :src="logo" alt="Лого" class="navigation__logo" />
    <nav>
      <ul class="navigation__links">
        <li v-for="link in links" :key="link.id">
          <MyButton
            type="button"
            :class="[
              'navigation__link',
              { navigation__link_active: tabTitle === link.toolTip },
            ]"
            ariaLabel="Навигационная кнопка"
            v-tooltip="{ text: link.toolTip, position: 'top' }"
            @click="handleSwitchComponent(link.toolTip, link.component)"
          >
            <template #icon>
              <font-awesome-icon :icon="`fa-solid ${link.icon}`" />
            </template>
          </MyButton>
        </li>
      </ul>
    </nav>
    <img :src="avatar" alt="Фото аватара" class="navigation__image-profile" />
  </section>
</template>
