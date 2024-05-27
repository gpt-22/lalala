const showEnterOverlay = ref(false)
const showLeaveOverlay = ref(false)

export const usePageOverlay = () => {
  return {
    showEnterOverlay,
    showLeaveOverlay
  }
}
