<template>
  <div id="app" class="h-100">
    <router-view/>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'App',

  mounted(){
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
         console.log(scroll_value);
         page.scrollLeft(page.scrollLeft() - scroll_value);
         return false;
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
</script>

<style src="metro4/build/css/metro-all.css"></style>

<style>

.start-screen {
  min-width: 100%;
  height: 100%;
  position: relative;
  padding-bottom: 20px;
}
.start-screen-title {
  position: fixed;
  top: 20px;
  left: 80px;
  display: none;
}
[class*=tile-] {
  transform: scale(0.8);
}
.tiles-group {
  margin-left: 0;
  margin-top: 50px;
}

@media all and (min-width: 768px) {
  .start-screen-title {
    display: block;
  }
  .start-screen {
    padding: 140px 80px 0 0;
  }
  .tiles-group {
    left: 100px;
  }
  .tiles-group {
    margin-left: 80px;
  }
}
</style>