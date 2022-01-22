<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import VirtualList from './packages/VirtualList.vue'
import { ref } from 'vue';

const data = ref<Record<string, any>[]>([])

const arr = []
for (let index = 0; index < 100000; index++) {
  arr.push({
    label: `item ${index}`,
    value: index
  })
}
data.value = arr
</script>

<template>
  <VirtualList :data="data" style="height: 500px" :index="10000">
    <template #default="{ item }">
      <div>{{ item.label }}</div>
    </template>
  </VirtualList>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
