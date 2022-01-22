# 基于Vue3开发的虚拟滚动列表

安装

```bash
npm i tp-virtual-list
```

使用实例

```html
<script setup>
import VirtualList from 'tp-virtual-list'
import 'tp-virtual-list/dist/style.css'
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
```

属性

| 属性名        | 类型   | 描述                           | 必须 | 默认值 |
| ------------- | ------ | ------------------------------ | ---- | ------ |
| data          | Array  | 列表数据                       | 是   |        |
| itemHeight    | Number | 每行的高度                     | 否   | 50     |
| buffer        | Number | 可视区域上下各多渲染多少条数据 | 否   | 10     |
| scrollToIndex | Number | 默认滚动到第几条               | 否   | 0      |
