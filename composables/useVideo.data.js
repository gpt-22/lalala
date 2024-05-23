import { VIDEO_BASE_URL } from '~/utils/constants'

const defaultState = {
  loaded: false,
  show: false,
  playing: false,
  isTransition: false,
  element: null,
  onLoaded: {},
  onPlay: {}
}

export const allVideos = [
  {
    ...structuredClone(defaultState),
    prevKey: 'cinematic',
    key: 'cinematic',
    nextKey: 'cinematic',
    src: `${VIDEO_BASE_URL}/cinematic.mp4`,
    section: 'cinematic'
  },
  {
    ...structuredClone(defaultState),
    prevKey: '1',
    key: '1',
    nextKey: '2',
    src: `/videos/01_01.mp4`
    // src: `${VIDEO_BASE_URL}/01_01.mp4`,
  },
  {
    ...structuredClone(defaultState),
    prevKey: '1',
    key: '2',
    nextKey: '3',
    src: `/videos/01_02.mp4`,
    // src: `${VIDEO_BASE_URL}/01_02.mp4`, //kek_0-1.mp4`,
    isTransition: true
  },
  {
    ...structuredClone(defaultState),
    prevKey: '2',
    key: '3',
    nextKey: '4',
    src: `/videos/01_03.mp4`,
    // src: `${VIDEO_BASE_URL}/01_03.mp4`, // kek_1-1.mp4`,
    section: 'section-1'
  },
  {
    ...structuredClone(defaultState),
    prevKey: '3',
    key: '4',
    nextKey: '5',
    src: `/videos/01_04.mp4`,
    // src: `${VIDEO_BASE_URL}/01_04.mp4`, // kek_1-2.mp4`,
    isTransition: true
  },
  {
    ...structuredClone(defaultState),
    prevKey: '5',
    key: '4r',
    nextKey: '3',
    src: `/videos/01_04_reverse.mp4`,
    // src: `${VIDEO_BASE_URL}/01_04_reverse.mp4`, // kek_2-1.mp4`,
    isTransition: true
  },
  {
    ...structuredClone(defaultState),
    prevKey: '4r',
    key: '5',
    nextKey: '6',
    src: `/videos/01_05.mp4`,
    // src: `${VIDEO_BASE_URL}/01_05.mp4`, // kek_2-2.mp4`,
    section: 'section-2'
  },
  {
    ...structuredClone(defaultState),
    prevKey: '5',
    key: '6',
    nextKey: '7',
    src: `/videos/01_06.mp4`,
    // src: `${VIDEO_BASE_URL}/01_06.mp4`,
    isTransition: true
  },
  {
    ...structuredClone(defaultState),
    prevKey: '7',
    key: '6r',
    nextKey: '5',
    src: `/videos/01_06_reverse.mp4`,
    // src: `${VIDEO_BASE_URL}/01_06_reverse.mp4`,
    isTransition: true
  },
  {
    ...structuredClone(defaultState),
    prevKey: '6r',
    key: '7',
    nextKey: '8',
    src: `/videos/01_07.mp4`,
    // src: `${VIDEO_BASE_URL}/01_07.mp4`,
    section: 'section-3'
  },
  {
    ...structuredClone(defaultState),
    prevKey: '5',
    key: '8',
    nextKey: '9',
    src: `/videos/01_08.mp4`,
    // src: `${VIDEO_BASE_URL}/01_08.mp4`,
    isTransition: true
  },
  {
    ...structuredClone(defaultState),
    prevKey: '9',
    key: '8r',
    nextKey: '5',
    src: `/videos/01_08_reverse.mp4`,
    // src: `${VIDEO_BASE_URL}/01_08_reverse.mp4`,
    isTransition: true
  },
  {
    ...structuredClone(defaultState),
    prevKey: '8r',
    key: '9',
    nextKey: '9',
    src: `/videos/01_09.mp4`,
    // src: `${VIDEO_BASE_URL}/01_09.mp4`,
    section: 'section-4'
  }
]

export const sectionToVideoKey = {
  'section-1': '2',
  'section-2': '4',
  'section-3': '6',
  'section-4': '8'
}
