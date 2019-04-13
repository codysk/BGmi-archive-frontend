<template>
  <div 
    :class="classStr" 
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
    :class="classStr" 
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
    },
    groupSize:{
      type: Number,
      default: 5,
      required: false
    }
  },
  data(){
    return {
      classStr: ""
    }
  },
  created(){
    this.classStr = "tiles-grid tiles-group fg-white size-" + this.groupSize
  },
  components: {
    Tile
  }
}
</script>
