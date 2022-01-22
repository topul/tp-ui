<template>
  <div class="virtual-list-container" ref="root" @scroll.passive="handleScroll">
    <div class="virtual-list-scroll" :style="`height: ${scrollHeight}px;`">
      <div
        class="virtual-list-item-container"
        v-for="(item, index) in pool"
        :key="index"
        :style="`height: ${itemHeight}px;position: absolute;top: ${offsetTop + itemHeight * index}px`"
      >
        <slot :item="item" :index="item._index"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref, toRefs } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  itemHeight: {
    type: Number,
    default: () => 50
  },
  buffer: {
    type: Number,
    default: () => 10
  },
  // add support for scrollTo
  index: {
    type: Number,
    default: () => 0
  }
})
const { data, buffer, itemHeight } = toRefs(props)
const root = ref<HTMLElement | null>(null)
const pool = ref<any[]>([])
const scrollHeight = computed(() => data.value.length * itemHeight.value)
const dataRange = reactive({
  start: props.index,
  end: 0
})

let containerSize = ref(0)
const renderLines = ref(0)
const offsetTop = ref(0)
let isScrollBusy = false


// 动态获取渲染数据
const getRenderData = () => {
  return data.value.slice(dataRange.start, dataRange.end).map((v: any, i) => ({ ...v, _index: dataRange.start + i }))
}

// 渲染滚动条位置
const setOffset = () => {
  dataRange.end = dataRange.start + renderLines.value
  pool.value = getRenderData()
  offsetTop.value = dataRange.start * itemHeight.value
}

const handleScroll = () => {
  if (!root.value) return
  if (isScrollBusy) return
  isScrollBusy = true

  requestAnimationFrame(() => {
    isScrollBusy = false
    if (!root.value) return
    // watch effect会监听dataRange变化，所以只需要更新start位置即可
    dataRange.start = Math.max(Math.floor(root.value.scrollTop / itemHeight.value) - Math.floor(buffer.value / 2), 0)
    setOffset()
  })
}

onMounted(() => {
  if (!root.value) return
  containerSize.value = root.value.clientHeight
  const contentLines = Math.ceil(containerSize.value / itemHeight.value)
  renderLines.value = contentLines + buffer.value
  setOffset()
  root.value.scrollTo({
    top: offsetTop.value,
    behavior: 'smooth'
  })
})
</script>

<style scoped>
.virtual-list-container {
  width: 100%;
  height: 100%;
  min-width: 100px;
  min-height: 100px;
  overflow: auto;
}
.virtual-list-scroll {
  box-sizing: border-box;
  position: relative;
}
.virtual-list-item-container {
  width: 100%;
  overflow: hidden;
}
</style>
