import { App } from 'vue'
import VirtualList from './TpVirtualList.vue'

VirtualList.install = function(app: App) {
  app.component(VirtualList.name, VirtualList)
}

export default VirtualList