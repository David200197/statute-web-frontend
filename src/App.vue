<script setup lang="ts">
import NavBar from '@/layout/NavBar.vue'
</script>

<template>
  <v-card class="mx-auto" max-width="448">
    <NavBar></NavBar>
    <router-view />
  </v-card>
</template>

<style scoped></style>
