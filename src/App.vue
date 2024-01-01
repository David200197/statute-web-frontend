<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import logoUrl from './assets/logo.svg'
</script>

<template>
  <v-card class="mx-auto" max-width="448">
    <v-layout>
      <v-app-bar color="white" density="default">
        <v-app-bar-title
          ><img :src="logoUrl" class="app-bar-title" alt="" width="50px" height="50px"
        /></v-app-bar-title>

        <template v-slot:append>
          <v-btn icon="mdi-dots-vertical">A</v-btn>
          <v-btn icon="mdi-dots-vertical">A</v-btn>
          <v-btn icon="mdi-dots-vertical">A</v-btn>
        </template>
      </v-app-bar>
    </v-layout>
    <RouterView />
  </v-card>
</template>

<style scoped>
.app-bar-title {
  display: flex;
  justify-content: center;
}
</style>
