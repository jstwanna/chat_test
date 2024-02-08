<script setup lang="ts">
import { HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";

const hubConnection = new HubConnectionBuilder().withUrl("/hub/chat").build();

const mess = ref("");

const test = async (tries: number) => {
  if (hubConnection.state === HubConnectionState.Disconnected) {
    await hubConnection.start();
  }

  if (hubConnection.state === HubConnectionState.Connected) {
    await hubConnection.invoke("Send", mess.value);
  } else {
    if (tries < 5) {
      setTimeout(test, 200, ++tries);
    }
  }
};

const messHistory = ref<string[]>([]);

hubConnection.on("Receive", (m) => messHistory.value.push(m));
</script>

<template>
  <input v-model="mess" type="text" />
  <button @click="test(0)">Test</button>
  <div v-for="m in messHistory" :key="m">{{ m }}</div>
</template>
