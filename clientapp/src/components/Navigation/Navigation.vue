<script setup lang="ts">
import './Navigation.css';
import '../../directives/TooltipDirective/TooltipDirective.css';
import logo from '../../images/logo.svg';
import avatar from '../../images/avatar-1.jpg';

import { Tab } from '../../models/models';

import MyButton from '../UI/MyButton/MyButton.vue';

interface NavigationProps {
  links: Tab[];
  onSwitch: Function;
  tabTitle: string;
}

const props = defineProps<NavigationProps>();
const { links, onSwitch } = toRefs(props);

const handleSwitchComponent = (tabTitle: string, component: Component) => {
  onSwitch.value(tabTitle, component);
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
../../models/models
