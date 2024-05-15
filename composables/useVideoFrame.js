// import video1 from '~/public/video/01_01.mp4'
// import video2 from '~/public/video/01_02.mp4'
// import video3 from '~/public/video/01_03.mp4'
// import video4 from '~/public/video/01_04.mp4'
// import video5 from '~/public/video/01_05.mp4'
// import video6 from '~/public/video/01_06.mp4'
// import video7 from '~/public/video/01_07.mp4'
// import video8 from '~/public/video/01_08.mp4'
// import video9 from '~/public/video/01_09.mp4'

const video1 = 'public/video/01_01.mp4'
const video2 = 'public/video/01_02.mp4'
const video3 = 'public/video/01_03.mp4'
const video4 = 'public/video/01_04.mp4'
const video5 = 'public/video/01_05.mp4'
const video6 = 'public/video/01_06.mp4'
const video7 = 'public/video/01_07.mp4'
const video8 = 'public/video/01_08.mp4'
const video9 = 'public/video/01_09.mp4'

const animating = ref(false)
const frames = ref({
  1: {
    playing: true,
    loaded: false,
    src: video1,
    isTransition: false,
    element: null,
  },
  2: {
    playing: false,
    loaded: false,
    src: video2,
    isTransition: true,
    element: null,
  },
  3: {
    playing: false,
    loaded: false,
    src: video3,
    isTransition: false,
    element: null,
  },
  4: {
    playing: false,
    loaded: false,
    src: video4,
    isTransition: true,
    element: null,
  },
  5: {
    playing: false,
    loaded: false,
    src: video5,
    isTransition: false,
    element: null,
  },
  6: {
    playing: false,
    loaded: false,
    src: video6,
    isTransition: true,
    element: null,
  },
  7: {
    playing: false,
    loaded: false,
    src: video7,
    isTransition: false,
    element: null,
  },
  8: {
    playing: false,
    loaded: false,
    src: video8,
    isTransition: true,
    element: null,
  },
  9: {
    playing: false,
    loaded: false,
    src: video9,
    isTransition: false,
    element: null,
  },
})
const frameKeys = computed(() => Object.keys(frames.value))


export const useVideoFrame = () => {
  const showFrame = (n) => {
    if (animating.value) return

    const nKey = n.toString()
    animating.value = true

    frames.value[nKey].playing = true

    if (frames.value[nKey].isTransition) {
      // когда закончится
      frames.value[nKey].element.addEventListener("ended", () => {
        console.log('ended')
        // переключить на следующее
        showFrame(n + 1)
      })
    }

    Object.keys(frames.value).forEach((key) => {
      if (key === nKey) return

      frames.value[key].playing = false
    })

    setTimeout(() => {
      animating.value = false
    }, 150)
  }

  return {
    frames,
    frameKeys,
    animating,
    showFrame
  }
}
