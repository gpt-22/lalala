<template>
  <div class="video-container">
    <video
      v-for="(video, idx) in videos"
      v-show="video.playing"
      :class="{
        playing: video.playing,
        saturated: videoSaturated
      }"
      :key="video.key"
      :ref="setVideoRef"
      :id="`video-${idx}`"
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
    />
  </div>
</template>

<script setup>
const { videos, videoSaturated } = useVideo()

const setVideoRef = (element) => {
  const index = element.id.split('-')[1]

  if (videos.value[index].element) return

  videos.value[index].element = element

  element.load()

  element.addEventListener('loadeddata', () => {
    console.log('loadeddata', element.readyState)
    if (element.readyState === 3 || element.readyState === 4) {
      videos.value[index].loaded = true

      const frame = videos.value[index]
      Object.keys(frame.onLoaded).forEach((key) => {
        frame.onLoaded[key]()
      })

      console.log(`VIDEO ${videos.value[index].key} LOADED`)
    }
  })
}
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
