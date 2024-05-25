export default defineNuxtRouteMiddleware((to, from, kek) => {
  const { width } = useWindowSize()
  // console.log('MIDDLEWARE', to, width.value)

  if (width.value < 1024 && to.name !== 'cinematic') {
    setPageLayout('inappropriate-device')
  }

  if (to.matched.length === 0) {
    // console.log('navigateTo /')
    return navigateTo('/')
  }
})
