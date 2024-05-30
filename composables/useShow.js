const showAbout = ref(false)
const showHeader = ref(true)
const unavailableReason = ref('')

export const useShow = () => {
  return {
    showHeader,
    showAbout,
    unavailableReason
  }
}
