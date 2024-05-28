const preloader = ref(true)
const startLoading = ref(true)

export const useLoader = () => {
  return {
    preloader,
    startLoading
  }
}
