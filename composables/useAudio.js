export const audioLinks = [
  `${MEDIA_BASE_URL}/audio/Jacobs_Piano_-_Autumn_Breeze_73190139.mp3`,
  `${MEDIA_BASE_URL}/audio/Ludovico_Einaudi_-_Divenire_48076593.mp3`,
  `${MEDIA_BASE_URL}/audio/Ludovico_Einaudi_-_Fly_48097981.mp3`,
  `${MEDIA_BASE_URL}/audio/Ludovico_Einaudi_-_Oltremare_48076609.mp3`,
  `${MEDIA_BASE_URL}/audio/Ludovico_Einaudi_-_Primavera_48098283.mp3`,
  `${MEDIA_BASE_URL}/audio/Ludovico_Einaudi_-_Solo_48097911.mp3`,
  `${MEDIA_BASE_URL}/audio/Ludovico_Einaudi_-_Una_Mattina_48077742.mp3`,
  `${MEDIA_BASE_URL}/audio/Ludovico_Einaudi_Daniel_Hope_I_Virtuosi_Italiani_Experience_48078120.mp3`,
  `${MEDIA_BASE_URL}/audio/Ludovico_Einaudi_I_Virtuosi_Italiani_-_Run_48078105.mp3`,
  `${MEDIA_BASE_URL}/audio/Secret_Garden_-_Passacaglia_48313241.mp3`,
  `${MEDIA_BASE_URL}/audio/Secret_Garden_-_Song_From_A_Secret_Garden_48180865.mp3`,
  `${MEDIA_BASE_URL}/audio/Secret_Garden_-_The_Promise_48107927.mp3`,
  `${MEDIA_BASE_URL}/audio/Yiruma_-_River_Flows_In_You_48240226.mp3`
]

export const useAudio = () => {
  const audio = ref(new Audio())

  function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const getRandomAudio = () => {
    return audioLinks[getRandomInt(0, audioLinks.length - 1)]
  }

  const initAudioPlayer = () => {
    audio.value.src = getRandomAudio()
    audio.value.volume = 0.1
    audio.value.onended = function () {
      audio.value.src = getRandomAudio()
    }
  }

  const play = async () => {
    audio.value.play()
    // await adjustVolume(audio.value, 1)
  }

  const pause = async () => {
    // await adjustVolume(audio.value, 0)
    audio.value.pause()
  }

  async function adjustVolume(
    element,
    newVolume,
    { duration = 3000, easing = swing, interval = 13 } = {}
  ) {
    const originalVolume = element.volume
    const delta = newVolume - originalVolume

    if (!delta || !duration || !easing || !interval) {
      element.volume = newVolume
      return Promise.resolve()
    }

    const ticks = Math.floor(duration / interval)
    let tick = 1

    return new Promise((resolve) => {
      const timer = setInterval(() => {
        element.volume = originalVolume + easing(tick / ticks) * delta

        if (++tick === ticks + 1) {
          clearInterval(timer)
          resolve()
        }
      }, interval)
    })
  }

  function swing(p) {
    return 0.5 - Math.cos(p * Math.PI) / 2
  }

  return {
    audioLinks,
    audio,
    play,
    pause,
    initAudioPlayer,
    getRandomAudio
  }
}
