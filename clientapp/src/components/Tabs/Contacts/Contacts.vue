<script setup lang="ts">
import './Contacts.css';

import { ContactByLetter } from '../../../models/models';
import { useFilteredArray } from '../../../composables/useFilteredArray';

import SearchBox from '../SearchBox/SearchBox.vue';
import ContactBlock from './ContactBlock/ContactBlock.vue';

interface Contact {
  id: number;
  name: string;
}

const searchContact = ref<string>('');

const contacts = ref<Contact[]>([
  {
    id: 1,
    name: 'Богданова Диана',
  },
  {
    id: 2,
    name: 'Федорова Екатерина',
  },
  {
    id: 3,
    name: 'Лебедева Ирина',
  },
  {
    id: 4,
    name: 'Суслова Елизавета',
  },
  {
    id: 5,
    name: 'Трофимова Мила',
  },
  {
    id: 5,
    name: 'Романова Анастасия',
  },
  {
    id: 5,
    name: 'Александрова Ева',
  },
  {
    id: 5,
    name: 'Алексеева Анна',
  },
  {
    id: 5,
    name: 'Смирнова Мария',
  },
]);

const sortedContacts = computed(() => {
  const contactsByFirstLetter: Record<string, ContactByLetter[]> = {};

  contacts.value.forEach((contact) => {
    const firstLetter = contact.name.charAt(0);
    if (!contactsByFirstLetter[firstLetter]) {
      contactsByFirstLetter[firstLetter] = [];
    }
    contactsByFirstLetter[firstLetter].push({
      letter: firstLetter,
      contactItems: [{ name: contact.name }],
    });
  });

  const sortedKeys = Object.keys(contactsByFirstLetter).sort();

  return sortedKeys.map((key) => ({
    letter: key,
    contactItems: contactsByFirstLetter[key]
      .sort((a, b) => a.letter.localeCompare(b.letter))
      .flatMap((contact) => contact.contactItems),
  }));
});

// снизу фильтрация работает корректно

// в поле contacts
const filteredContacts = computed(() => {
  const query = searchContact.value.toLowerCase();

  if (!query) {
    return sortedContacts.value;
  }

  return sortedContacts.value
    .map((contactByLetter) => {
      return {
        ...contactByLetter,
        contactItems: contactByLetter.contactItems.filter((contact) =>
          contact.name.toLowerCase().includes(query)
        ),
      };
    })
    .filter((contactByLetter) => contactByLetter.contactItems.length > 0);
});

// v-if

const isFilteredContactsNotEmpty = computed(
  () => filteredContacts.value.length > 0
);

// новая фильтрация, которая сделана на основе многозадачной ф-ции

const { isNotEmpty, filteredArray, isFilteredArrayNotEmpty } =
  useFilteredArray<ContactByLetter>(
    sortedContacts,
    searchContact,
    'contactItems.name'
  );
</script>

<template>
  <div class="contacts">
    <SearchBox v-model="searchContact" placeholder="Найти пользователя" />
    <div class="contacts__list" v-if="isFilteredArrayNotEmpty">
      <ContactBlock :contacts="filteredArray" />
    </div>
    <div v-else>Error</div>
  </div>
</template>
