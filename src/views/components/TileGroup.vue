<template>
  <div 
    class="tiles-grid tiles-group size-5 fg-white" 
    :data-group-title="decodeURIComponent($route.path.replace(/\/$/, ''))"
    v-if="index == 0"
  >
    <Tile
      v-for="file in fileArr"
      :key="file.name"
      :file="file"
    />
  </div>
  <div 
    class="tiles-grid tiles-group size-5 fg-white" 
    v-else
  >
    <Tile
      v-for="file in fileArr"
      :key="file.name"
      :file="file"
    />
  </div>
</template>

<script>
import Tile from './Tile.vue'

export default {
  props: {
    fileArr:{
      type: Array,
      default: function () {
        return []
      },
      required: false
    },
    index:{
      type: Number,
      default: 0,
      required: false
    }
  },
  components: {
    Tile
  }
}
</script>
