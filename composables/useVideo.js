import { allVideos, lifecycleHookNames, sectionToVideoKey } from './useVideo.data.js'

const startLoading = ref(true)
const isTransition = ref(false)
const videoSaturated = ref(false)

const videos = ref([])

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

  const load1 = () => {
    // Предзагрузка нескольких видео (появятся в DOM)
    const firstLoadKeys = ['1']
    videos.value = allVideos
      .filter((video) => firstLoadKeys.includes(video.key))
      .map((video) => {
        const clone = structuredClone(video)
        clone[lifecycleHookNames.onMounted]['onVideoMounted'] = () => onVideoMounted(video.key)
        clone[lifecycleHookNames.onLoaded]['onVideoLoaded'] = () =>
          onVideoLoaded(video.key, defaultShowOptions)

        return clone
      })
  }

  const load2 = () => {
    const secondLoadKeys = ['2', '3', '4', '5']
    const secondLoadVideos = allVideos
      .filter((video) => secondLoadKeys.includes(video.key))
      .map((video) => {
        const clone = structuredClone(video)
        clone[lifecycleHookNames.onMounted]['onVideoMounted'] = () => onVideoMounted(video.key)
        clone[lifecycleHookNames.onLoaded]['onVideoLoaded'] = () =>
          onVideoLoaded(video.key, defaultShowOptions)

        return clone
      })
    videos.value.push(...secondLoadVideos)
  }

  const getVideo = (key) => {
    return videos.value.find((video) => video.key === key)
  }

  const setElement = (key, element) => {
    const video = getVideo(key)

    if (!element) {
      video.element = null
      return
    }

    if (video.element) {
      return
    }

    video.element = element

    runCallbacks(key, lifecycleHookNames.onMounted)

    video.element.load()

    video.element.addEventListener('loadeddata', () => {
      if (video.element.readyState === 3 || video.element.readyState === 4) {
        video.loaded = true
        runCallbacks(key, lifecycleHookNames.onLoaded)
      }
    })
  }

  const runCallbacks = (key, lifecycleHookName) => {
    const video = getVideo(key)

    if (video.disableOnLoaded && lifecycleHookName === lifecycleHookNames.onLoaded) {
      video.disableOnLoaded = false
      return
    }

    const callbackMap = video[lifecycleHookName]
    Object.keys(callbackMap).forEach((callbackKey) => {
      callbackMap[callbackKey]()
    })
  }

  const onVideoMounted = (key) => {
    const video = getVideo(key)
    // console.log('ON MOUNTED', video.key)
  }

  const onVideoLoaded = (key, options) => {
    const video = getVideo(key)
    console.log('ON LOADED', video.key)

    if (options?.playTime && options?.playTime !== Infinity) {
      setTimeout(() => onVideoEnded(key), options.playTime)

      return
    }

    // TODO: костыль чтобы 1 раз сетить листенер
    if (!video.onEndedSet) {
      video.element.addEventListener('ended', () => onVideoEnded(key))
      video.onEndedSet = true
    }
  }

  const onVideoEnded = (key) => {
    console.log('ON ENDED', key)

    const video = getVideo(key)
    if (!video.element) throw new Error('on video ended нет элемента')

    video.element.currentTime = 0
    video.disableOnLoaded = true
    video.element.load()
    playVideo(video.nextKey)
  }

  const loadVideo = (key, options) => {
    if (!key) return

    let video = getVideo(key)

    if (!video) {
      video = structuredClone(allVideos.find((video) => video.key === key))
      if (!video) throw new Error('Нет видео')

      videos.value.push(video)

      video[lifecycleHookNames.onMounted]['onVideoMounted'] = () => onVideoMounted(key)
      video[lifecycleHookNames.onLoaded]['onVideoLoaded'] = () => onVideoLoaded(key, options)
    }

    return video
  }

  const playVideo = async (key) => {
    currentVideoKey.value = key

    const playingVideo = getVideo(key)
    playingVideo.element.play()
    console.log('PLAY', key)

    // requestAnimationFrame(() => {
    videos.value.forEach((video) => {
      video.playing = video.key === key
    })
    // })

    runCallbacks(key, lifecycleHookNames.onPlay)
  }

  const showVideo = (key, options) => {
    if (!key) return

    const mergedOptions = { ...defaultShowOptions, ...options }
    console.log('SHOW FRAME', key, mergedOptions)

    const video = loadVideo(key, mergedOptions)
    if (video.key === '1') {
      video[lifecycleHookNames.onLoaded]['load2'] = () => load2()
    } else {
      video.loadKeys.forEach((loadKey) => loadVideo(loadKey))
    }

    if (mergedOptions.play) {
      if (video.loaded) {
        playVideo(key)
      } else {
        video[lifecycleHookNames.onLoaded]['play'] = () => playVideo(key)
      }
    }

    if (video.section && !video[lifecycleHookNames.onPlay]['go-to-section']) {
      video[lifecycleHookNames.onPlay]['go-to-section'] = () => router.push(`/${video.section}`)
    }

    if (video.isTransition) {
      isTransition.value = true
    }

    if (video.isTransition || mergedOptions.playNext) {
      showVideo(video.nextKey, { play: false })
    }
  }

  return {
    // const
    allVideos,
    lifecycleHookNames,
    sectionToVideoKey,

    // state
    videos,
    currentVideo,
    currentVideoKey,
    isTransition,
    startLoading,
    videoSaturated,

    // methods
    getVideo,
    showVideo,
    playVideo,
    runCallbacks,
    setElement,
    load1,
    load2
  }
}
