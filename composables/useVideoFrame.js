function debounce(func, ms) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), ms);
  };
}

const animating = ref(false)
const show1 = ref(true)
const show2 = ref(false)
const show3 = ref(false)
const show4 = ref(false)

export const useVideoFrame = () => {
  const toEnd = () => {
    if (animating.value) return
    animating.value = true

    show2.value = true
    setTimeout(() => {
      show3.value = true
      show4.value = false
      show2.value = false
      show1.value = false

      animating.value = false
    }, 150)
  }
  // const toEndDebounced = debounce(toEnd, 50)

  const toStart = () => {
    if (animating.value) return

    animating.value = true

    show4.value = true
    setTimeout(() => {
      show1.value = true
      show2.value = false
      show3.value = false
      show4.value = false

      animating.value = false
    }, 150)
  }
  // const toStartDebounced = debounce(toStart, 50)

  return {
    show1,
    show2,
    show3,
    show4,
    toStart,
    toEnd,
  }
}
