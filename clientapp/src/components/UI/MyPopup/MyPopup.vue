<script setup lang="ts">
import './MyPopup.scss';

import MyButton from '../MyButton/MyButton.vue';

const emit = defineEmits(['closePopup', 'update:modelValue']);

interface Props {
  modelValue: boolean;
  title: string;
}

const props = defineProps<Props>();

const popup = ref<HTMLElement | null>(null);

const closePopup = (): void => emit('closePopup');

const handleCloseByEsc = (event: KeyboardEvent): void => {
  if (event.key === 'Escape' && modelUpdate.value) {
    closePopup();
  }
};

const handleCloseByOverlay = (event: MouseEvent): void => {
  if (event.target === popup.value) {
    closePopup();
  }
};

const modelUpdate = computed({
  get: () => props.modelValue,
  set: (newValue) => emit('update:modelValue', newValue),
});

onMounted(() => {
  document.addEventListener('keydown', handleCloseByEsc);

  document.addEventListener('click', handleCloseByOverlay);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleCloseByEsc);

  document.removeEventListener('click', handleCloseByOverlay);
});

watch(modelUpdate, () => {
  if (modelUpdate.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
});
</script>

<template>
  <Transition name="popup">
    <div ref="popup" class="popup" v-if="modelUpdate">
      <div class="popup__content">
        <div class="popup__header">
          <h3 class="popup__title">{{ title }}</h3>
          <MyButton
            type="button"
            ariaLabel="Закрытие окна"
            class="popup__close"
            @click="closePopup"
          >
            <template #icon>
              <font-awesome-icon icon="fa-solid fa-xmark" />
            </template>
          </MyButton>
        </div>
        <div class="popup__body">
          <slot name="body" />
        </div>
      </div>
    </div>
  </Transition>
</template>
