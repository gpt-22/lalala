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
  const play = ref(false)

  return {
    audioLinks,
    play
  }
}
