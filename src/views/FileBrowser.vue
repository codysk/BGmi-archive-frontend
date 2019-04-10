<template>
  <div
    class="container-fluid start-screen h-100"
    style="overflow: auto;"
  >
    <h1 class="start-screen-title">Archived Bangumi</h1>
    <div class="tiles-area clear">
      <TileGroup
        v-for="(group, index) in fileArr"
        :file-arr="group"
        :key="index"
        :index="index"
      />

    </div>
  </div>
</template>

<script>
import TileGroup from './components/TileGroup.vue'
import $ from 'jquery'
import axios from 'axios'
var fileArr = []
export default {
  name: 'FileBrowser',
  components: {
    TileGroup
  },
  data: function() {
    return { 
      fileArr: fileArr
    }
  },
  mounted(){
    this.fetchData()
  },
  create(){
  
  },
  watch:{
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      fileArr.length = 0;
      console.log(this.$route)
      axios
        .get(this.$route.path)
        .then(resp => {
          var file_list = this.getList(resp.data)
          //console.log(file_list)
          var group_index = 0
          for (var group of file_list) {
          	fileArr.push([])
          	for (var file of group){
	            fileArr[group_index].push(file)
          	}
          	group_index += 1
          }
          console.log(fileArr)
          this.$nextTick(function(){
            this.reflow()
          })
          
        })
      
    },
    getList(html){
      var bodylines = html.split('\n')
      var file_list = [[]]
      var file_list_group_index = 0
      var file_count = 0
      for (var i in bodylines) {
      	var m = false
        if (m = /\s*<a href="(.+?)">(.+?)<\/a>\s+(\S+)\s+(\S+)\s+(\S+)\s*/.exec(bodylines[i])) {
          var filename = m[1]
          var datetime = m[3] + ' ' + m[4]
          var size = m[5]
          var type = ''
          if (/\/$/.test(filename)) {
            type = 'file-directory'
          } else if (/\.(zip|7z|bz2|gz|tar|tgz|tbz2|xz|cab)$/.test(filename)) {
            type = 'file-zip'
          } else if (/\.(jpg|png|bmp|gif|ico|webp)$/.test(filename)) {
            type = 'file-image'
          } else if (/\.(flv|mp4|mkv|avi|mkv|webm)$/.test(filename)) {
            type = 'file-video'
          } else {
            type = 'file'
          }
          var displayname = decodeURIComponent(filename.replace(/\/$/, ''))
          file_list[file_list_group_index].push({name: displayname, filename: filename, datetime: datetime, size: size, type: type})
          file_count += 1
          if (file_count % 15 == 0) {
          	file_list.push([])
          	file_list_group_index += 1
          }
        }
      }
      return file_list
    },
    reflow(){
      $.StartScreen = function(){
      var plugin = this;
      var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  
      plugin.init = function(){
        setTilesAreaSize();
        if (width > Metro.media_sizes.LD) {
          addMouseWheel();
          $(".start-screen").css({
              overflow: "auto"
          })
        }
      };
      var setTilesAreaSize = function(){
        var groups = $(".tiles-group");
        var tileAreaWidth = 80;
        $.each(groups, function(i, t){
          if (width <= Metro.media_sizes.LD) {
            tileAreaWidth = width;
          } else {
            tileAreaWidth += $(t).outerWidth() + 80;
          }
        });
        $(".tiles-area").css({
            width: tileAreaWidth
        });
      };
      var addMouseWheel = function (){
        $("body").mousewheel(function(event, delta, deltaX, deltaY){
          var page = $(".start-screen");
          var scroll_value = delta * 50;
          //console.log(scroll_value);
          page.scrollLeft(page.scrollLeft() - scroll_value);
          return false;
        },{
          passive: true
        });
      };
  
      plugin.init();
    };
  
    $.StartScreen();
  
      $.each($('[class*=tile-]'), function(){
        var tile = $(this);
        setTimeout(function(){
          tile.css({
            opacity: 1,
            "transform": "scale(1)",
            "transition": ".3s"
          }).css("transform", false);
  
        }, Math.floor(Math.random()*500));
      });
    
      $(".tiles-group").animate({
        left: 0
      });
    
      $(window).on(Metro.events.resize + "-start-screen-resize", function(){
        $.StartScreen();
      });
    }
  }
}
</script>

<style scoped>
.tile-large, .tile-medium, .tile-wide, .tile-small {
	opacity: 1;
    transform: scale(1);
    transition: all 0.3s ease 0s;
}
</style>