<script setup lang="ts">
import './ContactBlock.css';

import { ContactByLetter } from '../../../../models/models';

const props = defineProps<{ contacts: ContactByLetter[] }>();
const { contacts } = toRefs(props);
</script>

<template>
  <div v-for="contact in contacts">
    <h2>{{ contact.letter }}</h2>
    <div v-for="item in contact.contactItems">
      {{ item.name }}
    </div>
  </div>
</template>
