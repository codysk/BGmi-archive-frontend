<template>
  <router-link
    v-if="file.type == 'file-directory'"
    class="tile-medium"
    :to="$route.path + file.filename"
  >
    <img
      :src="imgUrl"
      v-show="show"
      @load='imgLoaded'
    >
    <span
      :class="iconClass" 
      v-show="!show"
    />
    <span :class="brandingClass">{{ file.name }}</span>
  </router-link>

  <router-link
    v-else-if="file.type == 'file-video'"
    class="tile-medium"
    :to="'/.player' + $route.path + file.filename"
  >
    <img
      :src="imgUrl"
      v-show="show"
      @load='imgLoaded'
    >
    <span
      :class="iconClass" 
      v-show="!show"
    />
    <span :class="brandingClass">{{ file.name }}</span>
  </router-link>

  <a 
    v-else-if="file.type == 'file-zip' || file.type == 'file-image' || file.type == 'file'"
    class="tile-medium"
    :href="$route.path + file.filename"
  >
    <img
      :src="imgUrl"
      v-show="show"
      @load='imgLoaded'
    >
    <span
      :class="iconClass" 
      v-show="!show"
    />
    <span :class="brandingClass">{{ file.name }}</span>
  </a>
</template>

<script>
import utils from '../../utils.js'
import axios from 'axios'
export default {
  props: {
    file: {
      type: Object,
      default: function(){
        return {name: 'miss'}
      },
      required: true
    },
  },
  data: function(){
    return {
      show: false,
      imgUrl: '#',
      brandingClass: 'branding-bar',
      iconClass:'',
      retry: 0
    }
  }, 
  created(){

    if (this.file.type == 'file-directory') this.iconClass = 'mif-folder-open mif-4x'
    if (this.file.type == 'file-zip') this.iconClass = 'mif-file-zip mif-4x'
    if (this.file.type == 'file-image'){
      this.imgUrl = this.$route.path + this.file.filename
    }
    if (this.file.type == 'file-video') this.iconClass = 'mif-file-play mif-4x'
    if (this.file.type == 'file') this.iconClass = 'mif-file-empty mif-4x'
    
  },
  mounted(){
  	if(this.file.type == 'file-directory') this.fetchData(this.$route.path + this.file.filename)
  },
  methods: {
    fetchData(url){
      if (/^\d+$/.test(this.file.name)) { return } // 纯数字的文件夹不爬图

      var file_list = this.$wsCache.get('url2filelist:' + url);
      if (file_list) {
        this.handleFileList(file_list)
        console.log('from cache')
        return
      }

      axios
        .get(this.$route.path + this.file.filename)
        .then(resp => {
          var file_list = utils.getList(resp.data)
          this.$wsCache.set('url2filelist:' + url, file_list, {exp: 3600})
          // console.log(file_list)
          this.handleFileList(file_list)
        })
    },
    handleFileList(file_list){
      for (var item of file_list){
        if (/\.(jpg|png|bmp|gif|ico|webp)$/.test(item.filename)) {
          this.imgUrl = this.$route.path + this.file.filename + item.filename
        }
      }
    },
    imgLoaded(){
    	this.show = true
    	this.brandingClass = 'branding-bar branding-bar-shadow'
    }

  }
}
</script>

<style scoped>
img {
    height: 100%;
    object-fit: cover;
    width: 100%;
}
a{
	display: flex;
    align-items: center;
    justify-content: center;
}
.branding-bar-shadow {
    background-color: rgba(0,0,0,0.4);
}
</style>