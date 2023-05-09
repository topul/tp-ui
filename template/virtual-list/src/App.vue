<script setup>
import VirtualList from 'virtual-list'

import { ref } from 'vue';

const data = ref([])

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
  <VirtualList :data="data" style="height: 500px" :scrollToIndex="10000">
    <template #default="{ item }">
      <div>{{ item.label }}</div>
    </template>
  </VirtualList>
</template>

<style scoped>
</style>
