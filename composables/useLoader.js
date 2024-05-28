const preloader = ref(true)
const startView = ref(false)

export const useLoader = () => {
  return {
    preloader,
    startView
  }
}
