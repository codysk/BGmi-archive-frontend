<template>
  <div
    class="container-fluid h-100 player-screen"
    style="overflow: auto;"
  >
    <h1 class="start-screen-title">Player</h1>
    <div class="filepath">{{ path }}</div>
    <div class="player-container">
      
      <div id="player"/>
    </div>
  </div>
</template>

<style scoped>
.player-screen {
  padding-top: 140px;
}
.player-container {
  background-color: white;
  width: 70%;
  margin: 0 auto 120px auto;
}
.start-screen-title {
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
}
.filepath {
  width: 70%;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 0 auto 0 auto;
  color: inherit;
  height: 1.5em;
  line-height: 1.5em;
  overflow: hidden;
}
</style>

<script>
import DPlayer from 'dplayer';
import 'dplayer/dist/DPlayer.min.css';

export default {
  name: 'Player',
  data: function() {
    return {
      filename: "*****",
      path: "********"
    }
  },
  mounted(){

    var path = this.$route.path
    path = path.slice(8)
    this.path = path
    console.log(path)
    var filename = path.split('/').pop();
    filename = decodeURIComponent(filename.replace(/\/$/, ''))
    this.filename = filename
    this.$nextTick(() => {
      const dp = new DPlayer({
        container: document.getElementById('player'),
        screenshot: true,
        autoplay: false,
        video: {
            url: path,
        }
      });
    })
  }
}
</script>
