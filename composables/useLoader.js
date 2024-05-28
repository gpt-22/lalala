const preloader = ref(true)
const startLoading = ref(false)

export const useLoader = () => {
  return {
    preloader,
    startLoading
  }
}
