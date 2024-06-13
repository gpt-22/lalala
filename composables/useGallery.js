import { throttle } from '~/utils/decorators'
import { locations } from '~/pages/gallery.data'

const swiperInstance = ref()
const currentIndex = ref(0)
const currentLocation = ref(null)
const currentSlideProgress = ref(0)
const currentSlideStartTime = ref(0)
// const slideProgressTimeLeft = ref(0)
const progressIntervals = ref([])

const play = ref(false)
const mute = ref(false)
const fullscreen = ref(false)

export const useGallery = () => {
  const route = useRoute()
  const router = useRouter()

  // GETTERS
  const currentSlideStartProgress = computed(() => {
    return (100 / currentLocation.value?.images.length) * currentIndex.value
  })

  const totalProgress = computed(() => {
    const currentSlideProgressNormalized =
      currentSlideProgress.value / currentLocation.value?.images.length
    return (currentSlideStartProgress.value + currentSlideProgressNormalized).toFixed(2)
  })

  // SETTERS
  const togglePlay = throttle(() => {
    console.log('SWIPER', swiperInstance.value)
    play.value = !play.value
  }, 30)
  const toggleMute = throttle(() => {
    mute.value = !mute.value
  }, 30)
  const toggleFullscreen = throttle(() => {
    fullscreen.value = !fullscreen.value
  }, 30)

  const setCurrentSlide = (index) => {
    console.log('before', index, swiperInstance.value.activeIndex, swiperInstance.value.realIndex)
    currentIndex.value = index
    swiperInstance.value.slideTo(index)
    console.log('after', swiperInstance.value.activeIndex, swiperInstance.value.realIndex)
  }

  const setLocation = (key) => {
    currentLocation.value = locations.find((location) => location.key === key)
  }

  const setNextLocation = () => {
    const locationIndex = locations.findIndex(
      (location) => location.key === currentLocation.value?.key
    )
    currentLocation.value =
      locations[locationIndex + 1 > locations.length - 1 ? 0 : locationIndex + 1]

    router.push({
      name: 'gallery',
      query: {
        location: currentLocation.value.key,
        fromPage: route.query?.fromPage || 'section-3'
      }
    })

    resetState()
    swiperInstance.value.slideTo(0)
    swiperInstance.value.setProgress(0)
    swiperInstance.value.update()
  }
  const animateProgress = (timestamp) => {
    // console.log('ANIMATE PROGRESS', currentSlideProgress.value)
    if (!currentSlideStartTime.value) currentSlideStartTime.value = timestamp

    const timeLeft = timestamp - currentSlideStartTime.value || 0

    currentSlideProgress.value = (timeLeft / 5200) * 100 // Math.min((timeLeft / 5000) * 100, 100)

    if (play.value && currentSlideProgress.value < 100) {
      requestAnimationFrame(animateProgress)
    }
  }

  async function animateProgress2(
    newValue = 100,
    { duration = swiperInstance.value.autoplay.timeLeft, easing = swing, interval = 13 } = {}
  ) {
    const originalProgress = currentSlideProgress.value
    const delta = newValue - originalProgress

    if (!delta || !duration || !easing || !interval) {
      currentSlideProgress.value = newValue
      console.log('RESOLVE', currentSlideProgress.value)
      return Promise.resolve()
    }

    const ticks = Math.floor(duration / interval)
    let tick = 1
    console.log('ANIMATE PROGRESS', originalProgress, delta, ticks)

    return new Promise((resolve) => {
      const timer = setInterval(() => {
        if (!play.value) {
          clearInterval(timer)
          resolve()
        }

        currentSlideProgress.value = originalProgress + (tick / ticks) * delta

        if (++tick === ticks + 1) {
          clearInterval(timer)
          resolve()
        }
      }, interval)

      progressIntervals.value.push(timer)
    })
  }

  function swing(x) {
    return 0.5 - Math.cos(x * Math.PI) / 2
  }

  const resetState = () => {
    play.value = false
    swiperInstance.value?.autoplay?.stop()
    currentIndex.value = 0
    currentSlideProgress.value = 0
    currentSlideStartTime.value = 0
  }

  // EFFECTS
  watch(currentLocation, resetState)

  return {
    swiperInstance,
    currentIndex,
    currentLocation,
    currentSlideProgress,
    currentSlideStartTime,
    //
    play,
    mute,
    fullscreen,
    //
    currentSlideStartProgress,
    totalProgress,
    progressIntervals,
    //
    togglePlay,
    toggleMute,
    toggleFullscreen,
    setLocation,
    setNextLocation,
    setCurrentSlide,
    animateProgress,
    animateProgress2
  }
}
