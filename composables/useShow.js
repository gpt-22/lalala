const showAbout = ref(false)
const showHeader = ref(true)

export const useShow = () => {
  return {
    showHeader,
    showAbout
  }
}
