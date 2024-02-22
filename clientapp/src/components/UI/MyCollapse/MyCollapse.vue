<script setup lang="ts">
import './MyCollapse.css';

import MyButton from '../MyButton/MyButton.vue';

const emit = defineEmits({
  'update:modelValue': (_value: Boolean) => true,
});

const props = defineProps<{ modelValue: boolean }>();

const visible = computed({
  get: () => props.modelValue,
  set: (newValue: boolean) => emit('update:modelValue', newValue),
});

const toggleVisible = (): void => {
  visible.value = !visible.value;
};
</script>

<template>
  <div class="collapse">
    <MyButton
      type="button"
      :class="['collapse__button', { collapse__button_active: visible }]"
      @click="toggleVisible"
    >
      <template #icon>
        <slot name="header" />
        <font-awesome-icon
          icon="fa-solid fa-chevron-down"
          :class="['collapse__icon', { collapse__icon_active: visible }]"
        />
      </template>
    </MyButton>
    <Transition name="collapse">
      <div v-if="visible" class="collapse__body">
        <slot name="body" />
      </div>
    </Transition>
  </div>
</template>
