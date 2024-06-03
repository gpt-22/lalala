import { locations } from '~/pages/gallery.data'

const swiperInstance = ref()
const currentIndex = ref(0)
const currentLocation = ref(null)
const currentSlideProgress = ref(0)
const currentSlideStartTime = ref(0)
const timeLeftPaused = ref(0)

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
    console.log('setNextLocation', currentLocation.value.key, swiperInstance.value)

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

    // swiperInstance.value.start()
  }
  const animateProgress = (timestamp) => {
    console.log('ANIMATE PROGRESS')
    if (!currentSlideStartTime.value) currentSlideStartTime.value = timestamp

    const timeLeft = timestamp - currentSlideStartTime.value || 0

    currentSlideProgress.value = (timeLeft / 5200) * 100 // Math.min((timeLeft / 5000) * 100, 100)

    if (play.value && currentSlideProgress.value < 100) {
      requestAnimationFrame(animateProgress)
    } else {
      timeLeftPaused.value = timeLeft
    }
  }

  const resetState = () => {
    play.value = false
    swiperInstance.value?.autoplay?.stop()
    currentIndex.value = 0
    currentSlideProgress.value = 0
    currentSlideStartTime.value = 0
    timeLeftPaused.value = 0
  }

  // EFFECTS
  watch(currentLocation, resetState)

  return {
    swiperInstance,
    currentIndex,
    currentLocation,
    currentSlideProgress,
    currentSlideStartTime,
    timeLeftPaused,
    //
    play,
    mute,
    fullscreen,
    //
    currentSlideStartProgress,
    totalProgress,
    //
    setLocation,
    setNextLocation,
    setCurrentSlide,
    animateProgress
  }
}
