<template>
  <div
    class="container-fluid h-100 player-screen"
    style="overflow: auto;"
  >
    <h1 class="start-screen-title">Bangumi.mp4</h1>
    <div class="player-container">
      <div id="dplayer"/>
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
  min-height: 30%;
  margin: 60px auto 0 auto;
}
</style>

<script>
import 'dplayer/dist/DPlayer.min.css';
import DPlayer from 'dplayer';

export default {
  name: 'Player',
  mounted(){
    this.$nextTick(() => {
      const dp = new DPlayer({
        container: document.getElementById('dplayer'),
        screenshot: true,
        autoplay: false,
        video: {
            url: '#',
        }
      });
    })
  }
}
</script>
