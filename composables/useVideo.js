import { nextTick } from 'vue'
import { allVideos } from './useVideo.data.js'

const startLoading = ref(true)
const isTransition = ref(false)
const videoSaturated = ref(false)
const videos = ref(allVideos.slice(allVideos.length))

const currentVideoKey = ref('1')
const currentVideo = computed(() => {
  return videos.value.find((video) => video.key === currentVideoKey.value)
})

const defaultShowOptions = {
  play: true,
  playNext: false,
  playTime: Infinity
}

export const useVideo = () => {
  const router = useRouter()

  const getFrame = (key) => {
    return videos.value.find((video) => video.key === key)
  }

  const loadVideo = (key, options) => {
    let video = getFrame(key)
    if (!video) {
      video = allVideos.find((video) => video.key === key)

      if (!video) return

      // console.log('LOADING', key)
      videos.value.push(video)

      video.onLoaded['onloaded'] = () => {
        console.log('ON LOADED', video.key)

        // TODO
        if (video.isTransition) {
          video.element.addEventListener('ended', () => {
            isTransition.value = false
          })
        }

        if (options?.playTime && options?.playTime !== Infinity) {
          console.log('settimeout')
          setTimeout(() => {
            console.log('ON ENDED TIME', video.key)
            playVideo(video.nextKey)
          }, options.playTime)

          return
        }

        video.element.addEventListener('ended', () => {
          console.log('ON ENDED', video.key)
          playVideo(video.nextKey)
        })
      }
    }

    return video
  }

  // states:
  // unmounted
  // mounting
  // mounted
  // loading
  // loaded
  // playing
  // played

  const playVideo = async (key) => {
    currentVideoKey.value = key

    const playingFrame = getFrame(key)

    loadVideo(playingFrame.nextKey)
    loadVideo(playingFrame.prevKey)

    playingFrame.element?.play()
    Object.keys(playingFrame.onPlay).forEach((key) => playingFrame.onPlay[key]())

    if (key !== '1' && !playingFrame.isTransition) {
      startLoading.value = false
    }

    videos.value.forEach((video) => {
      video.playing = video.key === key
    })

    console.log('PLAY', key)
  }

  const playNextAfterFrame = (key, options) => {
    const video = getFrame(key)

    // console.log('playNextAfterFrame', key, video.nextKey)

    showVideo(video.nextKey, { play: false })
  }

  const showVideo = (key, options) => {
    if (!key) return

    const mergedOptions = { ...defaultShowOptions, ...options }

    console.log('SHOW FRAME', key, options)
    const video = loadVideo(key, mergedOptions)

    if (video.section && !video.onPlay['onplay']) {
      video.onPlay['onplay'] = () => router.push(`/${video.section}`)
    }

    if (mergedOptions.play) {
      // console.log('HERE', key)
      playVideo(key)
    }

    if (video.isTransition) {
      isTransition.value = true
    }

    if (video.isTransition || mergedOptions.playNext) {
      playNextAfterFrame(key, mergedOptions)
    }
  }

  return {
    allVideos,
    videos,
    currentVideo,
    currentVideoKey,
    isTransition,
    startLoading,
    videoSaturated,
    showVideo
  }
}
