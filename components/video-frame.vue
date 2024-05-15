<template>
  <div class="section-intro-media">
    <video
      v-for="(video, idx) in frames"
      v-show="video.playing"
      ref="videoRefs"
      :id="`video${idx}`"
      :src="`${config.public.baseURL}/${video.src}`"
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
import { useVideoFrame } from "../composables/useVideoFrame"

const { frameKeys, frames } = useVideoFrame()

const videoRefs = ref([])

// TODO: load 1 => then others

const onLoad = () => {
  frameKeys.value.forEach((key) => {
    videoRefs.value[key - 1].addEventListener("loadeddata", () => {
      if (videoRefs.value[key - 1].readyState === 4) {
        frames.value[key].loaded = true
        frames.value[key].element = videoRefs.value[key - 1]

        console.log('loaded', key)
      }
    });
  })
}

onMounted(() => {
  onLoad()
})
</script>

<style scoped lang="scss">


.section-intro-media {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  min-height: 100vh;
  overflow: hidden;
  //background: url("~/public/video/placeholder.jpeg") no-repeat center center;
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
}
</style>
