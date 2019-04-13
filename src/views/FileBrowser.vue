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
        :group-size="groupSize"
      />

    </div>
  </div>
</template>

<script>
import TileGroup from './components/TileGroup.vue'
import utils from '../utils.js'
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
      fileArr: fileArr,
      groupSize: 5
    }
  },
  mounted(){
    this.fetchData(this.$route)
  },
  created(){
  	  var availWidth = document.body.clientWidth
  	  if (availWidth <= 640) {
      this.groupSize = Math.floor((availWidth - 10) / 160)
      console.log('update group_size: ' + this.groupSize)
    }
  },
  watch:{
    '$route': 'fetchData'
  },
  methods: {
    fetchData (url) {
      url = url.path
      fileArr.length = 0;
      console.log(url)

      var file_list = this.$wsCache.get('url2filelist:' + url);
      if (file_list) {
        this.handleFileList(file_list)
        console.log('from cache')
        return
      }
      
      axios
        .get(url)
        .then(resp => {
          var file_list = utils.getList(resp.data)
          this.$wsCache.set('url2filelist:' + url, file_list, {exp: 3600})
          this.handleFileList(file_list)
        })
      
    },
    handleFileList(file_list){
      var file_list = utils.groupList(file_list)
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
    },
    reflow(){
      var $this = this
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
          	// console.log($this)
            tileAreaWidth = (150 * $this.groupSize) + ($this.groupSize * 10);
            $(".container-fluid").removeClass('h-100')
            $(".container-fluid").css({height: 'auto'})
            console.log("tileAreaWidth: " + tileAreaWidth)
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
.tiles-group::before{
	text-overflow: ellipsis;
}
.tiles-area {
	margin: 0 auto;
	left: 5px;
}
</style>