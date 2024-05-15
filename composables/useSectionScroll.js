import {debounce, throttle} from "~/utils/decorators"
import {waitForScrollEnd} from "~/utils/waitForScrollStop"

// Если секция снизу
//  и скролл вниз
//    и виден верхний блок - скроллим до него
//    не виден верхний блок

// Если нахожусь на секции
//  и скролл наверх
//  и скролл вниз
//    и виден верхний блок - скроллим на секцию
//    не виден верхний блок

// Если секция сверху
//  и скролл наверх
//  и скролл вниз
//    и виден верхний блок
//    не виден верхний блок

// Если пролистнули секицю

export const useSectionScroll = (lenis) => {
  const SECTION_THRESHOLD = 0.25
  const BEFORE_OFFSET_PX = 200
  const scrolling = ref(false)
  const activeElement = ref(null)

  const scrollTo = debounce(async (target) => {
    if (scrolling.value) return

    console.log('scroll')
    scrolling.value = true
    lenis.scrollTo(target, true)
    activeElement.value = target

    await waitForScrollEnd()
    scrolling.value = false
  }, 10)

  const createBeforeElement = (parent) => {
    const beforeElement = document.createElement('div')
    beforeElement.style.cssText = `
      width: ${parent.clientWidth}px;
      height: ${BEFORE_OFFSET_PX}px;
      position: absolute;
      top: -${BEFORE_OFFSET_PX}px;
      left: 0;
    `
    beforeElement.className = 'before-scroll-observer'

    return beforeElement
  }

  const startScrollObserver = (elements) => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(async (entry) => {

          if (entry.isIntersecting) {
            await waitForScrollEnd()
            scrollTo(entry.target)
          }
        })
      },
      {
        threshold: SECTION_THRESHOLD
      }
    )

    const beforeElementObserver = new IntersectionObserver(
      async (entries) => {
        // console.log(entries)

        entries.forEach((entry) => {
          // console.log('entry', entry.target, entry)
          // const bcr = entry.boundingClientRect;
          // const isBottomVisible = (bcr.bottom < window.innerHeight) && bcr.bottom;
          // if (isBottomVisible <= 0) return

          //   await waitForScrollEnd()
          //   // check stop point is higher than before
          // scrollTo(entry.target.parentNode)
          //   // take top edge of viewport and check it is lower than top of before el

          // console.log('BOTTOM', isBottomVisible, entry.target)
        })

        // console.log('TOP')


      },
      {
        // root: document.querySelector('header'),
        // rootMargin: '-150px'
      }
    )

    const scrollBack = async (e) => {
      if (!activeElement.value || scrolling.value) return

      const rect = activeElement.value.getBoundingClientRect()
      if (rect.y < rect.height * SECTION_THRESHOLD) {
        await waitForScrollEnd()
        scrollTo(activeElement.value)
        console.log('back', activeElement.value)
      }

      // if (e.direction) {
      //   console.log('down')
      // } else {
      //   console.log('up')
      // }
    }
    const throttled = debounce(scrollBack, 200)

    lenis.on('scroll', throttled)

    elements.forEach((element) => {
      // const beforeElement = createBeforeElement(element)
      // element.insertBefore(beforeElement, element.firstChild)

      // beforeElementObserver.observe(beforeElement)
      sectionObserver.observe(element)
    })
  }

  return {
    startScrollObserver
  }
}
