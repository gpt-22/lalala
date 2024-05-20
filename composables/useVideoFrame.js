import { allFrames } from "./useVideoFrame.data"

const startLoading = ref(true)
const isTransition = ref(false)
const frames = ref([])

const currentVideoKey = ref('1')

// TODO:
// + при перезагрузке показывать лоадер к секции
//

// insert in dom
// ekkekekek
// play
// replay


const defaultShowOptions = {
  play: true,
  playNext: false,
  playTime: Infinity
}

export const useVideoFrame = () => {
  const router = useRouter()

  const getFrame = (key) => {
    return frames.value.find((frame) => frame.key === key)
  }

  const loadFrame = (key, options) => {
    let frame = getFrame(key)
    if (!frame) {
      frame = allFrames.find((frame) => frame.key === key)

      if (!frame) return

      console.log('LOADING', key)
      frames.value.push(frame)

      frame.onLoaded['onloaded'] = () => {
        console.log('ON LOADED', frame.key)

        // TODO
        if (frame.isTransition) {
          frame.element.addEventListener("ended", () => {
            isTransition.value = false
          })
        }

        if (options?.playTime && options?.playTime !== Infinity) {
          console.log('settimeout')
          setTimeout(() => {
            console.log('ON ENDED TIME', frame.key)
            playFrame(frame.nextKey)
          }, options.playTime)

          return
        }

        frame.element.addEventListener("ended", () => {
          console.log('ON ENDED', frame.key)
          playFrame(frame.nextKey)
        })
      }
    }

    return frame
  }

  const playFrame = (key) => {
    currentVideoKey.value = key

    const playingFrame = getFrame(key)

    loadFrame(playingFrame.nextKey)
    loadFrame(playingFrame.prevKey)

    playingFrame.element?.play()
    Object.keys(playingFrame.onPlay).forEach((key) => playingFrame.onPlay[key]())

    if (key !== '1' && !playingFrame.isTransition) {
      startLoading.value = false
    }

    frames.value.forEach((frame) => {
      frame.playing = frame.key === key
    })

    console.log("PLAY", key)
  }

  const playNextAfterFrame = (key, options) => {
    const frame = getFrame(key)

    console.log('playNextAfterFrame', key, frame.nextKey)

    showFrame(frame.nextKey, { play: false })

    // frame.onLoaded['onloaded'] = () => {
    //   console.log('ON LOADED', frame.key)
    //
    //   if (frame.isTransition) {
    //     frame.element.addEventListener("ended", () => {
    //       isTransition.value = false
    //     })
    //   }
    //
    //   if (options.playTime && options.playTime !== Infinity) {
    //     setTimeout(() => {
    //       console.log('ON ENDED TIME', frame.key)
    //       playFrame(frame.nextKey)
    //     }, options.playTime)
    //
    //     return
    //   }
    //
    //   frame.element.addEventListener("ended", () => {
    //     console.log('ON ENDED', frame.key)
    //     playFrame(frame.nextKey)
    //   })
    // }
  }

  const showFrame = (key, options) => {
    console.log('SHOW FRAME', key)
    const mergedOptions = { ...defaultShowOptions, ...options}

    const frame = loadFrame(key, mergedOptions)

    if (frame.section && !frame.onPlay['onplay']) {
      frame.onPlay['onplay'] = () => router.push(`/${frame.section}`)
    }

    if (mergedOptions.play) {
      console.log("HERE", key)
      playFrame(key)
    }

    if (frame.isTransition) {
      isTransition.value = true
    }

    if (frame.isTransition || mergedOptions.playNext) {
      playNextAfterFrame(key, mergedOptions)
    }
  }

  return {
    frames,
    isTransition,
    allFrames,
    currentVideoKey,
    startLoading,
    showFrame
  }
}



/*
* 1, 2, 3
*
*
*
*
*
*
*
*
*
* */
