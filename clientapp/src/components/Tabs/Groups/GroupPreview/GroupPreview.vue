<script setup lang="ts">
import './GroupPreview.css';

import { Group } from '../../../../models/models';
import Preview from '../../Preview/Preview.vue';

interface GroupPreviewProps {
  groups: Group;
}

const props = defineProps<GroupPreviewProps>();
const { groups } = toRefs(props);
</script>

<template>
  <Preview :to="groups.to" class="group-preview">
    <template #preview>
      <span class="group-preview__title">{{
        groups.title[0].toUpperCase()
      }}</span>
      <div class="group-preview__content">
        <h5 class="group-preview__title-full">#{{ groups.title }}</h5>
        <span class="group-preview__miss">+23</span>
      </div>
    </template>
  </Preview>
</template>
../../../../models/models
