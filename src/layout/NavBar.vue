<script setup lang="ts">
import logoUrl from '@/assets/logo.svg'
import NavBarLogin from './NavBarLogin.vue'
</script>

<template>
  <v-layout>
    <v-app-bar color="white" density="default">
      <v-app-bar-title
        ><img :src="logoUrl" class="app-bar-title" alt="" width="50px" height="50px"
      /></v-app-bar-title>

      <template v-slot:append>
        <nav-bar-login />
      </template>
    </v-app-bar>
  </v-layout>
</template>

<style scoped>
.app-bar-title {
  display: flex;
  justify-content: center;
}
.btn-link {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
