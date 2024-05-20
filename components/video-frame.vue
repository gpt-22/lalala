<template>
  <div class="section-intro-media">
    <video
      v-for="(video, idx) in frames"
      :style="{
        display: video.playing ? 'block' : 'none',
        opacity: video.playing ? 1 : 0,
        zIndex: video.playing ? 1 : 0
      }"
      :key="video.key"
      :ref="setVideoRef"
      :id="`video-${idx}`"
      :src="video.src"
      preload="auto"
      autoplay
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
const config = useRuntimeConfig()

const { frames } = useVideoFrame()

const setVideoRef = (element) => {
  const index = element.id.split('-')[1]

  if (frames.value[index].element) return

  console.log('setVideoRef', index, frames.value[index].element)
  frames.value[index].element = element

  element.addEventListener("loadeddata", () => {
    if (element.readyState === 4) {
      frames.value[index].loaded = true

      const frame = frames.value[index]
      Object.keys(frame.onLoaded).forEach((key) => {
        frame.onLoaded[key]()
      })

      console.log(`VIDEO ${frames.value[index].key} LOADED`)
    }
  })
}
</script>

<style scoped lang="scss">
.section-intro-media {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  min-height: 100vh;
  overflow: hidden;
  //background: url("/video/01_01.png") no-repeat center center;
  background-size: cover;
  z-index: -1;
  opacity: .9;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.05);
  }
}

.video {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
  transition: opacity .3s;
}
</style>
