<template>
  <div class="video-container">
    <video
      v-for="video in videos"
      v-show="video.playing"
      :class="{
        playing: video.playing,
        saturated: videoSaturated
      }"
      :key="video.key"
      :ref="(el) => setElement(video.key, el)"
      :id="`video${video.key}`"
      :src="video.src"
      preload="auto"
      :autoplay="video.playing"
      muted
      :loop="!video.isTransition"
      class="video"
      controlslist="nodownload nofullscreen"
      disablepictureinpicture
      playsinline
      webkit-playsinline
      @ended="onEnded(video)"
    />
  </div>
</template>

<script setup>
const { videos, videoSaturated, isTransition, setElement } = useVideo()

const onEnded = (video) => {
  if (video.isTransition) isTransition.value = false
}

console.log('here3', videos.value[0].onLoaded)
</script>

<style scoped lang="scss">
.video-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  min-height: 100vh;
  overflow: hidden;
  background-size: cover;
  z-index: -1;
  opacity: 0.9;
}

.video {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
  transition: filter 1s;
  z-index: 1;
}

.video.playing {
  z-index: 2;
}

.saturated {
  filter: saturate(50%);
}
</style>
