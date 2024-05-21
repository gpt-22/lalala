export const allFrames = [
  {
    prevKey: '1',
    key: '1',
    nextKey: '2',
    playing: false,
    loaded: false,
    src: '/video/01_01.mp4',
    isTransition: false,
    element: null,
    onLoaded: {},
    onPlay: {}
  },
  {
    prevKey: '1',
    key: '2',
    nextKey: '3',
    playing: false,
    loaded: false,
    src: '/video/01_02.mp4',
    isTransition: true,
    element: null,
    onLoaded: {},
    onPlay: {}
  },
  {
    prevKey: '2',
    key: '3',
    nextKey: '4',
    playing: false,
    loaded: false,
    src: '/video/01_03.mp4',
    isTransition: false,
    element: null,
    section: 'section-1',
    onLoaded: {},
    onPlay: {}
  },
  {
    prevKey: '3',
    key: '4',
    nextKey: '5',
    playing: false,
    loaded: false,
    src: '/video/01_04.mp4',
    isTransition: true,
    element: null,
    onLoaded: {},
    onPlay: {}
  },
  {
    prevKey: '5',
    key: '4r',
    nextKey: '3',
    playing: false,
    loaded: false,
    src: '/video/01_04_reverse.mp4',
    isTransition: true,
    element: null,
    onLoaded: {},
    onPlay: {}
  },
  {
    prevKey: '4r',
    key: '5',
    nextKey: '6',
    playing: false,
    loaded: false,
    src: '/video/01_05.mp4',
    isTransition: false,
    element: null,
    section: 'section-2',
    onLoaded: {},
    onPlay: {}
  },
  {
    prevKey: '5',
    key: '6',
    nextKey: '7',
    playing: false,
    loaded: false,
    src: '/video/01_06.mp4',
    isTransition: true,
    element: null,
    onLoaded: {},
    onPlay: {}
  },
  {
    prevKey: '7',
    key: '6r',
    nextKey: '5',
    playing: false,
    loaded: false,
    src: '/video/01_06_reverse.mp4',
    isTransition: true,
    element: null,
    onLoaded: {},
    onPlay: {}
  },
  {
    prevKey: '6r',
    key: '7',
    nextKey: '8',
    playing: false,
    loaded: false,
    src: '/video/01_07.mp4',
    isTransition: false,
    element: null,
    section: 'section-3',
    onLoaded: {},
    onPlay: {}
  },
  {
    prevKey: '5',
    key: '8',
    nextKey: '9',
    playing: false,
    loaded: false,
    src: '/video/01_08.mp4',
    isTransition: true,
    element: null,
    onLoaded: {},
    onPlay: {}
  },
  {
    prevKey: '9',
    key: '8r',
    nextKey: '5',
    playing: false,
    loaded: false,
    src: '/video/01_08_reverse.mp4',
    isTransition: true,
    element: null,
    onLoaded: {},
    onPlay: {}
  },
  {
    prevKey: '8r',
    key: '9',
    nextKey: '9',
    playing: false,
    loaded: false,
    src: '/video/01_09.mp4',
    isTransition: false,
    element: null,
    section: 'section-4',
    onLoaded: {},
    onPlay: {}
  }
]

export const sectionToTransition = {
  'section-1': '2',
  'section-2': '4',
  'section-3': '6',
  'section-4': '8'
}
